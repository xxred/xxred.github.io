# Docker 入门资料收集

收集Docker入门可能用得到的资料，开发机系统为win10

## 下载安装

- https://download.docker.com/win/
- https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe
- [官方文档](https://docs.docker.com/docker-for-windows/install/)
- [中文安装文档](https://docs.docker-cn.com/docker-for-windows/install/)
- 如果装有[chocolatey](https://chocolatey.org/)，没有的话安装也很快[命令行安装](https://chocolatey.org/install/)，建议用powershell执行`choco install docker-desktop -y`安装Docker
- 安装完需要重启完成完整安装

```powershell
PS C:\WINDOWS\system32> choco install docker-desktop -y
Chocolatey v0.10.11
Installing the following packages:
docker-desktop
By installing you accept licenses for the packages.
Progress: Downloading docker-desktop 2.0.0.0... 100%

docker-desktop v2.0.0.0 [Approved]
docker-desktop package files install completed. Performing other installation steps.
File appears to be downloaded already. Verifying with package checksum to determine if it needs to be redownloaded.
Error - hashes do not match. Actual value was '527558BD0AC89F3916A3AD301AE3C12E97E400F7630261C97427A16A4014B26E'.
Downloading docker-for-windows
  from 'https://download.docker.com/win/stable/28905/Docker%20for%20Windows%20Installer.exe'
Progress: 100% - Completed download of H:\Cache\choco\docker-desktop\2.0.0.0\Docker for Windows Installer.exe (537.71 MB).
Download of Docker for Windows Installer.exe (537.71 MB) completed.
Hashes match.
Installing docker-for-windows...
docker-for-windows has been installed.
  docker-desktop may be able to be automatically uninstalled.
Environment Vars (like PATH) have changed. Close/reopen your shell to
 see the changes (or in powershell/cmd.exe just type `refreshenv`).
 The install of docker-desktop was successful.
  Software installed to 'C:\Program Files\Docker\Docker'

Chocolatey installed 1/1 packages.
 See the log for details (H:\Program Files\Chocolatey\logs\chocolatey.log).
```

## 运行

- 运行hello-world，执行`docker run hello-world`
- 安装更多可参考http://www.runoob.com/docker/docker-install-mysql.html

```powershell
PS C:\Users\12504> docker -v
Docker version 18.09.0, build 4d60db4
PS C:\Users\12504> docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
d1725b59e92d: Pull complete
Digest: sha256:b3a26e22bf55e4a5232b391281fc1673f18462b75cdc76aa103e6d3a2bce5e77
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

PS C:\Users\12504>
```

## 资源汇总

- 部分复制于以下网站：
  - http://www.docker.org.cn/
  - http://www.runoob.com/

### 名词解释

- http://www.runoob.com/docker/docker-architecture.html
- 一句话概括：在Docker主机(Host，物理机)上通过Docker Machine命令行工具安装Docker 客户端(Client)，然后从Docker 仓库(Registry，官方Docker Hub)拉取Docker 镜像(Images，相当于软件包)运行，运行的东西叫做Docker 容器(Container，独立运行的应用)。

### Docker官方英文资源

- docker官网：http://www.docker.com
- Docker windows入门：https://docs.docker.com/windows/
- Docker Linux 入门：https://docs.docker.com/linux/
- Docker mac 入门：https://docs.docker.com/mac/
- Docker 用户指引：https://docs.docker.com/engine/userguide/
- Docker 官方博客：http://blog.docker.com/
- Docker Hub: https://hub.docker.com/
- Docker开源： https://www.docker.com/open-source

### Docker中文资源

- docker-cn.com为官方网站翻译

- Docker中文网站：https://www.docker-cn.com/
- Docker安装手册：https://docs.docker-cn.com/engine/installation/
- Docker中文网站：http://www.docker.org.cn
- Docker入门教程: http://www.docker.org.cn/book/docker.html
- Docker安装手册：http://www.docker.org.cn/book/install.html
- 一小时Docker教程 ：https://blog.csphere.cn/archives/22
- docker从入门到实践：- http://dockerpool.com/static/books/docker_practice/index.html
- Docker纸质书：http://www.docker.org.cn/dockershuji.html
- DockerPPT：http://www.docker.org.cn/dockerppt.html
- 推荐入门教程：http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html

### 镜像加速

- Docker 中国官方镜像加速 https://www.docker-cn.com/registry-mirror
- 网易加速器：http://hub-mirror.c.163.com
- 官方中国加速器：https://registry.docker-cn.com
- ustc的镜像：https://docker.mirrors.ustc.edu.cn
- daocloud（注册后使用）：https://www.daocloud.io/mirror#accelerator-doc

### 命令大全

- https://docs.docker.com/engine/reference/run/
- http://www.runoob.com/docker/docker-command-manual.html
- 主要分为：
  - 容器生命周期管理
    - run
    - start/stop/restart
    - kill
    - rm
    - pause/unpause
    - create
    - exec
  - 容器操作
    - ps
    - inspect
    - top
    - attach
    - events
    - logs
    - wait
    - export
    - port
  - 容器rootfs命令
    - commit
    - cp
    - diff
  - 镜像仓库
    - login
    - pull
    - push
    - search
  - 本地镜像管理
    - images
    - rmi
    - tag
    - build
    - history
    - save
    - import
  - info|version
    - info
    - version
- http://www.runoob.com/docker/docker-command-manual.html

### 界面管理

- 可视化Docker管理，支持多主机[Portainer](https://www.portainer.io/installation/)
- 开源的企业级容器管理平台[rancher](https://rancher.com/)

## 总结

- 经过动手实践，才会更深一层理解Docker，知道它能干什么，可以解决什么问题，如果没有配置环境的烦恼，请速速离开，因为学习成本将会让人从未入门到放弃。