# VS上使用Nuget部分分析

介绍VS项目是如何使用Nuget的，如何还原包，如何处理包与项目之间的关系，如何复制Nuget包里面文件到项目
> 如何特殊说明，默认说的是 . Net Core项目，以及VS2017

## Nuget包还原过程

- 各位同学可能都注意到第一次还原项目之后，项目多了个obj文件夹，里面多了一些文件，`项目名+".nuget.*"`，另外还有个`project.assets.json`文件，Nuget就是利用这个文件开始工作，利用此文件执行了`ResolveNuGetPackageAssets`任务
- 首先看这个文件`C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\Microsoft\NuGet\15.0\Microsoft.NuGet.targets`，现在解析一下这个文件干了什么事情

- 1.使用[UsingTask](https://docs.microsoft.com/zh-cn/visualstudio/msbuild/usingtask-element-msbuild?view=vs-2017)导入任务，也就是导入dll里面的任务

- 2.根据以下顺序标识项目的asset/lock文件，即给`$(ProjectLockFile)`赋值，如果以下条件均不满足，NuGet build targets就不会运行：

  - `$(ProjectAssetsFile)`如果已经声明，则给`$(ProjectLockFile)`赋值，这意味着项目使用  [PackageReference]  (https://docs.microsoft.com/zh-cn/nuget/consume-packages/package-references-in-proj  ect-files)

  - 如果`$(RestoreProjectStyle)`等于`PackageReference`（也就是项目使用的包管理格式为  [PackageReference]  (https://docs.microsoft.com/zh-cn/nuget/consume-packages/package-references-in-proj  ect-files)），赋值`$(BaseIntermediateOutputPath)project.assets.json`

  - 如果存在`project.json`文件，则使用`project.lock.json`

  - 如果上述条件均不满足，`assets or lock file`都不存在，默认赋值`$(BaseIntermediateOutputPath)project.assets.json`

- 3.添加MSBuildAllProjects以更好的支持增量构建

- 4.检查运行时标识符，如果没有明确声明，设置为`win;win-x86;win-x64`

- 5.设置依赖targets，写入`ResolveNuGetPackageAssetsDependsOn`，其中有个依赖target是`ResolveProjectReferences`，用来加载当前所依赖项目的

- 6.执行Task`ResolveNuGetPackageAssets`，又分是否是AOT项目，主要输出了
  - @(Analyzer) - Paths to build-time diagnostic analyzers 构建时诊断分析路径
  - @(Reference) - Paths to build-time NuGet dependencies 构建时NuGet依赖关系路径
  - @(ReferenceCopyLocalPaths) - Paths to run-time dependencies to copy 复制到运行时依赖关系的路径

- 7.执行完之后，将框架注入到混合应用，猜测是将结果注入到全局变量

- 8.最后会导入`$(MSBuildProjectDirectory)\$(MSBuildProjectName).nuget.targets`，`$(MSBuildProjectDirectory)`是项目路径，`$(MSBuildProjectName)`是项目名称，估计是用来启用自定义任务的，比如项目叫做`MyProj`，在项目新建`MyProj.nuget.targets`文件，Nuget Build之后会调用该target

## 猜测

- 以上是对`Microsoft.NuGet.targets`的内容分析，主要是根据`asset/lock文件`进行Nuget 的 还原过程，每个Nuget包可能也含有target，需要解析，导入到项目运行。或者内容文件需要复制到项目，这一切的基础就是`Microsoft.NuGet.targets`。
- 通过文件内容搜索，`Microsoft.NuGet.targets`是由`C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Microsoft.Common.Targets\ImportAfter\Microsoft.NuGet.ImportAfter.targets`导入的，这个文件只是导入`Microsoft.NuGet.targets`而已。而该target应该有某种机制触发的，并没有找到在哪里调用

## 总结

- 通过对这些文件的分析，再结合官方文档，一来可以了解VS项目从点击生成项目到出现编译好的dll中间都发生了什么事，二来我们可以参照这些例子，写一些自己的target，比如测试或者发布，每次build项目，触发测试的target或者发布的target。
- 发现两个比较有趣的东西如下：
  - `Microsoft.NuGet.targets`中`<FrameworkInjectionPackagesDirectory Condition="'$(FrameworkInjectionPackagesDirectory)' == ''">$([MSBuild]::GetRegistryValueFromView('HKEY_LOCAL_MACHINE\SOFTWARE\NuGet\Repository', 'NetCoreSDK', null, RegistryView.Registry32, RegistryView.Default))</FrameworkInjectionPackagesDirectory>`，可以看到`HKEY_LOCAL_MACHINE`，访问了注册表
  - target中的task可以直接写代码，导入`Microsoft.Build.Tasks.v4.0.dll`里面的Task，`Reference`、`Using`、`Code`组合就可以直接写代码啦。一下内容写到`Build.props`，然后再项目文件导入，放在`Project`元素之下`<Project><Import Project="Build.props" Condition="Exists('Build.props')" /></Project>`

  ```xml
    <Project DefaultTargets="Build"     xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
      <Target Name = "BuildModelTarget" BeforeTargets="PrepareForBuild">
        <BuildModel1 />
      </Target>
      <UsingTask TaskName="BuildModel1"  TaskFactory="CodeTaskFactory" AssemblyFile="$  (MSBuildToolsPath)\Microsoft.Build.Tasks.v4.0.dll">
        <Task >
          <Reference Include="System" />
          <Reference Include="System.Management" />
          <Using Namespace="System" />
          <Using Namespace="System.Linq" />
          <Using Namespace="System.Diagnostics" />
          <Using Namespace="System.Management" />
          <Code Type="Fragment" Language="cs">
            <![CDATA[
                throw new Exception("23333");
          ]]>
          </Code>
        </Task>
      </UsingTask>
    </Project>
  ```
