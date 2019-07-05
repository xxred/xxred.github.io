# Nuget

## 包下载地址设置

- 管理全局包、缓存和临时文件夹 https://docs.microsoft.com/zh-cn/nuget/consume-packages/managing-the-global-packages-and-cache-folders
- 配置文件地址 https://docs.microsoft.com/zh-cn/nuget/consume-packages/configuring-nuget-behavior
- 配置文件地址位于`C:\Users\12504\AppData\Roaming\NuGet`，请将 `12504` 替换成自己的电脑用户名文件名`NuGet.Config`
- 添加节点

```xml
  <config>
    <add key="globalPackagesFolder" value="F:\Cache\Nuget\packages" />
  </config>
```

## 缓存清理

- `dotnet nuget locals http-cache --clear`
- `dotnet nuget locals global-packages --clear`
- `dotnet nuget locals temp --clear`
- `dotnet nuget locals plugins-cache --clear`
- `dotnet nuget locals all --clear`
