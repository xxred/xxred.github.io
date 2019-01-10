# ssh

## win10上的ssh

- win10 1803版本自带并启用
- 开启步骤：设置-应用-应用和功能-管理可选的功能-添加功能-OpenSSH客户端

## 删除ssh中旧的RSA key

- `ssh-keygen -f "~/.ssh/known_hosts" -R 192.168.188.247`
- 或者端口不是22的情况，`ssh-keygen -f "~/.ssh/known_hosts" -R [192.168.188.247]:3645`