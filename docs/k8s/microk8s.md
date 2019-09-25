# 使用 microk8s 安装单节点 k8s 集群

- microk8s 适用于 42 种 Linux 版本的单一 k8s 包。专为开发人员而设计，非常适合边缘，物联网和电器。由于总所周知的网络原因，默认的镜像包下载地址无法访问，本文可作为第一次安装的人的一份参考

## 安装

- 安装环境为 ubuntu18.04，此系统已内置 snap，可以直接通过 snap 安装
- 安装命令`sudo snap install microk8s --classic`
- 或者选择其他系列版本，如`v1.14`。`v1.14`版本开始，容器运行时默认改为[containerd](https://containerd.io/) 。命令`snap install microk8s --classic --channel=1.14/stable`
- 这里我选择安装`v1.15`系列的，`snap install microk8s --classic --channel=1.15/stable`
- 安装完成，使用命令`microk8s.status`查看`microk8s`是否可用。安装完成将有如下输出：

```bash
microk8s is running
addons:
knative: disabled
jaeger: disabled
fluentd: disabled
gpu: disabled
cilium: disabled
storage: disabled
registry: disabled
rbac: disabled
ingress: disabled
dns: disabled
metrics-server: disabled
linkerd: disabled
prometheus: disabled
istio: disabled
dashboard: disabled
```

- 为了避免与已安装的 kubectl 发生冲突并避免覆盖任何现有的 Kubernetes 配置文件，MicroK8s 添加了一个 microk8s.kubectl 命令，配置为专门访问新的 MicroK8s 安装。在使用 kubectl 时，确保前缀 kubectl 用 microk8s，如：

```bash
microk8s.kubectl get nodes
microk8s.kubectl get services
```

- 如果 kubectl 没有安装过，则可以别名 microk8s.kubectl 来 kubectl 使用下面的命令`snap alias microk8s.kubectl kubectl`，恢复命令`snap unalias kubectl`
- 如果已经安装了 kubectl，可以用下面的命令覆盖配置文件：

```bash
microk8s.kubectl config view --raw > $HOME/.kube/config
```

## 问题排查

- 安装过程通过命令`microk8s.inspect`排查，通过命令`journalctl -u snap.microk8s.<daemon>.service`查看有问题的服务的日志。所有服务`running`以及没有`WARNING`就是安装成功了。以下是一个例子，需要配置防火墙：

```bash
Inspecting services
  Service snap.microk8s.daemon-containerd is running
  Service snap.microk8s.daemon-apiserver is running
  Service snap.microk8s.daemon-proxy is running
  Service snap.microk8s.daemon-kubelet is running
  Service snap.microk8s.daemon-scheduler is running
  Service snap.microk8s.daemon-controller-manager is running
  Service snap.microk8s.daemon-etcd is running
  Copy service arguments to the final report tarball
Inspecting AppArmor configuration
Gathering system information
  Copy processes list to the final report tarball
  Copy snap list to the final report tarball
  Copy VM name (or none) to the final report tarball
  Copy disk usage information to the final report tarball
  Copy memory usage information to the final report tarball
  Copy server uptime to the final report tarball
  Copy current linux distribution to the final report tarball
  Copy openSSL information to the final report tarball
  Copy network configuration to the final report tarball
Inspecting kubernetes cluster
  Inspect kubernetes cluster

 WARNING:  IPtables FORWARD policy is DROP. Consider enabling traffic forwarding with: sudo iptables -P FORWARD ACCEPT
The change can be made persistent with: sudo apt-get install iptables-persistent
Building the report tarball
  Report tarball is at /var/snap/microk8s/826/inspection-report-20190906_092912.tar.gz
```

- 通过命令解决：`sudo iptables -P FORWARD ACCEPT`，利用`ufw`持久化这些配置`sudo ufw default allow routed`

## 下载镜像

### 修改 sandbox_image

- 不修改也行，使用下面加载镜像的脚本，也能得到 `k8s.gcr.io/pause:3.1`
- 编辑`/var/snap/microk8s/current/args/containerd.template.toml`文件，sandbox_image 处修改为：

```toml
[plugins]
  [plugins.cri]
    sandbox_image = "registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1"
```

### 更换镜像源

- 编辑`/var/snap/microk8s/current/args/containerd.template.toml`文件，mirrors 处修改为：

```toml
[plugins]
  [plugins.cri]
    [plugins.cri.registry]
      [plugins.cri.registry.mirrors]
        [plugins.cri.registry.mirrors."docker.io"]
          endpoint = ["https://registry.docker-cn.com"]
        [plugins.cri.registry.mirrors."local.insecure-registry.io"]
          endpoint = ["http://localhost:32000"]
```

- 修改完以上配置之后重启：`microk8s.stop && microk8s.start`
- 默认镜像下载地址是`k8s.gcr.io`，我们通过镜像下载到本地，再修改标签的方式解决这个网络问题
- 命令如下：

```bash
#!/bin/bash
images=(
k8s.gcr.io/pause:3.1=registry.cn-hangzhou.aliyuncs.com/google-containers/pause:3.1
gcr.io/google_containers/defaultbackend-amd64:1.4=gcr.azk8s.cn/google-containers/defaultbackend-amd64:1.4
k8s.gcr.io/kubernetes-dashboard-amd64:v1.10.1=registry.cn-hangzhou.aliyuncs.com/google_containers/kubernetes-dashboard-amd64:v1.10.1
k8s.gcr.io/heapster-influxdb-amd64:v1.3.3=registry.cn-hangzhou.aliyuncs.com/google_containers/heapster-influxdb-amd64:v1.3.3
k8s.gcr.io/heapster-amd64:v1.5.2=registry.cn-hangzhou.aliyuncs.com/google_containers/heapster-amd64:v1.5.2
k8s.gcr.io/heapster-grafana-amd64:v4.4.3=registry.cn-hangzhou.aliyuncs.com/google_containers/heapster-grafana-amd64:v4.4.3
)

OIFS=$IFS; # 保存旧值

for image in ${images[@]};do
    IFS='='
    set $image
    docker pull $2
    docker tag  $2 $1
    docker rmi  $2
    docker save $1 > 1.tar && microk8s.ctr -n k8s.io  i import 1.tar && rm 1.tar
    IFS=$OIFS; # 还原旧值
done
```

### 查看需要的镜像

- 通过命令 `microk8s.kubectl get all -A`查看名字是`pod/`开头的，找到 pod 对应名称，然后使用命令`microk8s.kubectl describe pod kubernetes-dashboard-7d75c474bb-44789 -n kube-system`查看输出最后的事件，事件描述了需要拉取哪个镜像。当启用某个插件的时候，因网络问题无法启动，可通过此方法找到所需镜像，再根据上述命令从别的地方拉取

```bash
  NAMESPACE NAME READY STATUS RESTARTS AGE
  kube-system pod/kubernetes-dashboard-7d75c474bb-44789 1/1 Running 0 4d
```

## dashboard

- Kubernetes Dashboard 是 Kubernetes 集群的基于 Web 的通用 UI。它允许用户管理在群集中运行的应用程序并对其进行故障排除，以及管理群集本身
- 默认情况下，dashboard 部署完会自动生成一个证书，但是这个证书貌似不是很好使，一般浏览器不放行，只有火狐浏览器能忽略风险继续访问，因此需要用自己的证书替换，只需要在启用 dashboard 前，在与 dashboard 相同命名空间下创建名为
  kubernetes-dashboard-certs 的密钥

### 生成证书

- 可以用[Let's Encrypt](https://letsencrypt.org/)生成证书，或者使用自签名证书，参考 https://github.com/kubernetes/dashboard/blob/master/docs/user/certificate-management.md
- 以下使用 openssl 生成证书，当提示输入密码时直接回车跳过即可

```bash
# 生成dashboard.key私钥和dashboard.csr文件
openssl genrsa -des3 -passout pass:123456 -out dashboard.pass.key 2048
openssl rsa -passin pass:123456 -in dashboard.pass.key -out dashboard.key
rm dashboard.pass.key
openssl req -new -key dashboard.key -out dashboard.csr
# SSL证书
openssl x509 -req -sha256 -days 365 -in dashboard.csr -signkey dashboard.key -out dashboard.crt
rm dashboard.csr
mkdir certs && mv dashboard.key dashboard.crt certs
```

### 创建密钥

- 自定义证书必须存储在与 Kubernetes Dashboard 相同的命名空间中的 kubernetes-dashboard-certs 密钥中。将 dashboard.crt 和 dashboard.key 文件存储在 certs 目录下，然后用这些文件的内容创建密钥
- 参考 https://github.com/kubernetes/dashboard/blob/master/docs/user/installation.md#recommended-setup

```bash
microk8s.kubectl create secret generic kubernetes-dashboard-certs --from-file=./certs -n kube-system
```

### 部署并访问

- 启用插件，`microk8s.enable dns ingress dashboard`
- 修改 dashboar dservice 中 spec-type 为 `NodePort`：`microk8s.kubectl edit svc kubernetes-dashboard -n kube-system`
- 使用命令`kubectl.exe describe svc kubernetes-dashboard -n kube-system`查看 NodePort，该值则为主机端口，访问 https+主机 ip+NodePort 即可
- 登录之前需要获取 token，使用如下命令获取：

```bash
microk8s.kubectl -n kube-system describe secret $(microk8s.kubectl -n kube-system get secret | grep default-token | cut -d " " -f1) | grep token: | awk '{print $2;}'
```

- 到这里就完成了 dashboard 的部署和访问了

## 总结

- 以上就是本文关于 k8s 的单机版部署过程，适合新手即开发环境，建议多多动手敲一下命令，加快熟悉速度
- 安装过程注意所有涉及的组件，以及相关名词，再结合文档 https://kubernetes.io/docs/home/ 排坑，这将是愉快的学习之旅
