# dotnet 程序内存泄露分析

## 先决条件

- 安装相关工具，源文档：`https://docs.microsoft.com/zh-cn/dotnet/core/diagnostics/debug-memory-leak`
- 检查托管内存的使用情况: `dotnet tool install dotnet-counters -g`
- 收集和分析转储文件：`dotnet tool install dotnet-dump -g`
- 示例代码：`https://github.com/dotnet/samples/tree/main/core/diagnostics/DiagnosticScenarios`

## 检查托管内存的使用情况

- 启动应用：`DiagnosticScenarios`
- 找到要分析的程序的进程 ID：`dotnet-counters ps`

```bash
PS C:\Users\12504>  dotnet-counters ps
     39740 DiagnosticScenarios E:\Desktop\samples\core\diagnostics\DiagnosticScenarios\bin\Debug\netcoreapp3.1\DiagnosticScenarios.exe
      5368 DiYi.SmartBox.Api [Elevated process - cannot determine path]
     30532 dotnet     C:\Program Files\dotnet\dotnet.exe
     41088 rzls       c:\Users\12504\.vscode\extensions\ms-dotnettools.csharp-1.23.11\.razor\rzls.exe
      6308 vsls-agent c:\program files (x86)\microsoft visual studio\2019\enterprise\common7\ide\extensions\microsoft\liveshare\Agent\vsls-agent.exe
      8672 vsls-agent c:\Users\12504\.vscode\extensions\ms-vsliveshare.vsliveshare-1.0.4272\dotnet_modules\vsls-agent.exe
     19704 vsls-agent c:\program files (x86)\microsoft visual studio\2019\enterprise\common7\ide\extensions\microsoft\liveshare\Agent\vsls-agent.exe
     23984 vsls-agent c:\program files (x86)\microsoft visual studio\2019\enterprise\common7\ide\extensions\microsoft\liveshare\Agent\vsls-agent.exe
```

- 使用 dotnet-counters 工具检查托管内存的使用情况：`dotnet-counters monitor -refresh-interval 1 -p 39740`。 --refresh-interval 指定两次刷新之间的秒数。

```bash
Press p to pause, r to resume, q to quit.
    Status: Running

[System.Runtime]
    % Time in GC since last GC (%)                                 0
    Allocation Rate (B / 1 sec)                                8,168
    CPU Usage (%)                                                  0
    Exception Count (Count / 1 sec)                                0
    GC Heap Size (MB)                                              6
    Gen 0 GC Count (Count / 1 sec)                                 0
    Gen 0 Size (B)                                           488,160
    Gen 1 GC Count (Count / 1 sec)                                 0
    Gen 1 Size (B)                                            56,936
    Gen 2 GC Count (Count / 1 sec)                                 0
    Gen 2 Size (B)                                           705,752
    LOH Size (B)                                              97,848
    Monitor Lock Contention Count (Count / 1 sec)                  0
    Number of Active Timers                                        1
    Number of Assemblies Loaded                                  122
    ThreadPool Completed Work Item Count (Count / 1 sec)           1
    ThreadPool Queue Length                                        0
    ThreadPool Thread Count                                        2
    Working Set (MB)                                              42
```

- `GC Heap Size (MB)`这一行就是托管堆内存，可以看到现在是 6MB，现在，点击 URL https://localhost:5001/api/diagscenario/memleak/20000。这个时候应该增加 30MB 左右的内存。
- 通过监视内存使用情况，可以确定内存正在增长或泄漏。 下一步是收集内存分析的适当数据。

## 生成内存转储

- 使用以下命令以生成 Linux 核心转储：`dotnet-dump collect -p 39740`

## 分析内存转储文件

- 生成核心转储后，请使用 dotnet-dump 工具分析转储：`dotnet-dump analyze dump_20210512_180812.dmp`
- 查看托管堆的整体状态：`dumpheap -stat`

```bash
...
00007ff93746b1f0    10231       245544 System.Int32
00007ff937c6da10     3766       331408 System.Diagnostics.Tracing.IncrementingCounterPayload
00007ff937522360      928       435024 System.Byte[]
00007ff937c65f78     6456       671424 System.Diagnostics.Tracing.CounterPayload
00000200fed45280    13460      8703536      Free
00007ff937ea7730        8     16646336 testwebapi.Controllers.Customer[]
00007ff937aaea78   800000     19200000 testwebapi.Controllers.Customer
00007ff937521e18   817403     76160856 System.String
Total 1681577 objects
Fragmented blocks larger than 0.5 MB:
            Addr     Size      Followed by
000002013F04B080    0.6MB         000002013F0EBFE8 System.Action`4[[Microsoft.Extensions.Logging.ILogger, Microsoft.Extensions.Logging.Abstractions],[System.String, System.Private.CoreLib],[System.String, System.Private.CoreLib],[System.Exception, System.Private.CoreLib]]
00000201BF011130    0.6MB         00000201BF0B2058 System.Threading.Thread
00000201FF054550    0.6MB         00000201FF0F45B8 System.String
000002023F0114B0    0.6MB         000002023F0B1FE8 System.Object[]
00000202FF012858    0.6MB         00000202FF0B8960 System.Reflection.RuntimeMethodInfo[]
000002037F011030    0.7MB         000002037F0BDFE8 System.String
00000203BF011770    0.7MB         00000203BF0BBFE8 System.String
000002043F013280    0.7MB         000002043F0BDFE8 System.String
000002047F011030    0.6MB         000002047F0B2058 System.Threading.Thread
00000204BF011078    0.6MB         00000204BF0B5FE8 System.String
```

- 可以看到内存最大的几个对象是 String 或 Customer
- 使用 dumpheap 命令查看所有 String 实例的列表：`dumpheap -mt 00007ff937521e18`

```bash
....
00000204bfb2bbe0 00007ff937521e18       94
00000204bfb2bc58 00007ff937521e18       94
00000204bfb2bcd0 00007ff937521e18       94
00000204bfb2bd48 00007ff937521e18       94
00000204bfb2bdc0 00007ff937521e18       94
00000204bfb2be38 00007ff937521e18       94
00000204bfb2beb0 00007ff937521e18       94
00000204bfb2bf28 00007ff937521e18       94

Statistics:
              MT    Count    TotalSize Class Name
00007ff937521e18   817403     76160856 System.String
Total 817403 objects
Fragmented blocks larger than 0.5 MB:
            Addr     Size      Followed by
000002013F04B080    0.6MB         000002013F0EBFE8 System.Action`4[[Microsoft.Extensions.Logging.ILogger, Microsoft.Extensions.Logging.Abstractions],[System.String, System.Private.CoreLib],[System.String, System.Private.CoreLib],[System.Exception, System.Private.CoreLib]]
00000201BF011130    0.6MB         00000201BF0B2058 System.Threading.Thread
00000201FF054550    0.6MB         00000201FF0F45B8 System.String
000002023F0114B0    0.6MB         000002023F0B1FE8 System.Object[]
00000202FF012858    0.6MB         00000202FF0B8960 System.Reflection.RuntimeMethodInfo[]
000002037F011030    0.7MB         000002037F0BDFE8 System.String
00000203BF011770    0.7MB         00000203BF0BBFE8 System.String
000002043F013280    0.7MB         000002043F0BDFE8 System.String
000002047F011030    0.6MB         000002047F0B2058 System.Threading.Thread
00000204BF011078    0.6MB         00000204BF0B5FE8 System.String
```

- 使用 gcroot 命令查看对象的根方式和原因：`gcroot -all 00000204bfb2bf28`

```bash
> gcroot -all 00000204bfb2bf28
HandleTable:
    00000200FECD15F8 (pinned handle)
    -> 00000204FF011038 System.Object[]
    -> 000002027F097758 testwebapi.Controllers.Processor
    -> 000002027F097770 testwebapi.Controllers.CustomerCache
    -> 000002027F097788 System.Collections.Generic.List`1[[testwebapi.Controllers.Customer, DiagnosticScenarios]]
    -> 00000205AF011038 testwebapi.Controllers.Customer[]
    -> 00000204BFB2BF88 testwebapi.Controllers.Customer
    -> 00000204BFB2BF28 System.String

Found 1 roots.
```

- 可以看到 String 由 Customer 对象直接保存，并由 CustomerCache 对象间接保存。
