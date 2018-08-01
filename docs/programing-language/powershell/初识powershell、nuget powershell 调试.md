# 初识powershell、nuget powershell 调试

## 前言

老早就听说powershell很牛逼，但是没真正用过，这两天刚好用到，顺便写一下有关的，可能以后用得到的东西。本来想记一下这次使用过程中用到的一些操作的，就是这么巧，发现了个很不错的教程网站，于是我就可以偷懒了，哈哈。

## 相关资料

- 非官方在线教程网站
  - [www.pstips.net](https://www.pstips.net/powershell-online-tutorials)
- 官方文档
  - [入门](https://docs.microsoft.com/zh-cn/powershell/scripting/getting-started/getting-started-with-windows-powershell)
  - [基本指南](https://docs.microsoft.com/zh-cn/powershell/scripting/getting-started/basic-cookbooks)
  - [操作系统要求](https://docs.microsoft.com/zh-cn/powershell/scripting/setup/windows-powershell-system-requirements)
  - [Windows PowerShell ISE](https://docs.microsoft.com/zh-cn/powershell/scripting/core-powershell/ise/introducing-the-windows-powershell-ise)
  - [运行远程命令](https://docs.microsoft.com/zh-cn/powershell/scripting/core-powershell/running-remote-commands)

## 在nuget安装包的时候进行powershell调试

### 调试相关

- 在项目需要用到nuget包[NuGetDebugTools](https://www.nuget.org/packages/NuGetDebugTools/)
- 按照github上[教程](https://github.com/nightroman/PowerShelf/tree/master/Pack/NuGetDebugTools)操作
  - 程序包管理器控制台输入相关命令，在安装需要调试的nuget包的时候就会弹出一个输入框和powershell控制台，输入框内输入命令可进行调试操作，还可以输入变量或者表达式以便在powershell控制台观察结果
  - 添加调试器
    ~~~bash
    Add-Debugger
    ~~~
    或者
    ~~~bash
    Add-Debugger -ReadHost
    ~~~
  - 设置需要调试的脚本名
    ~~~bash
    Set-PSBreakpoint -Command init.ps1, install.ps1, uninstall.ps1
    ~~~
  - 新建项目，安装要调试的nuget包，当命中上一步设置断点脚本时，调试输入框就会出现，执行?就会出现一堆操作提示
    ~~~bash
    s, StepInto  Step to the next statement into functions, scripts, etc.
    v, StepOver  Step to the next statement over functions, scripts, etc.
    o, StepOut   Step out of the current function, script, etc.
    c, Continue  Continue operation (also on empty input).
    q, Quit      Stop operation and exit the debugger.
    ?, h         Write this help message.
    k            Write call stack (Get-PSCallStack).
    K            Write detailed call stack using Format-List.

    <n>          Write debug location in context of <n> lines.
    +<n>         Set location context preference to <n> lines.
    k <s> <n>    Write source at stack <s> in context of <n> lines.

    w            Restart watching the debugger output file.
    r            Write last PowerShell commands invoked on debugging.
    <command>    Invoke any PowerShell <command> and write its output.
    ~~~
  - [关于调试nuget包中ps1脚本的讨论](https://stackoverflow.com/questions/7031944/how-to-debug-install-ps1-script-of-nuget-package)
- 注意
  - nuget包好像分全局安装和在项目里面局部安装，没试过不知道，猜的
  - 打开vs之后调出nuget包管理器控制台安装的方式应该算全局安装，然后在各个项目里面安装包都可以调试
  - 我是在项目里面安装的NuGetDebugTools，也一样能用

### 编写nuget包ps1脚本可能用到的东东

- param($installPath, $toolsPath, $package, $project)文件的第一行这四个参数分别是nuget包的路径、脚本路径、包本身的对象、安装此包的项目对象
- [有时候需要将部分文件的操作改成始终复制到输出目录](http://www.cnblogs.com/lori/p/7765112.html)
- [nuget中ps1脚本的代码示例](https://www.codeproject.com/Articles/209522/PowerShell-Script-Examples-for-NuGet-Packages)

## 总结

- 由于完全没用过，什么姿势都不会，要干嘛完全是问度娘的，资料多还好，不多的时候找不到能用的就无计可施了，找不到组织真的有点盲目。所以学习新的东西要先花点时间找下给力的文档或者教程（什么叫给力？官方的文档不给力吗？嘿嘿，我只想说你们开心就好）。可以是官方文档、官方社区、第三方社区或论坛、还有国外的（英文关键字搜索）。
- 最便捷的方法是找身边相关领域的大牛，有大牛你还找什么教程啊，走起！
- 无论是什么，基本上都有它的套路，摸清楚了套路学的就快了。比如powershell脚本的，执行环境-执行入口-数据类型-变量声明和使用-基本操作-执行结束。再复杂点还有各种生命周期事件，变量作用域等等，快速上手使用基本不用管这么多，只要能哐哐哐跑起来，管它三七二十一。