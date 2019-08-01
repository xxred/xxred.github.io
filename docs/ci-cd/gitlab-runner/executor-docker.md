# gitlab-runner 的 executors 之 docker

- GitLab Runner 实现了许多执行程序，可用于在不同的场景中运行构建。所有执行程序分别为：
  - SSH
  - Shell
  - Parallels
  - VirtualBox
  - Docker
  - Docker Machine (auto-scaling)
  - Kubernetes
  - Custom
- 本文主要介绍 docker 执行程序：
  - 两种不同的使用方式
  - 踩过的坑
  - 一些例子与经验
- 这是一个很好地选择。因为它可以提供一个干净的构建环境，项目所有依赖项都可以放到 docker 镜像中。同时，它还可以轻松创建具有依赖服务的构建环境，比如 MySQL。参考 https://docs.gitlab.com/runner/executors/README.html
- GitLab CI/CD 工作原理： https://docs.gitlab.com/ee/ci/introduction/index.html#how-gitlab-cicd-works
- 在 GitLab CI/CD 中构建 Docker 镜像：https://docs.gitlab.com/ee/ci/docker/using_docker_build.html

## 两种使用方式

### docker-in-docker

- 文档：https://docs.gitlab.com/ee/ci/docker/using_docker_build.html#use-docker-in-docker-executor
- 这种方式是使用需要运行在特权模式`privileged`下的特殊的 Docker 镜像——docker-in-docker（dind）和所安装的 docker 工具来执行脚本
- GitLab Runner 注册选择 docker 和`privileged`模式

```bash
sudo gitlab-runner register -n \
   --url https://gitlab.com/ \
   --registration-token REGISTRATION_TOKEN \
   --executor docker \
   --description "My Docker Runner" \
   --docker-image "docker:stable" \
   --docker-privileged
```

- 以上命令将注册一个使用`docker:stable`镜像的 Runner，**它使用`privileged`模式启动构建和服务容器**。这也是使用[docker-in-docker](https://blog.docker.com/2013/09/docker-can-now-run-within-docker/)模式必须使用的设置

- > 注意：通过`--docker-privileged`启用特权模式，禁用容器的所有安全机制，并将主机暴露在权限提升中，这可能导致容器中断。更多信息查看 Docker 官方文档[运行时特权和 linux 功能](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)
- 上面的命令得到对应配置文件如下

```toml
 [[runners]]
   url = "https://gitlab.com/"
   token = TOKEN
   executor = "docker"
   [runners.docker]
     tls_verify = false
     image = "docker:stable"
     privileged = true
     disable_cache = false
     volumes = ["/cache"]
   [runners.cache]
     Insecure = false
```

- `.gitlab-ci.yml`例子如下，参考[https://gitlab.com/gitlab-examples/docker](https://gitlab.com/gitlab-examples/docker/tree/master)

```yaml
image: docker:latest

services:
  - docker:dind

build:
  stage: build
  script:
    - docker build -t test .
```

- 缺点和不足如下：
  - 使用 docker-in-docker 时，每个作业都处于干净的环境中，没有过去的历史记录。并发任务执行正常，因为每个构建都有自己的 Docker 引擎实例，因此它们不会相互冲突。但这也意味着工作可能会变慢，因为没有层缓存
  - 默认情况下，docker:dind 使用的--storage-driver vfs 是最慢的形式。要使用其他驱动程序，请参阅 [使用 overlayfs 驱动程序](https://docs.gitlab.com/ee/ci/docker/using_docker_build.html#using-the-overlayfs-driver)
  - 由于 docker:dind 容器和运行器容器不共享其根文件系统，因此任务的工作目录可用作子容器的安装点。例如，如果您要与子容器共享文件，则可以在/builds/\$CI_PROJECT_PATH 其下创建子目录并将其用作挂载点（有关更详细的说明，请查看[问题＃41227](https://gitlab.com/gitlab-org/gitlab-ce/issues/41227)）

### 使用 Docker 套接字绑定

- 另一种方法是绑定`/var/run/docker.sock`到容器中，以便 Docker 在该映像的上下文中可用
- > 注意：如果在使用 GitLab Runner 11.11 或更高版本时绑定 Docker 套接字，则无法再将其 docker:dind 用作服务，因为也会对服务进行卷绑定，从而使这些服务不兼容
- Runner 注册命令如下

```bash
sudo gitlab-runner register -n \
   --url https://gitlab.com/ \
   --registration-token REGISTRATION_TOKEN \
   --executor docker \
   --description "My Docker Runner" \
   --docker-image "docker:stable" \
   --docker-volumes /var/run/docker.sock:/var/run/docker.sock
```

- 以上命令将注册一个使用`docker:stable`镜像的 Runner。**注意：他是用的是 Runner 本身的 Docekr 守护程序，而 docker 命令生成的任何容器都是 Runner 的兄弟，而不是 Runner 的子节点。**
- 上面的命令得到对应配置文件如下

```toml
 [[runners]]
   url = "https://gitlab.com/"
   token = REGISTRATION_TOKEN
   executor = "docker"
   [runners.docker]
     tls_verify = false
     image = "docker:stable"
     privileged = false
     disable_cache = false
     volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
   [runners.cache]
     Insecure = false
```

- 对应的`.gitlab-ci.yml`例子如下

```yaml
image: docker:stable

before_script:
  - docker info

build:
  stage: build
  script:
    - docker build -t my-docker-image .
    - docker run my-docker-image /script/to/run/tests
```

- 可以看到，这个模式不需要使用服务，直接通过套接字通信。此模式也是有一些需要注意的地方：
  - 由于是共享 docker 守护程序，项目的操作会真实产生影响。比如项目如果运行`docker rm -f $(docker ps -a -q)`，那么将会删除所有容器
  - 并发可能会有冲突，比如创建相同的名称的容器
  - 由于创建的容器是 Runnner 的兄弟，所以文件与目录的共享是在主机上下文完成，而不是构建容器上下文

## 总结

- 选择两种方式都各有好坏，可根据实际情况进行选择。这里还是推荐用第二种，因为第一种真的很干净，所以很慢
- 做好权限管理和控制，避免危险的脚本
- 还有一点是，指定镜像版本的时候，最好指定具体的版本。比如使用第一种模式，引入服务`docker:dind`，最好使用`docker:18.09.8-dind`。避免镜像拉取策略，每次拉取最新的镜像，导致实际是`docker:19.0-dind`，与安装的 docker 版本不符，发生一些意想不到的错误
