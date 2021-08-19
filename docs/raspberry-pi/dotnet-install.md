# 树莓派安装 dotnet 环境

- 确定系统位数：`uname -m`执行该命令得到结果如果为`armv7l`则是 32 位，如果是`armv8`则是 64 位
- 文档地址https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#manual-install
- 安装完之后，修改 dotnet 的软连接。先删除旧版本的 dotnet`rm /usr/bin/dotnet`。创建新的软连接`sudo ln -s /home/pi/dotnet/dotnet /usr/bin/dotnet`，第一个地址替换为 dotnet 实际安装地址。
  检查版本信息`dotnet --info`。
