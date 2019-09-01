# NuGet 跨平台身份验证

- 在开发过程中使用 Visual Studio 客户端还原 nuget 包，对于私有源，它会弹出一个交互窗口以供用户填写用户名密码。但是在打造 CI/CD 流水线时，使用命令还原包，并且无人值守，这个情况下，怎么做身份证验证，且听我慢慢道来

## 寻寻觅觅

- 上一篇[appveyor docker 镜像制作](https://www.imooc.com/article/288681)中制做了 docker 镜像，地址是 https://hub.docker.com/r/xxred/appveyor
- 由于是私有源，访问需要认证，那么使用`dotnet restore`命令还原包的时候自然是无返回无法授权的结果。本着这个问题肯定有人问过，于是乎上 gitlab 的 issue 寻找解决方案
- 找到这个[issue](https://github.com/NuGet/Home/issues/6486)，并在其中找到一个认证插件https://github.com/Microsoft/artifacts-credprovider#readme 。Azure Artifacts Credential Provider 可自动获取恢复 NuGet 包所需的凭据

## 撸起袖子干

- 参照文档，下载插件进行测试，或者执行[脚本](https://github.com/microsoft/artifacts-credprovider/blob/master/helpers/installcredprovider.ps1)安装。插件放置位置如下
- 通过环境变量指定：NUGET_PLUGIN_PATHS="~/.nuget/plugins"
- 或者放在用户文件中指定位置：

```text
.nuget
   plugins
       netfx
           myFeedCredentialProvider
               myFeedCredentialProvider.exe
               nuget.protocol.dll
       netcore
           myFeedCredentialProvider
               myFeedCredentialProvider.dll
               nuget.protocol.dll
```

- 设置账号密码：通过设置环境变量 VSS_NUGET_EXTERNAL_FEED_ENDPOINTS，包含服务端点、用户名和访问令牌数组的 JSON，用于在 nuget.config 中对端点进行身份验证。示例：

```json
{
  "endpointCredentials": [
    {
      "endpoint": "http://example.index.json",
      "username": "optional",
      "password": "accesstoken"
    }
  ]
}
```

- 为了方便，可以做成镜像，集成这个插件和认证信息，但我比较懒，就先用命令完成安装，并每次启动构建都安装，linux 下命令如下

```bash
mkdir ~/.nuget && cd ~/.nuget && \
wget -O tar https://github.com/microsoft/artifacts-credprovider/releases/download/0.1.18/Microsoft.NuGet.CredentialProvider.tar.gz && \
tar -xvf tar
```

## 后知后觉

- 完成任务后，回头看看运行原理是啥，参考文档 https://docs.microsoft.com/zh-cn/nuget/reference/extensibility/nuget-cross-platform-plugins
  - NuGet 发现可用插件。
  - 如果适用，NuGet 将循环访问的优先级顺序并开始逐个进行中的插件。
  - NuGet 将使用第一个插件，可以处理该请求。
  - 在不再需要时，将关闭插件。
- 插件协议：https://docs.microsoft.com/zh-cn/nuget/reference/extensibility/nuget-cross-platform-plugins#protocol-messages-index
- 还有缓存功能，这是提升构建的速度关键，特别是多个项目使用同一个私有源的时候。不仅下载安装插件，安全验证和实例化插件的代价也是高昂。所以不仅要做好镜像，提前下载安装插件，并且缓存插件返回过的信息，存储结果如下：
  - Windows：%localappdata%\NuGet\plugins-cache
  - Mac/Linux：~/.local/share/NuGet/plugins-cache
  - 使用 NUGET_PLUGINS_CACHE_PATH 环境变量替代。
- 缓存下载过的 nuget 包，也是可以考虑的，每次构建项目直接使用本地缓存，连认证都省去

## 收获

- 奉上相关的 Dockerfile 文件

```Dockerfile
FROM aspnetcore:2.2 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM dotnetcoresdk:2.2 AS build
ARG VSS_NUGET_EXTERNAL_FEED_ENDPOINTS
RUN mkdir ~/.nuget && cd ~/.nuget && wget -O tar https://github.com/microsoft/artifacts-credprovider/releases/download/0.1.18/Microsoft.NuGet.CredentialProvider.tar.gz && tar -xvf tar
WORKDIR /src
COPY ["IdentityServer4/IdentityServer4.csproj", "IdentityServer4/"]
COPY ["IdentityServer4/Nuget.config", "IdentityServer4/"]
COPY ["IdentityServer4.XCode/IdentityServer4.XCode.csproj", "IdentityServer4.XCode/"]
RUN dotnet restore "IdentityServer4/IdentityServer4.csproj" --configfile "IdentityServer4/Nuget.config"
COPY . .
WORKDIR /src/IdentityServer4
RUN dotnet build "IdentityServer4.csproj" -c Release -o /app  --no-restore

FROM build AS publish
RUN dotnet publish "IdentityServer4.csproj" -c Release -o /app  --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "IdentityServer4.dll"]

```

## 总结

- 插件及文档地址：https://github.com/Microsoft/artifacts-credprovider
- 安装： https://github.com/Microsoft/artifacts-credprovider#setup
- 命令行中使用： https://github.com/Microsoft/artifacts-credprovider#environment-variables
