# gitlab-runner

- gitlab-runner 是一个开源的与 gitlab CI 配合使用的项目，用于运行任务，并将结果返回 gitlab
- 本文通过`docker in docker`的方式，即在具有特权模式的 Docker 中使用 Docker，通过 gitlab-runner 使用 docker 的来构建项目，完成打包，测试，发布等任务。这样 gitlab-runner 只是需要 Dockerfile 即可，可方便日后使用其他 CI/CD 工具。同时本地调试也十分方便
- 文档地址：https://docs.gitlab.com/runner

## 安装

- 参考文档 https://docs.gitlab.com/runner/install/docker.html

```bash
docker run -d --name gitlab-runner --restart always \
   -v /srv/gitlab-runner/config:/etc/gitlab-runner \
   -v /var/run/docker.sock:/var/run/docker.sock \
   gitlab/gitlab-runner:latest
```

## 注册

- 安装好 gitlab-runner 后，需要进行注册，gitlab 才会出现 runner 列表。注册前需要准备好地址和 token，管理员进入**管理中心**>**概览**>**Runner**可查看 runner 列表、url 和注册令牌
- 如果想要为某群组或者项目设置 runner，可在对应群组或者项目的**设置**>**CI/CD**>**Runner**获取 url 和 token
- 首先进入容器交互模式

```bash
docker exec -it gitlab-runner bash
```

- 输入命令`gitlab-runner register`进行注册，按照提示和文档说明一步步填写即可
- 也可一条命令完成注册

```bash
sudo gitlab-runner register \
  --non-interactive \
  --url "https://gitlab.com/" \
  --registration-token "PROJECT_REGISTRATION_TOKEN" \
  --executor "docker" \
  --docker-image alpine:latest \
  --description "docker-runner" \
  --tag-list "docker,aws" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"
```

- 注册 runner 参考：https://docs.gitlab.com/runner/register/index.html#docker
- docker 执行者：https://docs.gitlab.com/runner/executors/docker.html

## 配置

- 在配置文件`/etc/gitlab-runner/config.toml`中添加 privileged 标记，这样可以在容器中使用 docker 的一些功能
- 参考：https://docs.gitlab.com/runner/executors/docker.html#use-docker-in-docker-with-privileged-mode
- 其它命令：https://docs.gitlab.com/runner/commands/README.html

```toml
[[runners]]
  executor = "docker"
  [runners.docker]
    privileged = true
```

- 完整的例子

```toml
[[runners]]
  name = "docker-runner"
  url = "http://192.168.99.100:8900/"
  token = "zLBu8yXEFPGKaaasZopn"
  executor = "docker"
  clone_url = "http://192.168.99.100:8900/"
  [runners.custom_build_dir]
  [runners.docker]
    tls_verify = false
    image = "apline:latest"
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
```

- 高级配置：https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-runners-section

## 环境变量

- 通过设置环境变量，让 runner 执行的时候读取，避免在源码中记录敏感信息
- 在群组或者项目的设置中依次点击**设置**>**CI/CD**>**变量**
- 在`.gitlab-ci.yml`文件中使用方式

  |     Shell     |     Usage      |
  | :-----------: | :------------: |
  |    bash/sh    |   \$variable   |
  | windows batch |   %variable%   |
  |  PowerShell   | \$env:variable |

- 参考https://docs.gitlab.com/ce/ci/variables/README.html#via-the-ui
- Dockerfile 中使用变量参考：https://docs.docker.com/engine/reference/builder/#arg

## 添加 Dockerfile

- 文档参考：https://docs.docker.com/engine/reference/builder/
- 项目中添加 Dockerfile，接收 Source、AppKey 两个参数，并将其推送至 nuget 服务器

```dockerfile
FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch
ARG AppKey
ARG Source
WORKDIR /src
COPY ["A1/A1.csproj", "A1/"]
RUN dotnet restore "A1/A1.csproj"
COPY . .
WORKDIR /src/A1
RUN dotnet pack "A1" -c Release -o /app

WORKDIR /app
RUN dotnet nuget push *.nupkg -k ${AppKey} -s ${Source}
```

## 添加 .gitlab-ci.yml

- 项目中添加 CI/CD 配置，在 gitlab 中新建可选择模板，选择 docker 模板
- 文档参考：https://docs.gitlab.com/ee/ci/yaml/README.html#validate-the-gitlab-ciyml

```yaml
# This file is a template, and might need editing before it works on your project.
build-master:
  # Official docker image.
  image: docker:latest
  stage: build
  services:
    - docker:dind
  before_script:
    # - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
    - docker --version
    - echo $NugetAppKey
    - echo $NugetSource
  script:
    - docker build --build-arg AppKey=$NugetAppKey --build-arg Source=$NugetSource -t A1:latest .
  only:
    - master
```

## 问题

- 执行 docker build 的时候报错：`time="2019-07-19T01:20:27Z" level=error msg="failed to dial gRPC: cannot connect to the Docker daemon. Is 'docker daemon' running on this host?: dial tcp: lookup docker on 100.100.2.136:53: no such host"`，这个需要配置 runner，让容器跑在`privileged`模式，参考 https://docs.gitlab.com/runner/executors/docker.html#use-docker-in-docker-with-privileged-mode
- runner 执行的时候需要拉取代码，但是拉取的链接由于种种原因在容器内很难访问，需要另外的设置或者代理才行。但是高级设置有个参数可以设置拉取代码的链接：`clone_url`。文档：https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-runners-section 示例：

```bash
[[runners]]
  name = "ruby-2.1-docker"
  url = "https://CI/"
  token = "TOKEN"
  limit = 0
  executor = "docker"
  builds_dir = ""
  shell = ""
  environment = ["ENV=value", "LC_ALL=en_US.UTF-8"]
  clone_url = "http://gitlab.example.local"
```

## 总结

- 安装过程也没什么难点，有什么不对的多试几次即可
- gitlab 的文档还是挺齐全的，如果能够把相关的文档先大概浏览一遍，将会有事半功倍的效果，省去不少麻烦
