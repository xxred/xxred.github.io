# docker 实用命令

## 查看磁盘占用及清理

- https://blog.csdn.net/weixin_32820767/article/details/81196250

## 查看较大的镜像

`docker system df -v`

## 清理

- https://yq.aliyun.com/articles/272173

## 仓库

### 查询仓库镜像列表

- `curl -XGET http://localhost:32000/v2/_catalog`

### 查询仓库某镜像所有标签

- `curl -XGET http://localhost:32000/v2/{镜像名称}/tags/list`
