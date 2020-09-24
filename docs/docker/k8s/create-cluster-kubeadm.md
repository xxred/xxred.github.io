# wsl2 ubuntu20.04 上使用 kubeadm 创建一个单主集群

- 官方文档[使用 kubeadm 创建一个单主集群](https://kubernetes.io/zh/docs/setup/independent/create-cluster-kubeadm/)

## 环境初始化

- 建议尽可能初始化环境，命令`wsl --unregister Ubuntu-20.04`可重新安装，相当于重装系统。安装或重置过程中，打开这个 wsl2 窗口，提示如下：

```bash
Installing, this may take a few minutes...
适用于 Linux 的 Windows 子系统实例已终止。
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username:
```

- 此时关掉窗口再打开，以后则默认使用 root 用户登录。
- 使用阿里镜像：

```bash
sudo cat <<EOF >/etc/apt/sources.list
deb http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs) main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs) main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs)-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs)-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs)-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs)-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs)-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs)-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs)-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ $(lsb_release -cs)-backports main restricted universe multiverse
EOF
```

- 更新缓存

```bash
sudo apt update
```

- wsl2 官方 ubuntu 系统启动方式为 init，而 k8s 安装过程需要系统以 systemd 方式启动。[查询 docker 状态的源码](https://github.com/kubernetes/kubernetes/blob/master/cmd/kubeadm/app/util/initsystem/initsystem_unix.go#L138)，可以看到是通过`systemctl is-active docker`查询，因此要想办法在 wsl2 启用 systemd。

- 参考[Using snapd in WSL2](https://discourse.ubuntu.com/t/using-snapd-in-wsl2/12113)可知： Systemd 已经预安装，但并未激活。使用方式很简单，就是将它放到一个“容器”，在该容器里，Systemd 的 pid 是 1。命令如下：

- 安装`daemonize`

```bash
sudo apt install daemonize
```

```bash
sudo daemonize /usr/bin/unshare --fork --pid --mount-proc /lib/systemd/systemd --system-unit=basic.target
```

- 使用命令`ps -aux`查看进程 pid。使用以下命令进入这个“容器”，在此查看进程 pid，可以看到 pid 为 1 的进程变成了 systemd。使用命令`stat /proc/1/exe`亦可验证。

```bash
exec sudo nsenter -t $(pidof systemd) -a su - $LOGNAME
```

## 安装 Docker

- 安装命令，参考[安装 Docker](https://kubernetes.io/zh/docs/setup/production-environment/container-runtimes/#docker)。

```bash
# 安装 Docker CE
## 设置仓库
### 安装软件包以允许 apt 通过 HTTPS 使用存储库
apt-get update && apt-get install \
  apt-transport-https ca-certificates curl software-properties-common

### 新增 Docker 的 官方 GPG 秘钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

### 添加 Docker apt 仓库
add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"

## 安装 Docker CE
apt-get update && apt-get install \
  containerd.io \
  docker-ce \
  docker-ce-cli -y

# 设置 daemon
cat > /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": ["https://registry.docker-cn.com"],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

mkdir -p /etc/systemd/system/docker.service.d

# 重启 docker.
systemctl daemon-reload
systemctl restart docker
```

- 其它资料：
  - [Cgroup 驱动](https://kubernetes.io/zh/docs/setup/production-environment/container-runtimes/#cgroup-%E9%A9%B1%E5%8A%A8%E7%A8%8B%E5%BA%8F)

## 安装 kubelet、kubeadm、kubectl

- 官方文档[安装 kubeadm、kubelet 和 kubectl](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#%E5%AE%89%E8%A3%85-kubeadm-kubelet-%E5%92%8C-kubectl)
- 官方 GPG 秘钥无法访问，按照[阿里云 Kubernetes 镜像配置](https://developer.aliyun.com/mirror/kubernetes)，设置一下安装源然后开始安装 kubelet、kubeadm、kubectl。因为还没 ubuntu20.04 还没有相应源，先用 ubuntu18.04 的。

```bash
apt-get update && apt-get install -y apt-transport-https
curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubelet kubeadm kubectl
```

## 使用 kubeadm 创建单个控制平面集群

- [初始化文档](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)
- 插件列表参考文档[安装扩展](https://kubernetes.io/zh/docs/concepts/cluster-administration/addons/)
- 污点和容忍： [Taint 和 Toleration](https://kubernetes.io/zh/docs/concepts/configuration/taint-and-toleration/)
- https://hub.docker.com/u/gotok8s
- 初始化命令：`kubeadm init --pod-network-cidr=10.244.0.0/16 --control-plane-endpoint=ubuntu.wsl --image-repository=gotok8s --v=5`

  - 其中 pod-network-cidr 指定网络驱动的 CIDR，根据使用的插件而定。这里使用 [flannel](https://github.com/coreos/flannel/blob/master/Documentation/kubernetes.md)，[文档](https://github.com/coreos/flannel/blob/master/Documentation/kubernetes.md)指示使用值`10.244.0.0/16`。
  - control-plane-endpoint 指定主节点地址，可以是 IP 地址或者是可以映射 ip 地址的 DNS 名称。因此使用前要设置一下:

  ```bash
  cat <<EOF >>/etc/hosts
  $(ip  address | grep eth0 | grep inet | awk -F ' '  '{  print $2}' | awk -F / '{ print $1}')  ubuntu.wsl
  EOF
  ```

  - image-repository 指定拉取镜像的仓库，[gotok8s](https://hub.docker.com/u/gotok8s)是 docker hub 上的用户，同步了安装所需镜像，否则国内会因访问不了 gcr.io 而安装失败。
  - `--v=5`是调试选项，加上后可看到更详细输出。

```text
root@DESKTOP-QNMROJ1:~# kubeadm init --pod-network-cidr=10.244.0.0/16 --control-plane-endpoint=ubuntu.wsl --image-repository=gotok8s
W0706 21:45:49.154779 1903997 version.go:102] could not fetch a Kubernetes version from the internet: unable to get URL "https://dl.k8s.io/release/stable-1.txt": Get https://dl.k8s.io/release/stable-1.txt: dial tcp: lookup dl.k8s.io on 127.0.0.53:53: server misbehaving
W0706 21:45:49.154839 1903997 version.go:103] falling back to the local client version: v1.18.5
W0706 21:45:49.155372 1903997 configset.go:202] WARNING: kubeadm cannot validate component configs for API groups [kubelet.config.k8s.io kubeproxy.config.k8s.io]
[init] Using Kubernetes version: v1.18.5
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [desktop-qnmroj1 kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local ubuntu.wsl] and IPs [10.96.0.1 172.25.14.224]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [desktop-qnmroj1 localhost] and IPs [172.25.14.224 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [desktop-qnmroj1 localhost] and IPs [172.25.14.224 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
W0706 21:45:54.052056 1903997 manifests.go:225] the default kube-apiserver authorization-mode is "Node,RBAC"; using "Node,RBAC"
[control-plane] Creating static Pod manifest for "kube-scheduler"
W0706 21:45:54.053414 1903997 manifests.go:225] the default kube-apiserver authorization-mode is "Node,RBAC"; using "Node,RBAC"
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[apiclient] All control plane components are healthy after 33.002925 seconds
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config-1.18" in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node desktop-qnmroj1 as control-plane by adding the label "node-role.kubernetes.io/master=''"
[mark-control-plane] Marking the node desktop-qnmroj1 as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]
[bootstrap-token] Using token: 8328sm.dh21due3jz2okibj
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of control-plane nodes by copying certificate authorities
and service account keys on each node and then running the following as root:

  kubeadm join ubuntu.wsl:6443 --token 8328sm.dh21due3jz2okibj \
    --discovery-token-ca-cert-hash sha256:31f44da2c275026d9d71ddcd138f8c6a5ac4fecbc167d8b6247788f9651afa53 \
    --control-plane

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join ubuntu.wsl:6443 --token 8328sm.dh21due3jz2okibj \
    --discovery-token-ca-cert-hash sha256:31f44da2c275026d9d71ddcd138f8c6a5ac4fecbc167d8b6247788f9651afa53
```

- 配置 cluster 信息使 kubectl 可用

```bash
# 非 root 用户执行下面命令
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# root用户可执行如下命令
export KUBECONFIG=/etc/kubernetes/admin.conf
```

- 安装网络插件

```bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

- 控制平面节点隔离。默认情况下，出于安全原因，群集不会在控制平面节点上调度 Pod。如果希望能够在控制平面节点上安排 Pod，例如对于用于开发的单机 Kubernetes 群集，请运行：

```bash
kubectl taint nodes --all node-role.kubernetes.io/master-
```

- 运行 nginx 测试。如果遇到`Temporary failure in name resolution`这种访问的问题，请打开非 systemd 空间的控制台操作。

```bash
kubectl run nginx --image=nginx --port=80 --hostport=80
curl 127.0.0.1
```

- 监控集群状态，大概每两秒刷新一次。

```bash
watch kubectl get all -A
```

- [kubeadm 常用命令](https://kubernetes.io/docs/reference/setup-tools/kubeadm/)
- [kubectl 常用命令](https://kubernetes.io/docs/reference/kubectl/kubectl/)
