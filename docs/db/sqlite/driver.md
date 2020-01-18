# SQLite 关于 linux-arm 上的驱动问题

- 最近[魔方](https://github.com/NewLifeX/NewLife.Cube)要跑在树莓派上，但是 SQLite 驱动却不支持 arm，驱动用的是`System.Data.SQLite`，它只支持`linux-x64`、`osx-x64`、`win-x64`、`win-x86`。下面记录解决办法。

## 问题

- 运行后问题如下：

```bash
11:13:02.432  9 Y 1 System.DllNotFoundException: Unable to load shared library 'SQLite.Interop.dll' or one of its dependencies. In order to help diagnose loading problems, consider setting the LD_DEBUG environment variable: libSQLite.Interop.dll: cannot open shared object file: No such file or directory
   at System.Data.SQLite.UnsafeNativeMethods.sqlite3_config_none(SQLiteConfigOpsEnum op)
   at System.Data.SQLite.SQLite3.StaticIsInitialized()
   at System.Data.SQLite.SQLiteLog.Initialize()
   at System.Data.SQLite.SQLiteConnection..ctor(String connectionString, Boolean parseViaFramework)
   at System.Data.SQLite.SQLiteConnection..ctor(String connectionString)
   at System.Data.SQLite.SQLiteConnection..ctor()
   at System.Data.SQLite.SQLiteFactory.CreateConnection()
```

- 同样的代码，同样的程序，到了 linux-arm 上就出问题了，结合错误信息分析，问题与`SQLite.Interop.dll`有关，但不是文件不存在。
- 该驱动有各个平台的`SQLite.Interop.dll`，通过该文件解决不同平台的需求。但唯独 arm 上没有，理应可以自己编译一个，奈何水平不够，只能瞪着源码干着急。

## 分析

- `Interop`意为互操作，`SQLite.Interop.dll`作为互操作 dll，只能在特定平台被使用。这种方式的优势是库用户可以以 AnyCPU 平台构建项目，并且处理器体系结构将在运行时解析：如果您在 x86 或 x64 上运行，则所有功能都可以按预期工作，前提是两个 dll 均可用。像上述情况，就是 arm 平台的 dll 缺失了 。
- 去[官网下载页](http://system.data.sqlite.org/index.html/doc/trunk/www/downloads.wiki)寻找 arm 相关驱动，但是没有找着。于是把源码下载下来，工程庞大，版本众多，`SQLite.Interop.dll`相关的项目是个 C++工程，根本搞不定，遂放弃。

## 寻找

- 寻找解决方案。在早前将 ORM 迁移到 dotnetcore 的时候，对于 SQLite 部分的驱动，官方并没有提供 linux 版本的，但是微软有一款驱动可以用，提供给 EFCore 用的。其命名空间是`Microsoft.Data.Sqlite`，是属于重新设计过的驱动。这个可以一试。
- 于是将包`Microsoft.Data.Sqlite`添加到项目中测试，文件如下：
  - `Microsoft.Data.Sqlite.dll`
  - `SQLitePCLRaw.batteries_v2.dll`
  - `SQLitePCLRaw.core.dll`
  - `SQLitePCLRaw.nativelibrary.dll`
  - `SQLitePCLRaw.provider.dynamic_cdecl.dll`
  - `runtimes/linux-arm/native/libe_sqlite3.so`，其他平台忽略，只是平台标识换了，和文件名不一样。
- 相比`System.Data.SQLite`只多一个`SQLite.Interop.dll`，微软的驱动多了很多文件，取而代之的是各个平台的类库。linux 平台是`.so`，mac 平台是`.dylib`。
- 换驱动之后，运行结果报错：string 无法强制转化为 DateTime。这个经反复测试，确实是驱动的问题。找到数据类型设计说明[Data Type Mappings](https://github.com/aspnet/Microsoft.Data.Sqlite/wiki/Data-Type-Mappings)以及相关讨论[Sample data to determine CLR type](https://github.com/dotnet/efcore/issues/8824)。由此可知，驱动返回的类型只有`INTEGER`、`BLOB`、`TEXT`、`REAL`。
- 修改 ORM 代码，将 string 转化成 DateTime，运行成功！

## 总结

- 这两种驱动有何异同？以我有限的知识分析，以及参考：[如果有选择，混合模式程序集与单独的互操作 DLL 的优缺点是什么？](https://stackoverflow.com/questions/34144491/given-the-choice-what-are-the-pros-cons-of-mixed-mode-assemblies-vs-separate-i)。得出它们都是属于单独的互操作 dll 模式，有特定平台的类库，托管程序集对其进行 P/Invoke 互操作调用，并且库用户可以在 AnyCPU 平台构建项目。相比混合模式，库用户需要将程序编译为指定平台的程序，跑多少个平台就要编译多少种程序。显然前者占优。
- 跨平台程序，以及嵌入式开发，这些问题都应该是避免不了的，多多了解相关只是用处也非常大。更重要的是要懂得分析出现的问题，以及找到可靠参考资料。
