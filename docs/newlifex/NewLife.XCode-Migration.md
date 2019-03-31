# 通过 NewLife.XCode 迁移任意现有数据库到任意数据库（附分表分库方法）

- 本文背景是将其他系统的数据库迁移到另一个数据库（仅需 20 行代码），也可以作为项目迁移用，生成自己系统的专属实体代码结构。比如将一些主流的数据库迁移到[NewLife.XCode](https://github.com/NewLifeX/X)，开发基于 XCode 的项目
- 其实只是想拿到别的数据库结构后，生成实体代码进行开发，顺便就更新一下大佬的[利用 XCode 20 行代码搞定任何数据库的迁移](http://www.cnblogs.com/asxinyu/archive/2012/04/26/2470838.html)

## 源数据库

- 如果已有源数据库，请跳下一步
- 此教程以 IdentityServer4 的 [Ids4Admin](https://github.com/IdentityServer/IdentityServer4.Templates) 的`is4admin`模板为例
- 首先安装模板`dotnet new -i identityserver4.templates`，然后新建项目`dotnet new is4admin`，运行项目`dotnet run`，访问[http://localhost:5000](http://localhost:5000)
- 运行一次项目之后会得到 sqlite 数据库文件，到这里我们就有了源数据库
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/docs/newlifex/imgs/2019-03-20-15-28-44.png)
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/docs/newlifex/imgs/2019-03-20-15-29-40.png)

## 码神工具 XCoder 生成实体代码

- 以下将完成模型文件的导出和实体类代码生成，对于表结构差别有点大，并且数据量不多的情况，可以生成实体类手动执行`读取数据->写入数据`的操作，这样可以执行一些数据手动处理。比如不仅是迁移，并且数据结构有一点变化，这样就可以从原数据库读取数据，处理后插入新的数据库。**否则就采用反向工程获取表结构逆向生成新的数据库结构直接把数据从源数据库导入新数据库。**

### 下载 XCoder

- 源码地址 https://github.com/NewLifeX/XCoder ，建议自己拉代码下来编译
- 编译完成后，在输出目录找到`XCoder.exe`，以及`XCoder.exe.config`，双击打开运行码神工具

### 配置连接

- 打开`XCoder.exe.config`，添加数据库连接，码神工具内置了支持的数据库的连接写法，现在我们配置 sqlite 的连接，并把刚刚的`IdentityServer.db`复制到码神工具目录
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/docs/newlifex/imgs/2019-03-20-15-33-13.png)
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/docs/newlifex/imgs/2019-03-20-15-32-42.png)

### 导出模型文件

- 打开码神工具，并依次打开工具-数据建模工具
- 在连接处选择刚刚配置的连接 IdentityServer 并点击连接，导出模型，即可得到 xml 模型文件
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/docs/newlifex/imgs/2019-03-20-15-43-45.png)

### 生成实体模型代码

- 新建控制台项目，Nuget 安装`NewLife.XCode`，如果没有 tt 文件，可从源码[X 组件](https://github.com/NewLifeX/X/blob/master/XCode/Build.tt)中获取，注意`NewLife.Core`和`XCode`的 dll 路径，如果不对的话可设置为当前目录，并将码神工具目录下的 dll 放到与 tt 文件相同目录

```t4
<#@ assembly name="NewLife.Core.dll" #>
<#@ assembly name="XCode.dll" #>
```

- 将刚导出的模型文件复制到与 tt 相同的目录，vs 中选中 tt 文件，选择右键运行自定义工具，稍等片刻，即可生成实体代码文件
  ![ ](https://raw.githubusercontent.com/xxred/xxred.github.io/master/docs/newlifex/imgs/2019-03-20-16-59-21.png)

## 迁移过程（重点）

- 主要是更新`http://www.cnblogs.com/asxinyu/archive/2012/04/26/2470838.html`对应的新版代码实现

### 利用反向工程

- 整个过程实际上就是先通过反向工程拿到表架构信息，再通过 XCode 内置的数据同步备份功能实现迁移，指定表架构信息和目标连接字符串即可
- 原理就是根据表架构信息和目标连接字符串，创建目标数据库表，并生成批量插入语句执行
- 这里可以选择单表备份或者多表

```csharp
        /// <summary>
        /// 拷贝数据库，只需要数据库连接字符串和源数据库即可
        /// </summary>
        /// <param name="originConnName">源数据库连接字符串名</param>
        /// <param name="desConnName">目的数据库连接字符串名</param>
        /// <param name="perCount">每次获取的记录数目，如果默认-1则会自动调用函数计算一个合理值</param>
        public static void CopyDataBase(string originConnName, string desConnName, int perCount = -1)
        {
            //思路：通过源数据库获取架构信息，然后反向工程,然后导出数据
            var dal = DAL.Create(originConnName);

            //获取源数据库的架构信息
            var tableList = new List<IDataTable>();

            // 处理表的架构信息
            foreach (var dataTable in dal.Tables)
            {
                //过滤掉视图
                if (dataTable.IsView) continue;

                // 2019-03-31 处理列名称，后续版本会修复此bug，不用此处理
                CheckColumnName(dataTable.Columns);

                // 修正列的类型
                FixColumns(dataTable.Columns);

                tableList.Add(dataTable);
            }

            dal.SyncAll(tableList.ToArray(), desConnName, true);
        }

        /// <summary>
        /// 兼容处理，类型转换
        /// </summary>
        /// <param name="columns"></param>
        public static void FixColumns(List<IDataColumn> columns)
        {
            if (columns.Count < 1)
            {
                return;
            }

            var indexColumns = columns[0].Table.Indexes.SelectMany(s => s.Columns).ToArray();
            foreach (var column in columns)
            {
                // 主键、唯一、类型为text的全部修改为varchar(50)
                if ((!column.PrimaryKey &&
                     !indexColumns.Any(a => a.Equals(column.Name, StringComparison.OrdinalIgnoreCase))) ||
                    !column.RawType.Contains("text", StringComparison.OrdinalIgnoreCase)) continue;

                column.RawType = "varchar(50)";
                column.Length = 50;
            }
        }

        public static void CheckColumnName(List<IDataColumn> columns)
        {
            foreach (var dataTableColumn in columns)
            {
                if (dataTableColumn.Name.IsNullOrWhiteSpace())
                {
                    dataTableColumn.Name = dataTableColumn.ColumnName;
                }
            }
        }
```

### 利用分表分库

- XCode 自带分表分库功能，而且很方便，通过自行指定目标数据库连接字符串，以及不同表名，可将数据保存到目标数据库，甚至不同分表

```csharp
        /// <summary>
        /// 通过实体操作接口批量拷贝数据库，也可作为分表分库功能使用
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="originConnName"></param>
        /// <param name="desConnName"></param>
        /// <param name="perCount"></param>
        public static void CopyDataTable(IEntityOperate factory, string originConnName, string desConnName, int perCount = -1)
        {
            //分页获取数据，并更新到新的数据库，通过更改数据库连接来完成

            FixColumns(factory.Table.DataTable.Columns);

            var allCount = factory.Count;
            var tableName = factory.TableName;

            if (perCount < 0) perCount = GetDataRowsPerConvert(allCount);
            var pages = (int)Math.Ceiling((double)((double)allCount / (double)perCount));

            for (var i = 0; i < pages; i++)
            {
                // 与上面代码等效
                factory.ConnName = originConnName;
                // factory.TableName = tableName;

                var modelList = factory.FindAll(string.Empty, string.Empty, string.Empty, i * perCount, perCount);
                factory.ConnName = desConnName;

                // 分表分库的时候，这里可加上判断是否分表的逻辑，即可将数据保存到分表
                // factory.TableName = tableName + DateTime.Now.ToString("yyyy-MM-dd");

                modelList.Insert(true);
            }
        }

        public static void ExcCopy(string originConnName, string desConnName, int perCount = -1)
        {
            var asm = typeof(ApiClaims).Assembly;
            var entityTypes = asm.GetTypes().Where(s => typeof(EntityBase).IsAssignableFrom(s)).ToArray();

            foreach (var entityType in entityTypes)
            {
                var factory = entityType.AsFactory();
                CopyDataTable(factory, originConnName, desConnName, perCount);
            }
        }

        /// <summary>
        /// 兼容处理，类型转换
        /// </summary>
        /// <param name="columns"></param>
        public static void FixColumns(List<IDataColumn> columns)
        {
            if (columns.Count < 1)
            {
                return;
            }

            var indexColumns = columns[0].Table.Indexes.SelectMany(s => s.Columns).ToArray();
            foreach (var column in columns)
            {
                // 主键、唯一、类型为text的全部修改为varchar(50)
                if ((!column.PrimaryKey &&
                     !indexColumns.Any(a => a.Equals(column.Name, StringComparison.OrdinalIgnoreCase))) ||
                    !column.RawType.Contains("text", StringComparison.OrdinalIgnoreCase)) continue;

                column.RawType = "varchar(50)";
                column.Length = 50;
            }
        }

        public static void CheckColumnName(List<IDataColumn> columns)
        {
            foreach (var dataTableColumn in columns)
            {
                if (dataTableColumn.Name.IsNullOrWhiteSpace())
                {
                    dataTableColumn.Name = dataTableColumn.ColumnName;
                }
            }
        }

        /// <summary>
        /// 根据数据表的记录总数来设置一个合理的每次转换数目。数据量大，一次性导出导入不合理
        /// </summary>
        /// <param name="allCount">数据表记录总数</param>
        /// <returns>每次转换的记录数</returns>
        private static int GetDataRowsPerConvert(int allCount)
        {
            if (allCount < 1000) return 200;
            else if (allCount < 5000) return 500;
            else if (allCount < 50000) return 1000;
            else return 1500;
        }
```

## 结果

- 以表`ClientScopes`的结果为例
- 反向功能同步，由于事先全部逆向创建所有表了，所以这里只有同步时的插入语句

```bash
0:53:55.258  1 N - Select * From ClientScopes limit 10000
10:53:55.258  1 N - 同步[ClientScopes/identityServer_sqlite]数据 0 + 3
10:53:55.270 27 N 19 Insert Into ClientScopes(Id,Scope,ClientId) Values(1,'admin_ui_profile',1),(2,'admin_api',1),(3,'openid',1)
10:53:55.272  1 N - 同步[ClientScopes/identityServer_sqlite]完成，共[3]行，耗时14ms，速度209tps
```

- 分表分库同步，这里是通过反射遍历所有表的类型，通过实体操作接口一个个表同步，所以是建一个表同步一个表的数据

```bash
12:27:33.896  1 N - ClientScopes.Count 快速计算表记录数（非精确）[ClientScopes/identityServer_sqlite] 参考值 -2
12:27:33.896  1 N - Select * From ClientScopes Order By Id Desc limit 1
12:27:33.896  1 N - Select Count(*) From ClientScopes
12:27:33.897  1 N - Select * From ClientScopes Order By Id Desc limit 200
12:27:33.898  9 Y 33 SHOW TABLE STATUS FROM `IdentityServer`
12:27:33.899  9 Y 33 创建表：ClientScopes()
12:27:33.899  9 Y 33 Create Table If Not Exists ClientScopes(
	Id INT NOT NULL AUTO_INCREMENT,
	Scope TEXT NOT NULL,
	ClientId BIGINT NOT NULL,
	Primary Key (Id)
) DEFAULT CHARSET=utf8mb4;
12:27:33.902  9 Y 33 Create Index IX_ClientScopes_ClientId On ClientScopes (ClientId)
12:27:33.913  1 N - Insert Into ClientScopes(Id,Scope,ClientId) Values(3,'openid',1),(2,'admin_api',1),(1,'admin_ui_profile',1)
```

## 遇到的问题

- 每次的不顺都伴随 bug 的发现，此次第一个问题是报索引超出数组范围，原因是数据库会话根据列名称获取序号时，列名称 Name 为空，此处是通过源数据库获取的表结构信息列名 Name 为空，而通过实体类获取的列名 Name 才有值，所以上面代码多了一段处理列名的操作

- 第二个问题发生于创建 mysql 表时，报`BLOB/TEXT column 'CustomerName' used in key specification without a key length`。这种错误有两处，一处是创建索引，比如 Name 是 text 类型，在 mysql 里面不能指明长度，而索引只能索引固定长度的字符，或者前多少个字符，所以要将 text 类型改成 varchar 类型。另一处就是 id 也是 text 类型，作为主键，唯一，在 mysql 中也不允许没有指定长度，还是得改

## 总结

- [例子源码](https://github.com/xxred/DatabaseMigration.git)
- 代码不规范，维护两行泪，迁移过程的主要问题还是表设计的问题，我们设计表的过程尽量用通用的数据类型，这样在跨数据库的时候方便转换。同时根据需求尽量设计合理一点，比如作为主键的 id，如果设计为 text 类型，没有长度限制，或许在某个数据库可以，另一个数据库里却有问题。中间可能涉及存储空间、查找和索引的等（性能）问题
- 常用数据类型有 int、nvarchar、ntext、decimal 和 datetime2
