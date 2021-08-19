(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{349:function(e,r,o){"use strict";o.r(r);var a=o(0),n=Object(a.a)({},function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"docker-for-windows-使用-vmware"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#docker-for-windows-使用-vmware","aria-hidden":"true"}},[e._v("#")]),e._v(" Docker for Windows 使用 VMware")]),e._v(" "),o("ul",[o("li",[e._v("本来在 Windows 上通过 Hyper-V 使用 Docker 也没什么问题，但是 Hyper-V 安装一些 linux 系统着实不方便，而且 Hyper-V 与 VMWare 不兼容不能一起使用，加之有时候需要安卓模拟器，也不能共存。因此很希望将 Hyper-V 换成 VMWare。")]),e._v(" "),o("li",[e._v("原理就是更换 Docker machine drivers，然后利用"),o("code",[e._v("docker-machine")]),e._v("命令选择新驱动新增机器，再修改本地环境变量，使本地 docker 命令指向虚拟机内 docker。")])]),e._v(" "),o("h2",{attrs:{id:"驱动"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#驱动","aria-hidden":"true"}},[e._v("#")]),e._v(" 驱动")]),e._v(" "),o("ul",[o("li",[e._v("驱动在 docker 官方文档有提到："),o("a",{attrs:{href:"https://docs.docker.com/machine/drivers/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Machine drivers"),o("OutboundLink")],1),e._v(" "),o("img",{attrs:{src:"http://cdn.hebinghong.com/img/20200331154555.png",alt:" "}})]),e._v(" "),o("li",[e._v("VMware Workstation 驱动非 docker 官方支持，但是列在官方文档。下载地址：https://github.com/pecigonzalo/docker-machine-vmwareworkstation/releases/download/v1.1.0/docker-machine-driver-vmwareworkstation.exe")]),e._v(" "),o("li",[e._v("下载完放在"),o("code",[e._v("C:\\Program Files\\Docker\\Docker\\resources\\bin")]),e._v("，与"),o("code",[e._v("docker-machine.exe")]),e._v("在同一目录。")])]),e._v(" "),o("h2",{attrs:{id:"虚拟机镜像"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#虚拟机镜像","aria-hidden":"true"}},[e._v("#")]),e._v(" 虚拟机镜像")]),e._v(" "),o("ul",[o("li",[e._v("虚拟机所使用的镜像为 boot2docker，如果不自己下载的话，创建 docker machine 也会自动下载，只是可能比较慢。")]),e._v(" "),o("li",[e._v("下载地址为：https://github.com/boot2docker/boot2docker/releases/download/v19.03.5/boot2docker.iso 。最新版为：https://github.com/boot2docker/boot2docker/releases/latest 。")]),e._v(" "),o("li",[e._v("下载好了放在"),o("code",[e._v("C:\\Users\\用户名\\.docker\\machine\\cache")]),e._v("。下面是创建 machine 后的位置，是自动从 cache 目录复制过去的。machine 名称是什么就会在哪个文件夹，下图即是名叫 default 的 machine。\n"),o("img",{attrs:{src:"http://cdn.hebinghong.com/img/20200331174057.png",alt:" "}})]),e._v(" "),o("li",[e._v("打开命令行执行"),o("code",[e._v("explorer.exe .docker\\machine")]),e._v("可快速打开文件管理，如果打开的不是该文件夹，说明 machine 文件夹还没创建。")])]),e._v(" "),o("h2",{attrs:{id:"创建-docker-machine"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#创建-docker-machine","aria-hidden":"true"}},[e._v("#")]),e._v(" 创建 Docker Machine")]),e._v(" "),o("ul",[o("li",[e._v("首先使用命令查看列表："),o("code",[e._v("docker-machine ls")]),e._v("。报错了，但是不要紧我们可以创建其它名字的 machine。")])]),e._v(" "),o("div",{staticClass:"language-text extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("PS C:\\Users\\12504> docker-machine ls\nNAME      ACTIVE   DRIVER              STATE     URL   SWARM   DOCKER    ERRORS\ndev                not found           Error                             open C:\\Users\\12504\\.docker\\machine\\machines\\dev\\config.json: The system cannot find the file specified.\n")])])]),o("ul",[o("li",[e._v("创建名为"),o("code",[e._v("docker")]),e._v("的 machine："),o("code",[e._v("docker-machine create --driver=vmwareworkstation docker")]),e._v("。")]),e._v(" "),o("li",[e._v("在此之前要保证 vm 服务正在运行，将 vm 打开即可")])]),e._v(" "),o("div",{staticClass:"language-text extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("PS C:\\Users\\12504> docker-machine.exe  create docker -d vmwareworkstation\nRunning pre-create checks...\nCreating machine...\n(docker) Copying C:\\Users\\12504\\.docker\\machine\\cache\\boot2docker.iso to C:\\Users\\12504\\.docker\\machine\\machines\\docker\\boot2docker.iso...\n(docker) Creating SSH key...\n(docker) Creating VM...\n(docker) Creating disk 'C:\\Users\\12504\\.docker\\machine\\machines\\docker\\docker.vmdk'\n(docker) Virtual disk creation successful.\n(docker) Starting docker...\n(docker) Waiting for VM to come online...\nWaiting for machine to be running, this may take a few minutes...\nDetecting operating system of created instance...\nWaiting for SSH to be available...\nDetecting the provisioner...\nProvisioning with boot2docker...\nCopying certs to the local machine directory...\nCopying certs to the remote machine...\nSetting Docker configuration on the remote daemon...\nChecking connection to Docker...\nDocker is up and running!\nTo see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: C:\\Program Files\\Docker\\Docker\\Resources\\bin\\docker-machine.exe env docker\n")])])]),o("h2",{attrs:{id:"激活"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#激活","aria-hidden":"true"}},[e._v("#")]),e._v(" 激活")]),e._v(" "),o("ul",[o("li",[e._v("创建完成使用命令"),o("code",[e._v("docker-machine ls")]),e._v("查看创建情况")])]),e._v(" "),o("div",{staticClass:"language-text extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("PS C:\\Users\\12504> docker-machine.exe ls\nNAME      ACTIVE   DRIVER              STATE     URL                          SWARM   DOCKER     ERRORS\ndev                not found           Error                                                     open C:\\Users\\12504\\.docker\\machine\\machines\\dev\\config.json: The system cannot find the file specified.\ndocker    -        vmwareworkstation   Running   tcp://192.168.254.132:2376           v19.03.5\n")])])]),o("ul",[o("li",[e._v("然后使用"),o("code",[e._v("docker-machine env docker")]),e._v("查看环境变量等信息。执行提示的最后一行即可设置环境信息"),o("code",[e._v('& "C:\\Program Files\\Docker\\Docker\\Resources\\bin\\docker-machine.exe" env docker | Invoke-Expression')])])]),e._v(" "),o("div",{staticClass:"language-text extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v('PS C:\\Users\\12504> docker-machine.exe env docker\n$Env:DOCKER_TLS_VERIFY = "1"\n$Env:DOCKER_HOST = "tcp://192.168.254.132:2376"\n$Env:DOCKER_CERT_PATH = "C:\\Users\\12504\\.docker\\machine\\machines\\docker"\n$Env:DOCKER_MACHINE_NAME = "docker"\n$Env:COMPOSE_CONVERT_WINDOWS_PATHS = "true"\n# Run this command to configure your shell:\n# & "C:\\Program Files\\Docker\\Docker\\Resources\\bin\\docker-machine.exe" env docker | Invoke-Expression\n')])])]),o("h2",{attrs:{id:"开机自启"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#开机自启","aria-hidden":"true"}},[e._v("#")]),e._v(" 开机自启")]),e._v(" "),o("ul",[o("li",[e._v("折腾了一番开机自启。首先想到的是 VM 虚拟机的开机自启，需要转为共享虚拟机。这样一来，VM 启动的虚拟机 docker-machine 好像连不上。中间普通虚拟机转化成共享虚拟机过程，还涉及路径的变化，需要修改虚拟机目录的 config.json 以及 vmx 文件。")]),e._v(" "),o("li",[e._v("最后选择了创建开机任务，执行"),o("code",[e._v("docker-machine start docker")]),e._v("命令。win 搜索框搜索“任务计划”，打开任务计划程序点击创建基本任务，接着按提示填写，触发器选择用户登录时，操作填写"),o("code",[e._v("docker-machine start docker")]),e._v("即可。\n"),o("img",{attrs:{src:"http://cdn.hebinghong.com/img/20200408175639.png",alt:" "}}),e._v(" "),o("img",{attrs:{src:"http://cdn.hebinghong.com/img/20200408175720.png",alt:" "}})]),e._v(" "),o("li",[e._v("重启之后，上面激活步骤通过命令设置的环境变量也会失效，因此需要手动在环境变量添加上述参数。依次打开：我的电脑-属性-高级系统设置-环境变量。")])]),e._v(" "),o("h2",{attrs:{id:"问题汇总"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#问题汇总","aria-hidden":"true"}},[e._v("#")]),e._v(" 问题汇总")]),e._v(" "),o("ul",[o("li",[e._v("所有问题，如无解决方法，可加"),o("code",[e._v("-D")]),e._v("参数，进入调试模式，查看更多信息。比如"),o("code",[e._v("docker-machine create --driver=vmwareworkstation -D docker")])])]),e._v(" "),o("h3",{attrs:{id:"卡在-waiting-for-vm-to-come-online"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#卡在-waiting-for-vm-to-come-online","aria-hidden":"true"}},[e._v("#")]),e._v(" 卡在 Waiting for VM to come online")]),e._v(" "),o("ul",[o("li",[e._v("此问题时通常是 VM 受 Hyper-V 影响，假如已有虚拟机，在 VM 不能正常打开，那就要禁用"),o("code",[e._v("Device/Credential Guard")])]),e._v(" "),o("li",[e._v("关闭以下服务，并全部设置为手动\n"),o("img",{attrs:{src:"http://cdn.hebinghong.com/img/20200407175301.png",alt:" "}})]),e._v(" "),o("li",[e._v("命令行执行"),o("code",[e._v("bcdedit /set hypervisorlaunchtype off")])]),e._v(" "),o("li",[e._v("重启电脑")])]),e._v(" "),o("h3",{attrs:{id:"卡在-waiting-for-ssh-to-be-available"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#卡在-waiting-for-ssh-to-be-available","aria-hidden":"true"}},[e._v("#")]),e._v(" 卡在 Waiting for SSH to be available")]),e._v(" "),o("ul",[o("li",[e._v("此问题，可能是指定了 machine 的位置，"),o("code",[e._v("id_rsa")]),e._v("的访问权限过大，将此文件的权限保留在管理员即可。")]),e._v(" "),o("li",[e._v("不建议修改 machine 的位置，因为可能 docker-machine.exe 找不到它，目前还未知道解决方法。")])]),e._v(" "),o("h2",{attrs:{id:"参考"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#参考","aria-hidden":"true"}},[e._v("#")]),e._v(" 参考")]),e._v(" "),o("ul",[o("li",[e._v("https://www.cnblogs.com/stulzq/p/9064828.html")])])])},[],!1,null,null,null);r.default=n.exports}}]);