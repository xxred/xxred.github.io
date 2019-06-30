# snap 软件包管理

- Ubuntu 16.04 引入了 snap 包管理，它是一种全新的软件包安装管理方式。它和 dpkg/apt 有本质的区别
- snap 是一种全新的软件包管理方式，它类似一个容器拥有一个应用程序所有的文件和库，各个应用程序之间完全独立。所以使用 snap 包的好处就是它解决了应用程序之间的依赖问题，使应用程序之间更容易管理。但是由此带来的问题就是它占用更多的磁盘空间
- https://www.jianshu.com/p/93737d3161bf

其实使用 snap 包很简单，下面我来介绍一下一些常用的命令

- `sudo snap list`
  列出已经安装的 snap 包
- `sudo snap find <text to search>`
  搜索要安装的 snap 包
- `sudo snap install <snap name>`
  安装一个 snap 包
- `sudo snap refresh <snap name>`
  更新一个 snap 包，如果你后面不加包的名字的话那就是更新所有的 snap 包
- `sudo snap revert <snap name>`
  把一个包还原到以前安装的版本
- `sudo snap remove <snap name>`
  删除一个 snap 包
