# gitlab 安装、备份与还原及常见设置

## 安装

- 安装过程比较简单，跑在 docker 上，执行命令即可
- `-v`参数后面的值为卷的名称，自动创建数据卷(如果数据卷不存在)
- https://docs.gitlab.com/omnibus/docker/

```bash
docker run \
    --hostname gitlab.example.com \
    --restart always \
    --name 'gitlab' \
    -d \
    -p 443:443 \
    -p 80:80 \
    -p 22:22 \
    -v gitlab_config:/etc/gitlab \
    -v gitlab_log:/var/log/gitlab \
    -v gitlab_data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest
```

## 配置文件

- 所有设置 https://docs.gitlab.com/omnibus/settings/README.html
- 配置位于文件`/etc/gitlab/gitlab.rb`
- `/var/opt/gitlab/gitlab-rails/etc`文件夹的配置文件则是分开的，清晰明了，可用于查看。`database.yml`是数据库配置文件，`gitlab.yml`是应用配置
- 注意`gitlab.yml`的开头提示`此文件由gitlab-ctl管理。手动更改将删除！要更改以下内容，请编辑/etc/gitlab/gitlab.rb，运行“sudo gitlab-ctl reconfigure”。`，所以最好不要直接编辑这个页面
- [如何重启 gitlab](https://docs.gitlab.com/ce/administration/restart_gitlab.html)，执行`sudo gitlab-ctl restart`重启。只有通过`Omnibus packages`安装的，使配置生效命令`sudo gitlab-ctl reconfigure`才有效。经过实践，发现修改`gitlab.yml`需要重启才能生效，而修改`gitlab.rb`则只需要重新配置，并且会覆盖`gitlab.yml`的设置
- [更改 gitlab.yml 和 application.yml 设置](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/gitlab.yml.md)，这里说明了`gitlab.rb`与`gitlab.yml`等配置文件的关系，由`gitlab.rb`生成配置文件，执行命令`sudo gitlab-ctl reconfigure`使更改生效。
- [gitlab.rb 模板](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-config-template/gitlab.rb.template)
- [gitlab.yml 模板](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-cookbooks/gitlab/templates/default/gitlab.yml.erb)

## 仓库主机地址、服务器地址、wiki 文件上传地址

- 文档见 https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab
- 安装的时候没有指定 host，项目克隆地址使用了默认的 host 地址，需要手动修改设置
- 修改配置文件`/etc/gitlab/gitlab.rb`，设置`external_url ‘https://git.example.com’`，执行命令`sudo gitlab-ctl reconfigure`重新配置快速生效

## 访问内部 PostgreSQL

- 参考教程 https://www.cnblogs.com/UniqueColor/p/7767012.html
- 深入 PostgreSQL 身份验证 https://www.tuicool.com/articles/bQfmUr
- 以下按默认情况处理，并做适当解释
- 查看 gitlab 数据库配置文件 `cat /var/opt/gitlab/gitlab-rails/etc/database.yml`
- 查看数据库验证方式配置文件 `cat /var/opt/gitlab/postgresql/data/pg_hba.conf`
- 查看用户 `cat /etc/passwd`
- 切换登录用户`su - gitlab-psql`，由于默认配置是使用 peer 方式认证，认证工作完全交给系统，所以系统用户名必须与登录数据库用户名一致。
- 参数加横杠有两个作用，第一是切换用户后同时切换到工作目录，第二是添加该用户相关环境变量，否则 psql 无法使用
- 根据数据库配置填写数据库登录主机以及登陆的数据库 `psql -h /var/opt/gitlab/postgresql -d gitlabhq_production`
- 以下是数据库操作命令
- 查看帮助 `\h`
- 查看数据库列表 `\l`
- 查看多表 `\dt`
- 查看单表 `\d users`
- 查看索引 `\di`
- 执行查询 `select id,encrypted_password,name,username from users;`
- 退出 `\q`
- 退出当前登录用户 `exit`

## 备份与还原

### 备份

- 官方文档：https://docs.gitlab.com/ce/raketasks/backup_restore.html
- 由于使用 docker 部署，所以不用按照官方文档走，只需要备份 docker 容器产生的数据，并且是放在数据卷中的数据
- 备份与还原 docker 数据卷数据，参考 https://docs.docker.com/storage/volumes/#backup-restore-or-migrate-data-volumes
- 只需要备份`/var/opt/gitlab`以及`/etc/gitlab`这两个文件夹即可，一个是存放 gitlab 数据,一个存放配置。日志路径位于`/var/log/gitlab`。
- 主要命令如下：

```bash
# 挂载gitlab容器的所有卷到alpine容器，将容器backup目录映射到当前目录，执行备份命令，依次备份所有数据即可
$ cd /var/opt/gitlab
$ docker run --rm --volumes-from gitlab -v $(pwd):/backup alpine tar cvf /backup/backup.tar .
```

- 因为要备份多个文件夹，可进入交互命令环境进行操作

### 还原

- 得到备份数据的压缩文件，创建卷之后还原即可。还原的时候多一步创建卷，类似创建 gitlab 容器时的操作，得到数据卷，再执行类似备份的操作，运行另外的容器挂载新创建容器的卷，只不过压缩变成解压

```bash
# 创建一个匿名卷，挂载到alpine容器的`/var/opt/gitlab`目录
$ docker run -v /var/opt/gitlab --name alpine_data alpine /bin/sh

# 挂载容器alpine_data的数据卷，进入命令交互环境
$ docker run -it --rm --volumes-from alpine_data -v $(pwd):/backup alpine sh

# 在容器内执行下面的还原命令
$ cd /var/opt/gitlab && tar xvf /backup/backup.tar"
```

- 进入容器之后，还原多个压缩包即可，提前创建好对应数据卷

### 运行

- 运行过程同安装过程，挂载上面的数据卷即可，也可以直接解压到主机目录，进行主机目录映射
- 注意一定要确认解压的文件夹的相对路径是否正确，这是可能会犯的一个错。因为上面的打包过程，很可能把数据打包成带路径`/var/opt/gitlab`的格式，导致容器中的数据位于`/var/opt/gitlab/var/opt/gitlab`

## svn 迁移到 git

- 命令参考文档 https://git-scm.com/docs/git-svn
- 教程参考，强烈推荐 https://git-scm.com/book/zh/v2/Git-%E4%B8%8E%E5%85%B6%E4%BB%96%E7%B3%BB%E7%BB%9F-%E8%BF%81%E7%A7%BB%E5%88%B0-Git
- 其它参考，过程都大同小异：
- [SVN 迁移到 git](https://blog.csdn.net/xueshanhaizi/article/details/54929365)
- [SVN 迁移到 GIT 且保留提交日志](https://segmentfault.com/a/1190000014713162)
- [SVN 迁移到 Git 的过程（+ 一些技巧）](http://www.blogjava.net/lishunli/archive/2012/01/15/368562.html)
- [svn 迁移到 git 仓库并保留 commit 历史记录](https://blog.csdn.net/Hello_Mr_Cc/article/details/72742503)
- 以下操作在 ubuntu18.04 上执行，其它 linux 未测试，windows 上可以`shift+右键`点击菜单`在此处选择linux shell`以打开 wsl 子系统，没装的话`wget`改成`curl`，该命令只是下载文件而已
- windows 上安装了 git 的话支持`git svn`命令，ubuntu 需要安装`apt update && apt install git-svn`
- 首先在一个仓库下执行以下命令得到所有提交者信息，等号填写 git 仓库对应的用户名和邮箱

```bash
svn log -q | awk -F '|' '/^r/ {sub("^ ", "", $2); sub(" $", "", $2); print $2" = "$2" <"$2">"}' | sort -u > users.txt
```

```bash
user1 = user1 <user1>
user2 = user2 <user2>
user3 = user3 <user3>
```

- 从 svn clone 到本地`git svn clone http://svn-server:port/project/trunk/path1/path2 --no-metadata --authors-file=users.txt projectname`
- `--authors-file`参数指定提交者信息映射文件，`--no-metadata`去掉多余元数据信息
- 抓一份`.gitignore`模板下来，`mkdir .gitignore && wget -O .gitignore/VisualStudio.gitignore https://raw.githubusercontent.com/github/gitignore/master/VisualStudio.gitignore`
- 添加忽略文件

```bash
$ cd projectname
$ cat ../.gitignore/VisualStudio.gitignore >> .gitignore && \
git svn show-ignore >> .gitignore
```

- 添加文件 `.gitignore`到版本控制 `git add .gitignore`
- 本地提交 `git commit -a -m 'add .gitignore'`
- 添加远程仓库地址 `git remote add origin http://git-server:port/project.git`
- 推送本地 master 分支到远程，`-u`参数会让 master 关联远程分支 `git push -u origin master`
- 其他操作：从 svn 更新 `git svn rebase`、提交到 svn `git svn dcommit`

## 总结

- gitlab 是个内存大户，因此主机内存最好大于 2G，并做资源限制，否则占用了过高内存，会导致 gitlab 服务 503，甚至整个主机都变卡
- 此系统一开始装在内网的 win7 主机，使用`docker for windows`安装，后因需要迁移到服务器，只需要迁移数据卷中数据即可，十分方便
- 由 svn 迁移到 git，使用 git 自带的`git svn clone url`即可方便分离 svn 中的大项目为一个个单独的项目。因为原来的存法是所有项目在某一类文件夹，各个项目的提交记录混在一起，不方便查看，而且项目多了不方便管理
