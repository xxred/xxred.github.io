# Docker for Windows 使用 VMware

- 本来在 Windows 上通过 Hyper-V 使用 Docker 也没什么问题，但是 Hyper-V 安装一些 linux 系统着实不方便，而且 Hyper-V 与 VMWare 不兼容不能一起使用，加之有时候需要安卓模拟器，也不能共存。因此很希望将 Hyper-V 换成 VMWare。
- 原理就是更换 Docker machine drivers，然后利用`docker-machine`命令选择新驱动新增机器，再修改本地环境变量，使本地 docker 命令指向虚拟机内 docker。

## 驱动

- 驱动在 docker 官方文档有提到：[Machine drivers](https://docs.docker.com/machine/drivers/)
  ![ ](http://cdn.hebinghong.com/img/20200331154555.png)
- VMware Workstation 驱动非 docker 官方支持，但是列在官方文档。下载地址：https://github.com/pecigonzalo/docker-machine-vmwareworkstation/releases/download/v1.1.0/docker-machine-driver-vmwareworkstation.exe
- 下载完放在`C:\Program Files\Docker\Docker\resources\bin`，与`docker-machine.exe`在同一目录。

## 虚拟机镜像

- 虚拟机所使用的镜像为 boot2docker，如果不自己下载的话，创建 docker machine 也会自动下载，只是可能比较慢。
- 下载地址为：https://github.com/boot2docker/boot2docker/releases/download/v19.03.5/boot2docker.iso 。最新版为：https://github.com/boot2docker/boot2docker/releases/latest 。
- 下载好了放在`C:\Users\用户名\.docker\machine\cache`。下面是创建 machine 后的位置，是自动从 cache 目录复制过去的。machine 名称是什么就会在哪个文件夹，下图即是名叫 default 的 machine。
  ![ ](http://cdn.hebinghong.com/img/20200331174057.png)
- 打开命令行执行`explorer.exe .docker\machine`可快速打开文件管理，如果打开的不是该文件夹，说明 machine 文件夹还没创建。

## 创建 Docker Machine

- 首先使用命令查看列表：`docker-machine ls`。报错了，但是不要紧我们可以创建其它名字的 machine。

```text
PS C:\Users\12504> docker-machine ls
NAME      ACTIVE   DRIVER              STATE     URL   SWARM   DOCKER    ERRORS
dev                not found           Error                             open C:\Users\12504\.docker\machine\machines\dev\config.json: The system cannot find the file specified.
```

- 创建名为`docker`的 machine：`docker-machine create --driver=vmwareworkstation docker`。
- 在此之前要保证 vm 服务正在运行，将 vm 打开即可

```text
PS C:\Users\12504> docker-machine.exe  create docker -d vmwareworkstation
Running pre-create checks...
Creating machine...
(docker) Copying C:\Users\12504\.docker\machine\cache\boot2docker.iso to C:\Users\12504\.docker\machine\machines\docker\boot2docker.iso...
(docker) Creating SSH key...
(docker) Creating VM...
(docker) Creating disk 'C:\Users\12504\.docker\machine\machines\docker\docker.vmdk'
(docker) Virtual disk creation successful.
(docker) Starting docker...
(docker) Waiting for VM to come online...
Waiting for machine to be running, this may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
Detecting the provisioner...
Provisioning with boot2docker...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
Checking connection to Docker...
Docker is up and running!
To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe env docker
```

## 激活

- 创建完成使用命令`docker-machine ls`查看创建情况

```text
PS C:\Users\12504> docker-machine.exe ls
NAME      ACTIVE   DRIVER              STATE     URL                          SWARM   DOCKER     ERRORS
dev                not found           Error                                                     open C:\Users\12504\.docker\machine\machines\dev\config.json: The system cannot find the file specified.
docker    -        vmwareworkstation   Running   tcp://192.168.254.132:2376           v19.03.5
```

- 然后使用`docker-machine env docker`查看环境变量等信息。执行提示的最后一行即可设置环境信息`& "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env docker | Invoke-Expression`

```text
PS C:\Users\12504> docker-machine.exe env docker
$Env:DOCKER_TLS_VERIFY = "1"
$Env:DOCKER_HOST = "tcp://192.168.254.132:2376"
$Env:DOCKER_CERT_PATH = "C:\Users\12504\.docker\machine\machines\docker"
$Env:DOCKER_MACHINE_NAME = "docker"
$Env:COMPOSE_CONVERT_WINDOWS_PATHS = "true"
# Run this command to configure your shell:
# & "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env docker | Invoke-Expression
```

## 开机自启

- 折腾了一番开机自启。首先想到的是 VM 虚拟机的开机自启，需要转为共享虚拟机。这样一来，VM 启动的虚拟机 docker-machine 好像连不上。中间普通虚拟机转化成共享虚拟机过程，还涉及路径的变化，需要修改虚拟机目录的 config.json 以及 vmx 文件。
- 最后选择了创建开机任务，执行`docker-machine start docker`命令。win 搜索框搜索“任务计划”，打开任务计划程序点击创建基本任务，接着按提示填写，触发器选择用户登录时，操作填写`docker-machine start docker`即可。
  ![ ](http://cdn.hebinghong.com/img/20200408175639.png)
  ![ ](http://cdn.hebinghong.com/img/20200408175720.png)
- 重启之后，上面激活步骤通过命令设置的环境变量也会失效，因此需要手动在环境变量添加上述参数。依次打开：我的电脑-属性-高级系统设置-环境变量。

## 问题汇总

- 所有问题，如无解决方法，可加`-D`参数，进入调试模式，查看更多信息。比如`docker-machine create --driver=vmwareworkstation -D docker`

### 卡在 Waiting for VM to come online

- 此问题时通常是 VM 受 Hyper-V 影响，假如已有虚拟机，在 VM 不能正常打开，那就要禁用`Device/Credential Guard`
- 关闭以下服务，并全部设置为手动
  ![ ](http://cdn.hebinghong.com/img/20200407175301.png)
- 命令行执行`bcdedit /set hypervisorlaunchtype off`
- 重启电脑

### 卡在 Waiting for SSH to be available

- 此问题，可能是指定了 machine 的位置，`id_rsa`的访问权限过大，将此文件的权限保留在管理员即可。
- 不建议修改 machine 的位置，因为可能 docker-machine.exe 找不到它，目前还未知道解决方法。

## 参考

- https://www.cnblogs.com/stulzq/p/9064828.html
