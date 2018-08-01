# window下安装dotnet有关各种操作

## 安装

- 首先是[github的地址](https://github.com/dotnet/core/blob/master/release-notes/download-archives/)，可以了解最新的版本
- 安装choco
- PowerShell执行命令`choco search dotnetcore`查看有关安装包

```bash
Chocolatey v0.10.11
dotnetcore-sdk 2.1.302 [Approved] Downloads cached for licensed users
dotnetcore 2.1.2 [Approved]
dotnetcore-windowshosting 2.1.2 [Approved] Downloads cached for licensed users
dotnetcore-runtime.install 2.1.2 [Approved]
dotnetcore-runtime 2.1.2 [Approved]
visualstudio2017-workload-netcoretools 1.2.0 [Approved]
dotnetcoresdk 1.0.1 [Approved] Downloads cached for licensed users
dotnetcore-runtime.portable 2.1.2 [Approved]
8 packages found.
```

- 名称后面的是版本，执行`choco install 包名`，即可安装对应的软件，对号入座即可