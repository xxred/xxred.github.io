# 生成 RuntimeConfiguration 文件

- https://www.cnblogs.com/lwqlun/p/9704702.html
- https://github.com/dotnet/cli/blob/v2.1.400/Documentation/specs/runtime-configuration-file.md

- 所在任务`GenerateBuildRuntimeConfigurationFiles` https://github.com/dotnet/sdk/blob/7209eb0e66bfba58714af68ddef81115552a4a0c/src/Tasks/Microsoft.NET.Build.Tasks/targets/Microsoft.NET.Sdk.targets#L194
- 源码 https://github.com/dotnet/sdk/blob/49a6842940a884f2a06860fa9173c2f11963618d/src/Tasks/Microsoft.NET.Build.Tasks/GenerateRuntimeConfigurationFiles.cs

- 例子

```xml
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <probing privatePath="lib" />
    </assemblyBinding>
  </runtime>
</configuration>
```

- 默认自定义文件名`runtimeconfig.template.json`，地址：https://github.com/dotnet/sdk/blob/7209eb0e66bfba58714af68ddef81115552a4a0c/src/Tasks/Microsoft.NET.Build.Tasks/targets/Microsoft.NET.Sdk.targets#L41
- 自动读取并合并，比如：

```json
{
  "runtimeOptions": {
    "additionalProbingPaths": ["lib"]
  }
}
```

- 自定义的运行时配置文件名，在项目文件中加入`UserRuntimeConfig`

```xml
  <PropertyGroup>
  <UserRuntimeConfig>runtimeconfig.template.json</UserRuntimeConfig>
  </PropertyGroup>
```

- 相关 tasks `C:\Program Files\dotnet\sdk\2.1.602\Sdks\Microsoft.NET.Sdk\targets`
