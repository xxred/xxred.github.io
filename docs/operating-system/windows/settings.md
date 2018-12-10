# 修改常用设置

## Nuget缓存位置

- 微软文档说明 https://docs.microsoft.com/zh-cn/nuget/reference/nuget-config-file
- 参考 http://www.cnblogs.com/lonelyxmas/p/8521878.html
- `globalPackagesFolder`全局缓存位置，大量包下载于此，需要挪个地方
- `repositoryPath`是项目还原之后包所在地址，默认是在项目解决方案目录`packages`文件夹，非`PackageReference`方式引用，包地址会写入csproj文件，多人协作时各个电脑设置不一样，就会导致另一个人找不到引用

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <config>
    <add key="globalPackagesFolder" value="H:\Cache\Nuget\packages" />
    <add key="dependencyVersion" value="Highest" />
    <!-- add key="repositoryPath" value="H:\Cache\installed_packages" /-->
  </config>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="cnblog" value="https://nuget.cnblogs.com/v3/index.json" />
  </packageSources>
</configuration>
```