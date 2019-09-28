# gitlab-runner + k8s 实现自动部署

- 本次教程带来的是 gitlab-runner 上结合 k8s 实现自动部署，前面的教程都只是到打包程序，或者发布到 docker 镜像仓库，线上服务更新还是得手动更新重启。动手次数多了，还是觉得搞成自动部署比较妥。其实也挺简单的，接下来请看教程

## 过程说明

1. 想要实现自动部署，就要借助工具`kubectl`，安装文档 https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-linux
2. 将该工具集成到 alpine 镜像里面，当然也可以去 docker 仓库找个现成的
3. 准备好 k8s 配置文件，使得`kubectl`工具能连接上 k8s 集群
4. 准备部署的命令，这里又分两种情况，一种是删掉 deployment 重新部署 ，另一种是更新 deployment 以重启 pod。第一种需要准备 deployment 的配置文件，而每次更新只是拉取新的镜像而已，因此这里选择第二种。第二种实现的方式是添加一个时间变量，触发 pod 更新，以免系统认为配置文件不变而没有更新 pod

## 准备 kubectl 镜像

```Dockerfile
FROM alpine:latest
ARG KUBE_LATEST_VERSION=v1.15.3

# RUN apk add --update ca-certificates
RUN apk add --update -t deps curl
RUN curl -L https://storage.googleapis.com/kubernetes-release/release/${KUBE_LATEST_VERSION}/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl
RUN chmod +x /usr/local/bin/kubectl
RUN apk del --purge deps
RUN rm /var/cache/apk/*
```

- Dockerfile 如上，构建命令`docker build --build-arg KUBE_LATEST_VERSION="v1.15.3" -t kubectl:v1.15.3 .`

## 准备 k8s 配置文件

- 配置文件也可以集成在镜像里面，但是不太灵活，一旦配置有变或者有多个集群，镜像就得修改或者准备多个版本，因此通过 gitlab ci/cd 环境变量传递
- 首先取得配置信息，通过命令`kubectl config view --raw -o yaml`得到配置信息，复制到 gitlab 的 ci/cd 环境变量中

- 这里要注意的是，命令必须带参数`--raw`，为了将 certificate-authority-data 的值输出，否则只能看到 DATA+OMITTED。另外，环境变量必须选择文件类型，否则最后输出格式不对，导致`mapping values are not allowed in this context`错误，当然选择`-o json`，使用 json 格式，就不用担心格式问题

![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/image/imgs20190928180402.png)

## 重新部署

```bash
kubectl patch deployment nginx  -p '{"spec":{"template":{"spec":{"containers":[{"name":"nginx","env":[{"name":"RESTART_TIME","value":"'$(date +%s)'"}]}]}}}}'
```

- 命令参考 https://v1-15.docs.kubernetes.io/docs/reference/generated/kubectl/kubectl-commands.html#patch
- 上面将 nginx 换成自己应用即可

## 完整.gitlab-ci.yml 文件

```yml
stages:
  - deploy

deploy:
  image: kubectl:v1.15.3
  stage: deploy
  script:
    - mkdir $HOME/.kube && cat $KUBE_CONFIG > $HOME/.kube/config
    - kubectl patch deployment nginx -p '{"spec":{"template":{"spec":{"containers":[{"name":"nginx","env":[{"name":"RESTART_TIME","value":"'$(date +%s)'"}]}]}}}}'
```

- 为了看起来简洁，就不展示 build 这个步骤了。变量\$KUBE_CONFIG 实际上是个地址，因为 gitlab ci/cd 环境变量类型设置为 file

## 其他问题

- 除了上面提到的一些问题，还有个就是网络问题。gitlab-runner 创建的这个基于`kubectl:v1.15.3`镜像的容器，是访问不到 k8s 集群的，因为不是在同一个网络，而 k8s 集群又没设置通过外网访问。这里的简单处理方法是在 gitlab-runner 配置中，将网络模式设置为 host，因为这里是 microk8s 创建的单节点集群，总之只要达到使他们处于同一个网络或者可以访问即可

```yaml
[[runners]]
  [runners.docker]
    network_mode = "host"
```

## 参考

- Gitlab CI 与 Kubernetes 的结合 https://www.qikqiak.com/post/gitlab-ci-k8s-cluster-feature/
- K8S 重启 Deployment 的小技巧 https://chanjarster.github.io/post/k8s-restart-deployment/

## 总结

- 先把过程基本原理了解再去干活，会有事半功倍的效果，而且出了问题也比较好排查
