# 在 windows 的 linux 子系统上使用 docker

- 由于不能直接支持，所以需要链接到远程 docker 主机才能使用
- wsl 上安装 docker 之后，配置环境环境变量`export DOCKER_HOST=tcp://0.0.0.0:2375`，使其链接到其它 docker 主机
- 此时 wsl 上的 docker 就是客户端

## wsl2 支持 docker

- 但是问题一大堆

### gpg: can't connect to the agent: IPC connect call failed

- 添加 docker 官方密钥出错，使用以下命令解决

```bash
sudo apt remove gpg

sudo apt install gnupg1
```

### sudo: add-apt-repository: command not found

- 添加仓库命令不存在

```bash
sudo apt-get install software-properties-common
```
