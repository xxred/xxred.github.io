# 在 windows 的 linux 子系统上使用 docker

- 由于不能直接支持，所以需要链接到远程 docker 主机才能使用
- wsl 上安装 docker 之后，配置环境环境变量`export DOCKER_HOST=tcp://0.0.0.0:2375`，使其链接到其它 docker 主机
- 此时 wsl 上的 docker 就是客户端
