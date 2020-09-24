# 迁移gitlab数据

- 本文简单记录一次迁移gitlab数据的过程。
- 大概流程是将数据装进最小容器alpine里，打包成镜像，推到容器镜像服务。再到需要部署的地方拉取镜像，复制出里面的文件，重新运行容器并映射好数据。
- 环境为docker运行的gitlab，数据映射在主机目录
- 当然如果是内网，或者公网网速超快的，也可以直接将数据打包成压缩文件直接下载。

## 容器镜像服务

- 新建一个阿里云容器仓库，打开[此地址](https://cr.console.aliyun.com/cn-shenzhen/instances/repositories)，创建镜像仓库，这里设置为私有。
- 接着获取访问凭证，[访问这里](https://cr.console.aliyun.com/cn-shenzhen/instances/credentials)可设置固定密码或者临时密码。
- 按照访问凭据页面提示，登录镜像仓库

```bash
# 修改为自己的用户名以及区域，此地址参考页面给出的地址
sudo docker login --username=[username] registry.cn-shenzhen.aliyuncs.com
```

## 制作镜像

- 创建Dockerfile

```bash
cd /data # 修改为自己的数据目录
cat <<EOF > Dockerfile
FROM alpine
COPY [".", "/data"]
ENTRYPOINT [ "tail","-f","/dev/null" ]
EOF
```

- 构建镜像

```bash
sudo docker build -t gd .
```

- 修改tag

```bash
# 修改命名间和容器镜像名
sudo docker tag gd registry.cn-shenzhen.aliyuncs.com/w/gitlab-data:latest
```

- 推送

```bash
sudo docker push registry.cn-shenzhen.aliyuncs.com/w/gitlab-data:latest
```

## 重新运行

- 拉取镜像

```bash
sudo docker pull registry.cn-shenzhen.aliyuncs.com/w/gitlab-data:latest
```

- 复制数据到本机地址

```bash
sudo docker run -d --name gd registry.cn-shenzhen.aliyuncs.com/w/gitlab-data sh
sudo docker cp gd:/data/ ./gitlab-data
```

- 确定gitlab版本及容器标签，如下请求得到个版本对应标签，比如v12.1.6，复制下面请求结果文本到编辑器搜索，得到`12.1.6-ce.0`

```bash
curl https://registry.hub.docker.com/v1/repositories/gitlab/gitlab-ce/tags
```

- 运行gitlab

```bash
sudo docker run \
    --restart always \
    --name 'gitlab' \
    -d \
    -p 443:443 \
    -p 80:80 \
    -v $(pwd)/gitlab-data/data/config:/etc/gitlab \
    -v $(pwd)/gitlab-data/data/log:/var/log/gitlab \
    -v $(pwd)/gitlab-data/data/data:/var/opt/gitlab \
    gitlab/gitlab-ce:12.1.6-ce.0
```

- update permission

```bash
sudo docker exec -it gitlab update-permissions
```

- 大功告成！
