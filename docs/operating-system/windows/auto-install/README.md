# window 下的各种自动化

[TOC]

## 软件包管理器

- 如apt-get或yum，brew

### Chocolatey

#### 介绍与安装

- [介绍](https://chocolatey.org/about)
- [安装](https://chocolatey.org/install)
```powershell
# powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

#### 配置

- https://chocolatey.org/docs/chocolatey-configuration
- 如果未下载，可新建环境变量`ChocolateyInstall`为自定义的安装地址，比如`D:\Chocolatey`
- 如果已经下载安装，需要修改Chocolatey安装的位置
  - 因为后续下载的一些包默认是在`C:\ProgramData\Chocolatey\lib`，可以预见会越来越大，C盘由要开始清盘行动
  - 简单粗暴把`C:\ProgramData\Chocolatey`剪切到其他盘，将系统环境变量`ChocolateyInstall`改成剪切后的地址

- [配置命令文档](https://chocolatey.org/docs/commands-config)

- 设置缓存路径

```bash
choco config set cacheLocation F:\Cache\choco
```

#### 安装软件

- [choco安装软件命令文档](https://chocolatey.org/docs/commands-install)
- 

#### 相关文章

- [windows下的brew--->Chocolatey](https://blog.csdn.net/msmile_my/article/details/78665762)
- [chocolatey 定制路径](https://www.jianshu.com/p/f5f4efd04cab)

## 自动安装软件

- 重装系统最烦的是要装很多软件，又要重新找一遍下载地址，而且不记得需要安装什么软件，等到使用再去安装下载就太迟了
- 可视化 ChocolateyGui、Boxstarter
- https://boxstarter.org/WhyBoxstarter#
- 虽然典型的Chocolatey软件包包含静默安装应用程序而无需用户干预的代码，但Boxstarter软件包通常由多次调用Chocolatey的cinst命令组成，以安装环境所需的所有应用程序。但是，它可能还包含将这些应用程序连接在一起并自定义环境所需的相当多的自定义代码。例如，Boxstarter包可能：
  - 为单个IIS Web应用程序创建IIS站点，端口绑定和证书设置。
  - 为需要侦听特定端口的应用程序配置防火墙规则。
  - 调整各种窗口设置，使机器符合用户的口味。
  - 安装重要的Windows更新。
  - 处理配置文件，切换WMI设置以及启动（或停止）环境运行所需的服务。

### 自定义安装包

- https://chocolatey.org/docs/how-to-create-custom-package-templates

## 收集的文章

- [如何在Windows下像Mac一样优雅开发](http://www.yangqiu.cn/shiyanlou-com/2022367.html)
