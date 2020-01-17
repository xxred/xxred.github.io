# 发布

## 发布到 ubuntu

- https://docs.microsoft.com/zh-cn/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-2.1#create-the-service-file

## asp.net core 发布到 docker

- asp.net core 打包成镜像运行在 docker 中，首先需要找到与项目对应的基础镜像，接着复制源码到容器或者克隆代码，然后执行构建打包命令，最后将发布后文件放到只有运行时的镜像，打包完成。
- 以上就是大致过程，发布有两种选择，一种是打包成 nuget，发布到 nuget.org；另一种是打包成 docker 镜像，发布到 docker hub
- [asp.net core 一个官方例子](https://github.com/dotnet/dotnet-docker/blob/master/samples/aspnetapp/README.md)
- [Dockerfile 命令](https://docs.docker.com/engine/reference/builder/)，必看。

### 发布到 nuget

```dockerfile
FROM mcr.microsoft.com/dotnet/core/sdk:2.2
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone # 设置时区
ARG AppKey
ARG Source
ARG ProjName=ProjName
WORKDIR /src
COPY ["${ProjName}/${ProjName}.csproj", "${ProjName}/"]
RUN dotnet restore "${ProjName}/${ProjName}.csproj"
COPY . .
WORKDIR /src/${ProjName}
RUN dotnet pack "${ProjName}.csproj" -c Release -o /app

WORKDIR /app
RUN dotnet nuget push *.nupkg -k ${AppKey} -s ${Source}
```

- 以上 dockerfile 是比较通用的，通过参数传入项目名称、nuget 的 key 和 source，只是这里默认了这个项目文件 csproj 名称与文件夹名称相同。
- 用法是：

```bash
docker build --build-arg AppKey=$NugetAppKey --build-arg Source=$NugetSource -t $CI_COMMIT_SHORT_SHA:latest .
```

- 因为这里并不需要这个镜像，所以每次发布之后可以移除这个镜像

```bash
docker rmi $CI_COMMIT_SHORT_SHA:latest
```

### 发布到 docker 仓库

```dockerfile
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
ARG ProjName=ProjName
WORKDIR /src
COPY ["${ProjName}/${ProjName}.csproj", "${ProjName}/"]
RUN dotnet restore "${ProjName}/${ProjName}.csproj"
COPY . .
WORKDIR /src/${ProjName}
RUN dotnet build "${ProjName}.csproj" -c Release -o /app  --no-restore

FROM build AS publish
RUN dotnet publish "${ProjName}.csproj" -c Release -o /app  --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "${ProjName}.dll"]
```

- 以上 dockerfile，在 dotnetsdk 中发布项目，最后生成的镜像使用 aspnet，这也是两个镜像的区别，sdk 可以构建项目，aspnet 是 runtime，只能运行项目。
- 用法：

```bash
docker build -t ${ProjName}:latest --build-arg ProjName="${ProjName}" .
```

- 发布到 docker 仓库，先登录后推送

```bash
# 登录
docker login -u "$REGISTRY_USER" -p "$REGISTRY_PASSWORD" localhost:32000

# 推送
docker tag ${ProjName}:latest localhost:32000/${ProjName}:latest && docker push localhost:32000/${ProjName}:latest
```

### 注意

- dockerfile 中的 ProjName 变量可外面传入，也可设置默认值，只是为了更加通用，修改一个值即可用于其它项目
- 打包 docker 的开放端口设置需要注意，如果程序运行监听的端口与开放端口不一致，可通过设置`ASPNETCORE_URLS`来解决

```dockerfile
ENV ASPNETCORE_URLS="http://*:80/"
```
