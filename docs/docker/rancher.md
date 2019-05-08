# 企业级容器管理平台 Rancher 介绍入门及如何备份数据

## 是什么

- Rancher 是一个为 DevOps 团队提供的完整的 Kubernetes 与容器管理解决方案的开源的企业级容器管理平台。它解决了多 Kubernetes 集群管理、操作和安全的难题，同时为 DevOps 团队提供了运行容器化工作负载的管理工具

## 为什么

- docker 的使用其实很简单很方便，一条`docker run`命令就可以跑起一个服务，比如一个 web 系统、一个数据库。可能有的软件配置很复杂，但是用 docker 你可以一条命令就快速跑起来
- 生产中的跑在 docker 中的服务，跟平常方式部署的服务一样，也需要管理。部署、数据备份、升级、扩容，服务多了大了，还有服务发现、负载均衡等。如果手工操作，面对成千上百的服务，运维成本过大。于是有了 k8s，进行容器编排管理
- Kubernetes 集群管理并不是那么容易， 而 Rancher 作为 Kubernetes 管理工具，它可以轻松部署新 K8S 集群，启动 EKS、GKE 和 AKS 集群，甚至导入现有的 Kubernetes 集群。

## 怎么用

- 友好 ui 界面，傻瓜式操作，请看下文教程

## 创建

- 本教程对应的版本是 2.17，网上很多是 1.x 的版本教程
- 注意不要占用 80 和 443 端口，rancher 内置的 nginx-ingress 默认使用的就是 80 和 443 端口，会造成端口冲突，导致 nginx-ingress 服务不正常
- 而且访问 rancher 的 8080 端口，重定向到 https 的连接，默认用的是 8443 端口，所以这些端口最好不要乱改

```bash
sudo docker run -d --restart=unless-stopped --name rancher -p 8080:80 -p 8443:443 rancher/rancher
```

- 基础步骤请参考[文档](https://www.cnrancher.com/docs/rancher/v2.x/cn/overview/quick-start-guide/)

- 创建完集群的过程可能是一两分钟，创建完成之后在所创建的集群菜单下会有 default 和 system 两个选项卡，平时我们的操作主要是在 default

## 注册主机

- 注意服务器地址，如果使用了其他端口，要加端口，这里由于是重新修改的端口，改成 8080 了，但是图中配置还是默认 80 端口

![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/imgs/2019-03-14-16-19-29.png)

## 部署服务

- 集群创建完成，部署服务，仅是在 ui 界面简单配置一下即可，并且该服务还有重新部署、部署备份、回滚等功能。就是这么强大方便
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/imgs/2019-03-31-23-35-23.png)

## 出现的问题

- 添加 ingress 后，一直初始化失败，经过排查，就是上述说的端口占用问题，如图
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/imgs/2019-03-14-14-47-07.png)
- 点击到 system 选项进去查看，可以看到 nginx-ingress 服务用的就是 80 和 443 端口，所以才会一直是初始化状态
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/imgs/2019-03-14-14-49-08.png)
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/imgs/2019-03-14-14-49-39.png)
- 相关 issues https://github.com/rancher/rancher/issues/16172

## 备份

- 出现了上述问题，除了全部删除重建，还可以备份一下，修改端口重新部署，然后还原备份，可以趁机学习一下备份操作
- [官方备份相关文档](https://rancher.com/docs/rancher/v2.x/en/backups/backups/single-node-backups/)

- 命令说明，通过`docker ps -a`查看所有容器，得到版本等相关信息

docker run --volumes-from rancher-data-\<DATE> -v \$PWD:/backup alpine tar zcvf /backup/rancher-data-backup-\<RANCHER_VERSION>-\<DATE>.tar.gz /var/lib/rancher

\<DATE>替换为日期 2019-03-14
\<RANCHER_VERSION>替换 rancher 版本为 v2.1.7

### 1.创建数据卷

docker run --volumes-from rancher-data-2019-03-14 -v \$PWD:/backup alpine tar zcvf /backup/rancher-data-backup-v2.1.7-2019-03-14.tar.gz /var/lib/rancher

### 2.停止容器

docker ps 可看到容器列表，查看镜像名为 rancher 的一项找到名称
docker stop \<RANCHER_CONTAINER_NAME>
\<RANCHER_CONTAINER_NAME>替换为容器名
docker stop rancher

### 3.创建数据容器

docker create --volumes-from \<RANCHER_CONTAINER_NAME> --name rancher-data-\<DATE> rancher/rancher:\<RANCHER_CONTAINER_TAG>

\<RANCHER_CONTAINER_NAME>替换为容器名 rancher
\<DATE>替换为日期 2019-03-14
\<RANCHER_CONTAINER_TAG>替换为镜像名后面的 tag 标签，没有则不填，连同冒号删掉

docker create --volumes-from rancher --name rancher-data-2019-03-14 rancher/rancher

### 4.创建一个备份 tarball

docker run --volumes-from rancher-data-\<DATE> -v \$PWD:/backup:z alpine tar zcvf /backup/rancher-data-backup-\<RANCHER_VERSION>-\<DATE>.tar.gz /var/lib/rancher

\<DATE>替换为日期 2019-03-14
\<RANCHER_VERSION>替换为 rancher 版本 v2.1.7

docker run --volumes-from rancher-data-2019-03-14 -v \$PWD:/backup:z alpine tar zcvf /backup/rancher-data-backup-v2.1.7-2019-03-14.tar.gz /var/lib/rancher

### 5.运行结果

输入 ls 命令查看文件，可以看到名字类似于 rancher-data-backup-\<RANCHER_VERSION>-\<DATE>.tar.gz 的文件

### 6.保存备份

将备份 tarball 移动到 Rancher Server 外部的安全位置。然后把 rancher-data-\<DATE>容器删除

docker rm rancher-data-2019-03-14

### 7.启动 rancher

docker start rancher

### 恢复

docker run --volumes-from <RANCHER_CONTAINER_NAME> -v \$PWD:/backup \
alpine sh -c "rm /var/lib/rancher/\* -rf && \
tar zxvf /backup/rancher-data-backup-\<RANCHER_VERSION>-<DATE>.tar.gz"

docker run --volumes-from rancher -v \$PWD:/backup \\
alpine sh -c "rm /var/lib/rancher/\* -rf && \\
tar zxvf /backup/rancher-data-backup-v2.1.7-2019-03-14.tar.gz"

## 卸载清理

https://blog.csdn.net/csdn_duomaomao/article/details/77684571

## 总结

- 官方的入门文档是图文式的，一步步来还是没什么问题的，但是小问题总会有，不熟悉的人很容易被坑。如何顺利排坑呢，还是需要熟悉相关知识，比如 k8s 命令，错误日志查看，nginx 负载均衡等，涉及知识面广。都不熟悉的话，出了问题便很难解决
