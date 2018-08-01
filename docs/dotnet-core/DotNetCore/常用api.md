# 常用api

## 获取操作系统信息

- 命名空间`System.Runtime.InteropServices`

- 示例

```csharp
Console.WriteLine("判断是否为Windows Linux OSX");
Console.WriteLine($"Linux:{RuntimeInformation.IsOSPlatform(OSPlatform.Linux)}");
Console.WriteLine($"OSX:{RuntimeInformation.IsOSPlatform(OSPlatform.OSX)}");
Console.WriteLine($"Windows:{RuntimeInformation.IsOSPlatform(OSPlatform.Windows)}");
  ```