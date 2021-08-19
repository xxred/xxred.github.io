(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{365:function(t,s,n){"use strict";n.r(s);var a=n(0),e=Object(a.a)({},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"dotnet-程序内存泄露分析"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dotnet-程序内存泄露分析","aria-hidden":"true"}},[t._v("#")]),t._v(" dotnet 程序内存泄露分析")]),t._v(" "),n("h2",{attrs:{id:"先决条件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#先决条件","aria-hidden":"true"}},[t._v("#")]),t._v(" 先决条件")]),t._v(" "),n("ul",[n("li",[t._v("安装相关工具，源文档："),n("code",[t._v("https://docs.microsoft.com/zh-cn/dotnet/core/diagnostics/debug-memory-leak")])]),t._v(" "),n("li",[t._v("检查托管内存的使用情况: "),n("code",[t._v("dotnet tool install dotnet-counters -g")])]),t._v(" "),n("li",[t._v("收集和分析转储文件："),n("code",[t._v("dotnet tool install dotnet-dump -g")])]),t._v(" "),n("li",[t._v("示例代码："),n("code",[t._v("https://github.com/dotnet/samples/tree/main/core/diagnostics/DiagnosticScenarios")])])]),t._v(" "),n("h2",{attrs:{id:"检查托管内存的使用情况"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#检查托管内存的使用情况","aria-hidden":"true"}},[t._v("#")]),t._v(" 检查托管内存的使用情况")]),t._v(" "),n("ul",[n("li",[t._v("启动应用："),n("code",[t._v("DiagnosticScenarios")])]),t._v(" "),n("li",[t._v("找到要分析的程序的进程 ID："),n("code",[t._v("dotnet-counters ps")])])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("PS C:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Users"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1250")]),n("span",{pre:!0,attrs:{class:"token operator"}},[n("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("4")]),t._v(">")]),t._v("  dotnet-counters "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v("\n     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("39740")]),t._v(" DiagnosticScenarios E:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Desktop"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("samples"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("core"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("diagnostics"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("DiagnosticScenarios"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("bin"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Debug"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("netcoreapp3.1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("DiagnosticScenarios.exe\n      "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("5368")]),t._v(" DiYi.SmartBox.Api "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Elevated process - cannot determine path"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("30532")]),t._v(" dotnet     C:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Program Files"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("dotnet"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("dotnet.exe\n     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("41088")]),t._v(" rzls       c:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Users"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("12504")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(".vscode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("extensions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("ms-dotnettools.csharp-1.23.11"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(".razor"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("rzls.exe\n      "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("6308")]),t._v(" vsls-agent c:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("program files "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x86"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("microsoft visual studio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2019")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("enterprise"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("common7"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("ide"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("extensions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("microsoft"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("liveshare"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Agent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("vsls-agent.exe\n      "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("8672")]),t._v(" vsls-agent c:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Users"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("12504")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(".vscode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("extensions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("ms-vsliveshare.vsliveshare-1.0.4272"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("dotnet_modules"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("vsls-agent.exe\n     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("19704")]),t._v(" vsls-agent c:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("program files "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x86"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("microsoft visual studio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2019")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("enterprise"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("common7"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("ide"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("extensions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("microsoft"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("liveshare"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Agent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("vsls-agent.exe\n     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("23984")]),t._v(" vsls-agent c:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("program files "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x86"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("microsoft visual studio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2019")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("enterprise"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("common7"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("ide"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("extensions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("microsoft"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("liveshare"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Agent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("vsls-agent.exe\n")])])]),n("ul",[n("li",[t._v("使用 dotnet-counters 工具检查托管内存的使用情况："),n("code",[t._v("dotnet-counters monitor -refresh-interval 1 -p 39740")]),t._v("。 --refresh-interval 指定两次刷新之间的秒数。")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("Press p to pause, r to resume, q to quit.\n    Status: Running\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("System.Runtime"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    % Time "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" GC since last GC "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("%"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                 "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    Allocation Rate "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("B / "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" sec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("8,168")]),t._v("\n    CPU Usage "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("%"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                                  "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    Exception Count "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Count / "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" sec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    GC Heap Size "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("MB"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                              "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),t._v("\n    Gen "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" GC Count "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Count / "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" sec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                 "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    Gen "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" Size "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("B"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                           "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("488,160")]),t._v("\n    Gen "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" GC Count "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Count / "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" sec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                 "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    Gen "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" Size "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("B"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                            "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("56,936")]),t._v("\n    Gen "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" GC Count "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Count / "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" sec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                 "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    Gen "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" Size "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("B"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                           "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("705,752")]),t._v("\n    LOH Size "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("B"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                              "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("97,848")]),t._v("\n    Monitor Lock Contention Count "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Count / "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" sec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                  "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    Number of Active Timers                                        "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n    Number of Assemblies Loaded                                  "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("122")]),t._v("\n    ThreadPool Completed Work Item Count "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Count / "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" sec"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("           "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n    ThreadPool Queue Length                                        "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    ThreadPool Thread Count                                        "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n    Working Set "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("MB"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("                                              "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("42")]),t._v("\n")])])]),n("ul",[n("li",[n("code",[t._v("GC Heap Size (MB)")]),t._v("这一行就是托管堆内存，可以看到现在是 6MB，现在，点击 URL https://localhost:5001/api/diagscenario/memleak/20000。这个时候应该增加 30MB 左右的内存。")]),t._v(" "),n("li",[t._v("通过监视内存使用情况，可以确定内存正在增长或泄漏。 下一步是收集内存分析的适当数据。")])]),t._v(" "),n("h2",{attrs:{id:"生成内存转储"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#生成内存转储","aria-hidden":"true"}},[t._v("#")]),t._v(" 生成内存转储")]),t._v(" "),n("ul",[n("li",[t._v("使用以下命令以生成 Linux 核心转储："),n("code",[t._v("dotnet-dump collect -p 39740")])])]),t._v(" "),n("h2",{attrs:{id:"分析内存转储文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#分析内存转储文件","aria-hidden":"true"}},[t._v("#")]),t._v(" 分析内存转储文件")]),t._v(" "),n("ul",[n("li",[t._v("生成核心转储后，请使用 dotnet-dump 工具分析转储："),n("code",[t._v("dotnet-dump analyze dump_20210512_180812.dmp")])]),t._v(" "),n("li",[t._v("查看托管堆的整体状态："),n("code",[t._v("dumpheap -stat")])])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n00007ff93746b1f0    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10231")]),t._v("       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("245544")]),t._v(" System.Int32\n00007ff937c6da10     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3766")]),t._v("       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("331408")]),t._v(" System.Diagnostics.Tracing.IncrementingCounterPayload\n00007ff937522360      "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("928")]),t._v("       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("435024")]),t._v(" System.Byte"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n00007ff937c65f78     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("6456")]),t._v("       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("671424")]),t._v(" System.Diagnostics.Tracing.CounterPayload\n00000200fed45280    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("13460")]),t._v("      "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("8703536")]),t._v("      Free\n00007ff937ea7730        "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v("     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("16646336")]),t._v(" testwebapi.Controllers.Customer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n00007ff937aaea78   "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("800000")]),t._v("     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("19200000")]),t._v(" testwebapi.Controllers.Customer\n00007ff937521e18   "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("817403")]),t._v("     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("76160856")]),t._v(" System.String\nTotal "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1681577")]),t._v(" objects\nFragmented blocks larger than "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),t._v(" MB:\n            Addr     Size      Followed by\n000002013F04B080    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         000002013F0EBFE8 System.Action`4"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Microsoft.Extensions.Logging.ILogger, Microsoft.Extensions.Logging.Abstractions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(","),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("System.String, System.Private.CoreLib"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(","),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("System.String, System.Private.CoreLib"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(","),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("System.Exception, System.Private.CoreLib"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n00000201BF011130    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         00000201BF0B2058 System.Threading.Thread\n00000201FF054550    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         00000201FF0F45B8 System.String\n000002023F0114B0    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         000002023F0B1FE8 System.Object"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n00000202FF012858    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         00000202FF0B8960 System.Reflection.RuntimeMethodInfo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n000002037F011030    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".7MB         000002037F0BDFE8 System.String\n00000203BF011770    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".7MB         00000203BF0BBFE8 System.String\n000002043F013280    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".7MB         000002043F0BDFE8 System.String\n000002047F011030    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         000002047F0B2058 System.Threading.Thread\n00000204BF011078    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         00000204BF0B5FE8 System.String\n")])])]),n("ul",[n("li",[t._v("可以看到内存最大的几个对象是 String 或 Customer")]),t._v(" "),n("li",[t._v("使用 dumpheap 命令查看所有 String 实例的列表："),n("code",[t._v("dumpheap -mt 00007ff937521e18")])])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v("\n00000204bfb2bbe0 00007ff937521e18       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("94")]),t._v("\n00000204bfb2bc58 00007ff937521e18       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("94")]),t._v("\n00000204bfb2bcd0 00007ff937521e18       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("94")]),t._v("\n00000204bfb2bd48 00007ff937521e18       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("94")]),t._v("\n00000204bfb2bdc0 00007ff937521e18       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("94")]),t._v("\n00000204bfb2be38 00007ff937521e18       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("94")]),t._v("\n00000204bfb2beb0 00007ff937521e18       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("94")]),t._v("\n00000204bfb2bf28 00007ff937521e18       "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("94")]),t._v("\n\nStatistics:\n              MT    Count    TotalSize Class Name\n00007ff937521e18   "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("817403")]),t._v("     "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("76160856")]),t._v(" System.String\nTotal "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("817403")]),t._v(" objects\nFragmented blocks larger than "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),t._v(" MB:\n            Addr     Size      Followed by\n000002013F04B080    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         000002013F0EBFE8 System.Action`4"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Microsoft.Extensions.Logging.ILogger, Microsoft.Extensions.Logging.Abstractions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(","),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("System.String, System.Private.CoreLib"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(","),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("System.String, System.Private.CoreLib"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(","),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("System.Exception, System.Private.CoreLib"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n00000201BF011130    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         00000201BF0B2058 System.Threading.Thread\n00000201FF054550    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         00000201FF0F45B8 System.String\n000002023F0114B0    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         000002023F0B1FE8 System.Object"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n00000202FF012858    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         00000202FF0B8960 System.Reflection.RuntimeMethodInfo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n000002037F011030    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".7MB         000002037F0BDFE8 System.String\n00000203BF011770    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".7MB         00000203BF0BBFE8 System.String\n000002043F013280    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".7MB         000002043F0BDFE8 System.String\n000002047F011030    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         000002047F0B2058 System.Threading.Thread\n00000204BF011078    "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(".6MB         00000204BF0B5FE8 System.String\n")])])]),n("ul",[n("li",[t._v("使用 gcroot 命令查看对象的根方式和原因："),n("code",[t._v("gcroot -all 00000204bfb2bf28")])])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" gcroot -all 00000204bfb2bf28\nHandleTable:\n    00000200FECD15F8 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pinned handle"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    -"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 00000204FF011038 System.Object"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    -"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 000002027F097758 testwebapi.Controllers.Processor\n    -"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 000002027F097770 testwebapi.Controllers.CustomerCache\n    -"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 000002027F097788 System.Collections.Generic.List`1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("testwebapi.Controllers.Customer, DiagnosticScenarios"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    -"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 00000205AF011038 testwebapi.Controllers.Customer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    -"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 00000204BFB2BF88 testwebapi.Controllers.Customer\n    -"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 00000204BFB2BF28 System.String\n\nFound "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" roots.\n")])])]),n("ul",[n("li",[t._v("可以看到 String 由 Customer 对象直接保存，并由 CustomerCache 对象间接保存。")])])])},[],!1,null,null,null);s.default=e.exports}}]);