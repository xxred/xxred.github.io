# 生成 runtimeconfig.json 文件 & additionalProbingPaths 详解

- 本文将告诉你在.net core 项目中生成 runtimeconfig.json 文件，以及一些常用设置
- 其次是详细解释 additionalProbingPaths，为什么设置了这个参数不能做到共享 dll 目录，却还是报错说找不到 dll

## 运行时配置文件

- 运行时配置文件存储应用程序的依赖关系（以前存储在.deps 文件中）。它们还包括运行时配置选项（runtimeconfig.json），例如垃圾收集器模式。（可选）它们还可以包括用于运行时编译的数据（编译设置用于编译原始应用程序，以及该应用程序使用的引用程序集）。

### 文件是怎么产生的？它们在哪里

- 创建一个名为`MyApp`的控制台程序，编译过程过程将生成以下文件：

  - `MyApp.dll` —— 托管程序 MyApp，包含 Main 入口函数。
  - `MyApp.exe` —— apphost.exe 的可执行文件的副本。当应用程序是自包含的，并且希望支持特定平台（不可移植）的可执行文件的框架依赖应用程序版本在 2.1.0+，该文件才会存在（这句不会翻译，领会了大概意思）。
  - `MyApp.runtimeconfig.json` —— 包含运行时配置设置的可选配置文件。该文件对于依赖框架的应用程序是必需的，但对于独立应用程序则不是必需的。
  - `MyApp.runtimeconfig.dev.json` —— 包含运行时配置设置的可选配置文件。该配置文件通常仅存在于未发布的输出中，因此可用于开发时方案。该文件通常指定其他 dll 路径，比如 nuget 包缓存目录。根据每个设置的语义，该设置将与 MyApp.runtimeconfig.json 中的值组合或被 MyApp.runtimeconfig.json 中的值覆盖 。
  - `MyApp.deps.json` —— 用于解决程序集冲突的依赖项，编译依赖项和版本信息的列表。在技术上不是必需的，但是需要使用服务或程序包缓存/共享的程序包安装功能，并在前滚方案中协助选择在应用程序和框架中存在多次的任何程序集的最新版本。如果该文件不存在，则使用当前文件夹中的所有程序集。

- `MyApp.deps.json`旨在由自动化工具生成，不应由用户编辑，因此将`MyApp.runtimeconfig.json`分离出来，可修改运行时设置，其中一些设置与.NET 4.x 的 `MyApp.exe.config`一些配置对应。这就是这 runtimeconfig.json 和 deps.json 之间的关系。

### 文件格式

- 这些文件都是 JSON 格式，编码是 UTF-8。注意不是所有项都是必须的，部分项选择性列出（详见下文）。`.runtimeconfig.json`文件完全是可选的，而在`.deps.json`文件中，只有`runtimeTarget`,`targets`，`libraries`是必须的。如果`.deps.json`文件不存在，那么所有的程序本地的所有程序集都将添加为 TPA（可信平台程序集）。

- [appname].runtimeconfig.json

```json
{
  "runtimeOptions": {
    "configProperties": {
      // 配置属性的完整列表 https://github.com/dotnet/coreclr/blob/master/Documentation/project-docs/clr-configuration-knobs.md
      "System.GC.Server": true, //指示是否应使用服务器GC。
      "System.GC.Concurrent": true, //指示是否应使用后台垃圾回收。
      "System.Threading.ThreadPool.MinThreads": 4,
      "System.Threading.ThreadPool.MaxThreads": 8
    },
    "tfm": "netcoreapp2.1", // 可选的字符串值，用于指定目标框架Moniker。
    "framework": {
      // 此部分的存在表明该应用程序是依赖于框架的应用程序。
      "name": "Microsoft.NETCore.App",
      "version": "2.1.0"
    },
    "applyPatches": true, // 如果为false，则使用以前找到的最兼容的框架版本。当applyPatches未指定或为true时，将使用同一版本或更高版本的框架，该更高版本框架仅与指定框架的patch字段不同（Major.Minor.Patch）。
    "rollForwardOnNoCandidateFx": 1, // 根据设置选择合适的框架版本 https://github.com/dotnet/core-setup/blob/master/Documentation/design-docs/roll-forward-on-no-candidate-fx.md
    "additionalProbingPaths ": ["lib"] // 指定在查找依赖项时要考虑的其他路径的可选属性。值可以是单个字符串，也可以是字符串数组。
  }
}
```

- [appname].deps.json

```json
{
  "runtimeTarget": {
    "name": ".NETCoreApp,Version=v2.0",
    "signature": "aafc507050a6c13a0cf2d6d4c3de136e6571da6e"
  },
  "compilationOptions": {
    "defines": ["TRACE", "DEBUG"],
    "languageVersion": "",
    "platform": "",
    "warningsAsErrors": false
  },
  "targets": {
    ".NETCoreApp,Version=v2.1": {
      // 如果是自包含形式，上面将会是`.NETCoreApp,Version=v2.1/win-x64`
      "MyApp/1.0.0": {
        "dependencies": {
          "System.Banana": "1.0.0"
        },
        "runtime": {
          "MyApp.dll": {}
        },
        "compile": {
          "MyApp.dll": {}
        }
      },
      "System.Banana/1.0.0": {
        "dependencies": {
          "System.Foo": "1.0.0"
        },
        "runtime": {
          "lib/netcoreapp2.1/System.Banana.dll": {
            // 该地址lib开头，代表的是包内地址，与libraries中每个包的path属性组合得到package内文件路径
            "assemblyVersion": "1.0.0.0",
            "fileVersion": "1.0.0.0"
          }
        },
        "compile": {
          "ref/netcoreapp2.1/System.Banana.dll": {}
        }
      },
      "System.Foo/1.0.0": {
        "runtime": {
          "lib/netcoreapp2.1/System.Foo.dll": {
            "assemblyVersion": "1.0.0.0",
            "fileVersion": "1.0.0.0"
          }
        },
        "compile": {
          "ref/netcodeapp2.1/System.Foo.dll": {}
        }
      }
    }
  },
  "libraries": {
    "MyApp/1.0.0": {
      "type": "project",
      "serviceable": false,
      "sha512": ""
    },
    "System.Banana/1.0.0": {
      "type": "package", // package代表是包引用，project代表是项目引用
      "serviceable": true,
      "sha512": "sha512-C63ok7q+Fi6O6I/WB4ut3hFibGSraUlE461LxhhwNk5Vcdl4ijDhX1QDupDdp3Cxr7TgwB55Sd4zNtlwT7ksAA==",
      "path": "system.banana/1.0.0", // 此路径由包名和版本组成，与runtime下的dll路径组合成package内dll文件路径
      "hashPath": "system.banana.1.0.0.nupkg.sha512"
    },
    "System.Foo/1.0.0": {
      "type": "package",
      "serviceable": true,
      "sha512": "sha512-avYGOiBQ4U/fJfzEDF7lzPLhk/w6P9/28y0iiQh3AxlWOheuZTgXA/pzuORuAu/s5B2bXHO2BlvQKZN0PfQ2HQ==",
      "path": "system.foo/1.0.0",
      "hashPath": "system.foo.1.0.0.nupkg.sha512"
    }
  }
}
```

### 文件详解

- 文件详细解释见[runtime-configuration-file](https://github.com/dotnet/cli/blob/master/Documentation/specs/runtime-configuration-file.md#sections)
- 使用包`Microsoft.Extensions.DependencyModel`可以查询正在运行的托管应用程序有关其依赖项的各种数据，默认实例`Microsoft.Extensions.DependencyModel.DependencyContext.Default`。
- 相关文章：[官方文档-.NET Core 运行时配置设置](https://docs.microsoft.com/zh-cn/dotnet/core/run-time-config/)，[深入理解.NET Core 的基元: deps.json, runtimeconfig.json, dll 文件](https://www.cnblogs.com/lwqlun/p/9704702.html)

## additionalProbingPaths 不生效的问题

- 不是不生效，是达不到预期效果，很多人使用这个配置只是为了共享 dll，将一些框架的 dll 集中放到一个文件夹。
- 很多人以为`additionalProbingPaths`等同于.Net 框架 MyApp.exe.config 配置的[runtime.assemblyBinding.probing]（配置如下）。其实不然，runtimeconfig.json 文件的 additionalProbingPaths 设置的目录相当于只是 package 目录，文件结构和 nuget 缓存目录一致。可查看`MyApp.runtimeconfig.dev.json`，里面有几个设置，可查看对应文件夹的文件结构。

```xml
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <probing privatePath="lib" />
    </assemblyBinding>
  </runtime>
</configuration>
```

### 共享 dll，设置搜索路径

- 先做个关于`deps.json`文件的说明，
- 因此 additionalProbingPaths 配置设置的目录不是直接在此目录直接搜索的，而是要求 package 结构。**那么如何共享 dll 呢？**加入设置的搜索目录是`lib`，方法有下面几个：

  - 1.既然是要求包结构，那么可以复制 nuget 包缓存目录里面的文件，连同结构一起复制到 lib 文件夹，此法麻烦。
  - 2.如果希望全部 dll 都放在 lib 目录，那么需要修改`deps.json`，`targets` 节点下，每个包的 `runtime` 就是 dll 的路径，加上`libraries`节点每个包的`path`，组合成了在 lib 中的目录。因此修改这两个参数即可。`runtime`中的 dll 路径直接设置为 dll，`path`设置为当前目录，不设置默认是包名+版本。修改后如下（部分省略）：

  ```json
  {
   "targets": {
    ".NETCoreApp,Version=v2.1": {
      "System.Banana/1.0.0": {
        "runtime": {
          "System.Banana.dll": {}
        }
      }
    },
    "libraries": {
    "System.Banana/1.0.0": {
      "path": "."
    }
  }
  ```

- 注意，对于自包含应用，所有的 dll 都是在应用目录，`deps.json`中 runtime 记录的 dll 名称不含路径，path 属性也没有。而框架依赖应用，runtime 中的 dll 名称是包内路径，path 记录的是包名+版本。另外，`targets`节点下的`native`，目前经我测试，框架的运行时（比如 nuget 包 Microsoft.NETCore.App.Runtime.win-x64）的`native`要放在应用目录，其他第三方包的`native`未测试，但文档说会搜索`APPROOT/runtimes/win-x64/native/sni.dll`类似的目录。

## runtimeconfig.json 文件创建

- 一下是我一番探索的结果，得到了该文件的创建方法，当时是在找不到文档。
- 先分析`MyApp.runtimeconfig.json`是编译后生成的，所以在[Microsoft.NET.Build.Tasks](https://github.com/dotnet/sdk/blob/7209eb0e66bfba58714af68ddef81115552a4a0c/src/Tasks/Microsoft.NET.Build.Tasks/targets/Microsoft.NET.Sdk.targets#L194)，找到任务`GenerateBuildRuntimeConfigurationFiles`。
- 再根据名称找到源码[GenerateRuntimeConfigurationFiles.cs](https://github.com/dotnet/sdk/blob/49a6842940a884f2a06860fa9173c2f11963618d/src/Tasks/Microsoft.NET.Build.Tasks/GenerateRuntimeConfigurationFiles.cs)。看其中属性，`RuntimeConfigPath`相关代码是写入，而`UserRuntimeConfig`是读取。接着在`Microsoft.NET.Sdk.targets`中找到[UserRuntimeConfig](https://github.com/dotnet/sdk/blob/7209eb0e66bfba58714af68ddef81115552a4a0c/src/Tasks/Microsoft.NET.Build.Tasks/targets/Microsoft.NET.Sdk.targets#L41)。
- 最后确定，项目中默认自定义文件名`runtimeconfig.template.json`，
- 下面是例子，注意不要多加`runtimeOptions`。框架会自动读取并合并：

```json
{
  "additionalProbingPaths": ["lib"]
}
```

- 在[关于 .Net Core runtimeconfig 文件说明](https://www.cnblogs.com/wxmayifei/p/11394038.html)中得知，在`.csproj`项目文件也可设置`additionalProbingPaths`，但最后是出现在`.runtimeconfig.dev.json`文件，仅在开发环境中生效，例子如下：

```xml
<ItemGroup>
  <AdditionalProbingPath Include="lib1" />
  <AdditionalProbingPath Include="lib2" />
</ItemGroup>
```

- 既然是默认名称那么就可以修改。自定义的运行时配置文件名，在项目文件中加入`UserRuntimeConfig`，填写自定义名称即可。

```xml
  <PropertyGroup>
  <UserRuntimeConfig>runtimeconfig.template.json</UserRuntimeConfig>
  </PropertyGroup>
```

- 本地相关 tasks `C:\Program Files\dotnet\sdk\2.1.602\Sdks\Microsoft.NET.Sdk\targets`
- 其他配置：[官方文档-.NET Core 运行时配置设置](https://docs.microsoft.com/zh-cn/dotnet/core/run-time-config/)
