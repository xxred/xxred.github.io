# Mysql主从数据库配置

网上的教程也是蛮多的，这里记录下一些要点和注意事项。

- 主要参考
  - [官方文档](https://dev.mysql.com/doc/refman/5.5/en/replication-howto.html)
  - [MySQL主从复制(Master-Slave)实践](https://www.cnblogs.com/gl-developer/p/6170423.html)

## 软硬件环境

|Master机|Slave机|
| -- | -- |
|win10虚拟机|win10开发机|
|win7|win10开发机|
|win server 2008 r2服务器|win server 2008 r2服务器|

- 试过Master机、Slave机不同组合都可以实现，所以跟系统环境关系不大。
- MySql使用的版本是5.5.*。尽量保持版本一致，否则新版数据库的sql语句可能在旧版数据库执行失败。

## 主从配置

- [主库配置](https://dev.mysql.com/doc/refman/5.5/en/replication-howto-masterbaseconfig.html)
  - 备份数据库（可选操作，避免手贱误操作的后悔药）
  - 配置server-id
  - 记录二进制日志文件名和位置
  - [创建用于读取日志的账号](https://dev.mysql.com/doc/refman/5.5/en/replication-howto-repuser.html)（可选操作，也可以用root账号，实际生产建议新建账号）
- [从库配置](https://dev.mysql.com/doc/refman/5.5/en/replication-howto-slavebaseconfig.html)
  - 还原备份，如果有的话（保持数据库状态一致）
  - 配置server-id
  - [配置主数据库信息和日志信息](https://dev.mysql.com/doc/refman/5.5/en/replication-howto-slaveinit.html)
  - 启动slave服务

### 配置文件

- win上配置文件可能是`my.ini`，linux上可能是`my.cnf`

### 主库配置

- 备份数据库，如果都是新库，不用备份。如果需要备份，可以输出sql文件，也可以锁表直接拷贝数据库文件。
- 修改配置

```bash
[mysqld]
log-bin=mysql-bin #开启二进制日志
server-id=1 #设置server-id
# 不同步的数据库
binlog-ignore-db = mysql
binlog-ignore-db = test
# 需要同步的数据库
binlog-do-db = mytest
```

- 重启后配置生效，记录日志信息
  - 打开命令窗口，执行`mysql -h localhost -u root -p`进行登陆
  - 登陆后执行`SHOW MASTER STATUS;`，记录日志文件名和位置

```bash
mysql > SHOW MASTER STATUS;
+------------------+----------+--------------+------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
+------------------+----------+--------------+------------------+
| mysql-bin.000003 | 107      | mytest       | mysql,test       |
+------------------+----------+--------------+------------------+
```

- 创建用户，用于同步，给从库登陆读取日志用

```bash
mysql> CREATE USER 'repl'@'192.168.209.129' IDENTIFIED BY 'repl123456';#创建用户
mysql> GRANT REPLICATION SLAVE ON *.* TO 'repl'@'192.168.209.129';#分配权限
mysql>flush privileges;   #刷新权限
```

### 从库配置

- 恢复备份，为的就是保持数据一致性，都是新库就不用恢复啦

- 修改配置

```bash
[mysqld]
server-id=2 #设置server-id
#要同步的mstest数据库
replicate-do-db=mytest
replicate-do-db=daystatis
replicate-do-db=hourstatis
replicate-do-db=minstatis
replicate-do-db=monthstatis
replicate-do-db=yearstatis
#要忽略的数据库
replicate-ignore-db=mysql
```

- 重启mysql服务后上述配置生效。命令行登陆数据库后，执行同步配置

```bash
mysql->change master to master_host='192.168.209.129',master_user='repl',master_password='repl123456',master_port=3306,master_log_file='mysql-bin.000003',master_log_pos=107;
```

- 开始同步及查看状态

  - 开始同步之后，从库IO进程根据配置连接主库获取日志文件，拿回来放到中继日志。SQL进程执行中继日志中的sql，完成同步。执行sql至关重要，数据状态不一致可能会导致执行出错，同步失败。
  - 查看状态，`Slave_IO_Running`和`Slave_SQL_Running`状态为`yes`为状态正常。
  - 如果有一个状态不是`yes`，同步失败，`Last_Error`记录错误信息，停止同步，排查问题之后，重复执行从库配置步骤即可。

```bash
# 开始同步
mysql->start slave;
# 查看同步状态
mysql->show slave status\G;
# 停止同步
mysql->stop slave;
```

## 经验分享和注意事项

- Master库开启二进制日志，操作数据库的语句都记录在日志，Slave库IO进程从指定位置开始读取日志过来，SQL进程读取日志的SQl语句，再执行一次，就把数据同步过来了。两个进程随便挂一个都会导致同步中断，一般是SQL进程容易挂，执行SQL语句的时候出错。
- Master库情况可能是新安装，没使用过，然后开启二进制日志，日志记录了创建表的语句，所以Slave库事先不用创建库表。
- 如果Master库已经投入使用，源源不断在产生数据了，这时候开启二进制日志，只有插入语句，没有创建表语句，Slave库同步的时候执行插入语句，往不存在的库表插入式数据当然会报错。
- 所以上面这种情况，在配置好Master库，可选的停止Master库的操作，将备份还原到Slave库，保证两边状态一致，期间不操作数据库。待到Slave库配置好之后再开启Master库，此后的操作都将同步成功，不太可能出错。看情况选择锁表，只读不能写，或者直接停止服务，看大家是自己玩还是生产环境，怎么方便怎么来，怎么安全怎么来，最重要的是我们学会和理解这些操作，灵活使用。
- 如果不停止Master库，并且源源不断有数据入库，**从Master库导出备份后再开启二进制日志**，要及时记录开启日志后的位置，否则等写入一些数据之后在记录日志位置就少同步一部分数据了。Master库开启二进制日志并马上记录日志位置，还原备份之后，配置Slave库后开始同步从记录的位置之后的数据，中间就会缺少备份完成到记录日志位置的这段操作。如果缺少的部分恰好是创建表操作，备份又没有包含创建的表，这时候同步或者之后同步的操作中包含对新表的操作就会出错。
- Slave库中同步的表不能再进行写入操作，否则可能会跟同步的操作冲突，破坏一致性，造成同步失败。比如Slave库表插入一条id为3的记录，同步的时候也有插入id为3的记录，就会造成主键重复，也导致同步失败。

## 总结

- 别人写的教程可能会有错漏，操作的时候多个心眼，最好根据官方文档来，理解了再做，避免误操作发生“删库跑路”的意外。