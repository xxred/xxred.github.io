# ssh——windows 上使用（免密登陆及相关配置）

- 解释下用户目录，及用户工作目录，linux 系统登陆之后就处在工作目录，路径显示的是`~`符号，所以`~`代表的就是用户目录。windows 系统的用户目录位于`C:\\User\\用户名\\`。无特殊说明，下文`~`均指用户目录
- 现在 win10 默认命令行工具使用的是 powershell，执行命令`cd ~`即可切换到用户命令，`explorer.exe .`可在文件夹打开当前目录

## 安装

- 参考 https://code.visualstudio.com/docs/remote/troubleshooting#_installing-a-supported-ssh-client

## win10 上的 ssh

- win10 1803 版本自带并启用
- 开启步骤：设置-应用-应用和功能-管理可选的功能-添加功能-OpenSSH 客户端
- 安装包下载 http://www.mls-software.com/opensshd.html
- 源码库 https://github.com/PowerShell/openssh-portable

## 删除 ssh 中旧的 RSA key

- `ssh-keygen -f "~/.ssh/known_hosts" -R 192.168.188.247`
- 或者端口不是 22 的情况，`ssh-keygen -f "~/.ssh/known_hosts" -R [192.168.188.247]:3645`

## 客户端配置文件

- 这里可以配置不同主机的信息，该文件位于`~/.ssh/config`
- 使用的时候可以直接使用名称，例如`ssh root@192.168.52.129`可用`ssh alpine`替代

```config
Host alpine
    HostName 192.168.52.129
    User root
    IdentityFile ~/.ssh/id_rsa-remote-ssh
```

- https://linux.die.net/man/5/ssh_config

## 使用公钥实现免密登陆

- 默认生成是在`~/.ssh/id_rsa`、`~/.ssh/id_rsa.pub`，pub 后缀为公钥
- 公钥为服务器持有，用于加密，私钥客户端持有，用于解密，证明你拥有私钥
- 登录时默认查找使用`~/.ssh/id_rsa`尝试免密登陆，如果是其他名称，使用参数`ssh -i id_rsa_name user@host`指定私钥
- 生成密钥对，这里不添加加密私钥的密码，所以一路回车

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa-remote-ssh
```

- 在~/.ssh/config 配置远程主机信息

```bash
Host alpine
    HostName 192.168.52.129
    User root
    IdentityFile ~/.ssh/id_rsa-remote-ssh
```

- 将公钥文件传输到远程主机，此时远程主机还没有公钥，所以上面的配置文件虽然指定 IdentityFile，但仍然需要输入密码

```bash
cd ~/.ssh
scp id_rsa-remote-ssh.pub alpine:~/tmp.pub
```

- 将本地公钥（id_rsa.pub 文件）的内容添加到 ssh 主机上相应的授权密钥文件中

```bash
ssh alpine "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat ~/tmp.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm -f ~/tmp.pub"
```

- 执行上述操作之后，使用命令`ssh alpine`就可以免密登陆，只需要输入私钥加密密码。私钥密码是创建密钥对的时候配置的，也可以缓存起来，参考`ssh-add`和`ssh-agent`。这里不设置私钥加密，所以免输入
- 将公钥放到各个主机，客户端只需要密钥，这样妈妈再也不用担心我记不住密码了
- 通俗易懂的博客 https://blog.csdn.net/sduuntion/article/details/26222715
- 参考资料 https://code.visualstudio.com/docs/remote/troubleshooting
- 公钥认证 https://www.ssh.com/ssh/public-key-authentication

## 服务端登录相关配置

- 配置文件一般位于`/etc/ssh/sshd_config`
- 将配置项前面的#号去掉，然后修改值
- 重启服务，`service ssh restart`或`service sshd restart`或`/etc/init.d/ssh restart`

```bash
PermitRootLogin yes #允许root登录
PermitEmptyPasswords no #不允许空密码登录
PasswordAuthentication yes # 设置是否使用口令验证
AuthorizedKeysFile .ssh/authorized_keys #指定授权文件
```

## 总结

- 一开始急于实现功能，没有仔细探究原理，找了很多使用公钥免密登陆教程，其中最大的问题竟然是私钥文件不是默认命名，登陆也没有指定私钥文件，不懂原理真的很吃亏
- 其次找到高质量教程很重要，通俗易懂又面面俱到，而不是一语带过。只要官方教程不是晦涩难懂，还是以官方文档为主
