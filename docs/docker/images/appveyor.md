# appveyor docker 镜像制作

- appveyor 是由 asp.net core 开发的 CI/CD 产品，也是之前少数支持 windows 环境的 CI/CD 产品之一。由于容器技术发展极快，利用容器的能力，可轻松快速拉取所需各种环境。从这一点上看，各产品之间，个人感觉差异并不大，主要还是看各家侧重点。今天要提的，其实是它内部的 nuget feed 功能，即将它作为 nuget 包源

## 为什么选择它

- 我们的目标是自托管一个私有 nuget 源，部署在服务器并且不是在内网，任何开发机通过公网 ip 可访问，并需要需要认证
- [此处](https://docs.microsoft.com/zh-cn/nuget/hosting-packages/overview)介绍了几款产品
  - Azure Artifacts 也可通过 Team Foundation Server 2017 以及更高版本获得。
  - MyGet
  - Inedo 的 ProGet
  - NuGet 服务器，Inedo 的社区项目
  - NuGet 服务器（开放源代码），与 Inedo 的 NuGet 服务器相似的开放源代码实现
  - LiGet：在 docker 中 kestrel 上运行的 NuGet V2 服务器的开放源代码实现
  - BaGet 构建与 ASP.NET Core 基础上的 NuGet V3 服务器的开源实现
  - Sleet（开放源代码 NuGet V3 静态源生成器）
  - JFrog 的 Artifactory。
  - Sonatype 的 Nexus。
  - JetBrains 的 TeamCity。
- 其中大部分不能自托管，需要买服务，一部分复杂难用，有的还不支持私有源访问认证
- 符合要求的基本都是 CI/CD 产品中的 nuget 功能，其中 appveyor 是发现的最简单易用的

## 安装

- 官网安装说明 https://www.appveyor.com/docs/server/
- 官网提供 windows 和 linux 的两种安装方式，都是安装包，并没有 docker 方式，我们希望通过 docker 来安装部署，因此需要制作一个镜像
- 这里给出制作好的地址 https://hub.docker.com/r/xxred/appveyor
- 安装命令 `docker run --restart always --name appveyor -d -p 80:80 -v appveyor_config:/etc/opt/appveyor/server -v appveyor_data:/var/opt/appveyor/server xxred/appveyor`

## 制作过程

- 首先根据官方说明，使用 ubuntu18.04 镜像进行实验
- `apt update && apt install wget dpkg libcap2-bin`，wget 用来下载安装包，dpkg 用来安装 deb 软件包，libcap2-bin 则是安装包依赖的包
- 如果嫌更新速度慢，可更换软件源，参考 https://www.jianshu.com/p/e5677ebd5341
- 下载安装包 `wget https://www.appveyor.com/downloads/appveyor-server/7.0/linux/appveyor-server_7.0.2184_amd64.deb -O appveyor-server.deb`
- 一切准备就绪，执行`dpkg -i appveyor-server.deb`进行安装
- 安装完成之后，如果是 ubuntu 物理机，那么应该已经自动注册服务运行了，但在容器里须得手动运行，执行命令`./opt/appveyor/server/appveyor-server`
- 这个时候会报缺少包的错误，或者是一个全局配置错误，所有的问题都可以通过安装缺失的包来解决
- appveyor 由 asp.net core 开发，镜像环境参考 https://docs.microsoft.com/en-us/dotnet/core/linux-prerequisites?tabs=netcore2x#supported-linux-versions 此处列举了运行 asp.net core 的系统及其需要安装的包
- asp.net core 自包含相关资料参考 https://github.com/dotnet/core/blob/master/Documentation/self-contained-linux-apps.md
- 安装完 asp.net core 所依赖的包即可正常运行应用，此时测试完成
- 将此容器打包成镜像即可

## 制作 Dockerfile

- Dockerfile 命令 https://docs.docker.com/engine/reference/builder/
- 特别注意 dockerfile 指令`ADD`和`COPY`的区别 https://www.cnblogs.com/sparkdev/p/9573248.html
- 大概分为以下几步：选择基础镜像、准备需要的文件、导出需要暴露的端口、卷设置、容器运行执行的命令
- 首先是基础镜像选择 https://hub.docker.com/_/microsoft-dotnet-core-runtime-deps 这里可以找到合适的 asp.net core 环境，大多数需要的依赖均已安装，直接使用即可
- 所以我们只需要下载安装包，然后进行安装，得到解压后的应用文件。这一步可以进行优化，参考[Ubuntu 下制作 Nginx deb 安装包](https://www.jianshu.com/p/beef99160219)，得到安装 deb 包运行的脚本，自行设置
- 即通过`dpkg -e appveyor-server.deb`命令得到包的元数据，以`ubuntu18.04`镜像而不是微软提供的镜像作为基础镜像，可以较少需要安装的包，进一步减少镜像体积。通过执行 deb 的安装脚本，达到安装的目的。最后自行安装缺失的包即可。理论上可以在其他体积更小的镜像中运行，比如 alpine
- 为了快速完成镜像制作，得到以下 Dockerfile，而没有进行其他优化

```Dockerfile
FROM ubuntu:18.04 as download
WORKDIR /tmp
RUN apt update
RUN apt install wget -y
RUN wget https://www.appveyor.com/downloads/appveyor-server/7.0/linux/appveyor-server_7.0.2184_amd64.deb -O appveyor-server.deb
FROM mcr.microsoft.com/dotnet/core/runtime-deps:2.2.5-bionic
RUN apt update
RUN apt install libcap2-bin -y
COPY --from=download /tmp/appveyor-server.deb /tmp/
RUN dpkg -i /tmp/appveyor-server.deb
RUN cd /tmp && rm -f *
WORKDIR /opt/appveyor/server
EXPOSE 80 443
VOLUME [ "/etc/opt/appveyor/server" ]
VOLUME [ "/var/opt/appveyor/server" ]
ENTRYPOINT [ "./appveyor-server" ]
```

## 运行及使用

- 执行命令安装 `docker run --restart always --name appveyor -d -p 80:80 -v appveyor_config:/etc/opt/appveyor/server -v appveyor_data:/var/opt/appveyor/server xxred/appveyor`，然后在浏览器访问，设置密码即可
- 进到主页面，选择`Account`栏目，左边选项卡选择`Nuget`，稍等片刻即可看到账号级别的 NuGet feed 和相应 API key
- 使用下面的命令推送一个 nuget 包进行测试，将 nuget 包源地址添加到 Nuget Source，选择该包源搜索包，即可看到弹窗要求进行验证，输入刚刚设置的账号密码即可

## 总结

- Nuget 包私有源作为公司内部包管理之一，可有效管理多个 dll，减轻升级 dll 的成本
- 将更多功能独立成一个 dll，各系统按需引入，加快新系统搭建速度
- 逐步建立公司公共基础库，常用业务库等，nuget 包管理发至关重要的作用
