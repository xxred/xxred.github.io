(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{224:function(t,s,a){"use strict";a.r(s);var n=a(0),r=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"生成-runtimeconfig-json-文件-additionalprobingpaths-详解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成-runtimeconfig-json-文件-additionalprobingpaths-详解","aria-hidden":"true"}},[t._v("#")]),t._v(" 生成 runtimeconfig.json 文件 & additionalProbingPaths 详解")]),t._v(" "),a("ul",[a("li",[t._v("本文将告诉你在.net core 项目中生成 runtimeconfig.json 文件，以及一些常用设置")]),t._v(" "),a("li",[t._v("其次是详细解释 additionalProbingPaths，为什么设置了这个参数不能做到共享 dll 目录，却还是报错说找不到 dll")])]),t._v(" "),a("h2",{attrs:{id:"运行时配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#运行时配置文件","aria-hidden":"true"}},[t._v("#")]),t._v(" 运行时配置文件")]),t._v(" "),a("ul",[a("li",[t._v("运行时配置文件存储应用程序的依赖关系（以前存储在.deps 文件中）。它们还包括运行时配置选项（runtimeconfig.json），例如垃圾收集器模式。（可选）它们还可以包括用于运行时编译的数据（编译设置用于编译原始应用程序，以及该应用程序使用的引用程序集）。")])]),t._v(" "),a("h3",{attrs:{id:"文件是怎么产生的？它们在哪里"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件是怎么产生的？它们在哪里","aria-hidden":"true"}},[t._v("#")]),t._v(" 文件是怎么产生的？它们在哪里")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("创建一个名为"),a("code",[t._v("MyApp")]),t._v("的控制台程序，编译过程过程将生成以下文件：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("MyApp.dll")]),t._v(" —— 托管程序 MyApp，包含 Main 入口函数。")]),t._v(" "),a("li",[a("code",[t._v("MyApp.exe")]),t._v(" —— apphost.exe 的可执行文件的副本。当应用程序是自包含的，并且希望支持特定平台（不可移植）的可执行文件的框架依赖应用程序版本在 2.1.0+，该文件才会存在（这句不会翻译，领会了大概意思）。")]),t._v(" "),a("li",[a("code",[t._v("MyApp.runtimeconfig.json")]),t._v(" —— 包含运行时配置设置的可选配置文件。该文件对于依赖框架的应用程序是必需的，但对于独立应用程序则不是必需的。")]),t._v(" "),a("li",[a("code",[t._v("MyApp.runtimeconfig.dev.json")]),t._v(" —— 包含运行时配置设置的可选配置文件。该配置文件通常仅存在于未发布的输出中，因此可用于开发时方案。该文件通常指定其他 dll 路径，比如 nuget 包缓存目录。根据每个设置的语义，该设置将与 MyApp.runtimeconfig.json 中的值组合或被 MyApp.runtimeconfig.json 中的值覆盖 。")]),t._v(" "),a("li",[a("code",[t._v("MyApp.deps.json")]),t._v(" —— 用于解决程序集冲突的依赖项，编译依赖项和版本信息的列表。在技术上不是必需的，但是需要使用服务或程序包缓存/共享的程序包安装功能，并在前滚方案中协助选择在应用程序和框架中存在多次的任何程序集的最新版本。如果该文件不存在，则使用当前文件夹中的所有程序集。")])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("MyApp.deps.json")]),t._v("旨在由自动化工具生成，不应由用户编辑，因此将"),a("code",[t._v("MyApp.runtimeconfig.json")]),t._v("分离出来，可修改运行时设置，其中一些设置与.NET 4.x 的 "),a("code",[t._v("MyApp.exe.config")]),t._v("一些配置对应。这就是这 runtimeconfig.json 和 deps.json 之间的关系。")])])]),t._v(" "),a("h3",{attrs:{id:"文件格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件格式","aria-hidden":"true"}},[t._v("#")]),t._v(" 文件格式")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("这些文件都是 JSON 格式，编码是 UTF-8。注意不是所有项都是必须的，部分项选择性列出（详见下文）。"),a("code",[t._v(".runtimeconfig.json")]),t._v("文件完全是可选的，而在"),a("code",[t._v(".deps.json")]),t._v("文件中，只有"),a("code",[t._v("runtimeTarget")]),t._v(","),a("code",[t._v("targets")]),t._v("，"),a("code",[t._v("libraries")]),t._v("是必须的。如果"),a("code",[t._v(".deps.json")]),t._v("文件不存在，那么所有的程序本地的所有程序集都将添加为 TPA（可信平台程序集）。")])]),t._v(" "),a("li",[a("p",[t._v("[appname].runtimeconfig.json")])])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtimeOptions"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"configProperties"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 配置属性的完整列表 https://github.com/dotnet/coreclr/blob/master/Documentation/project-docs/clr-configuration-knobs.md")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.GC.Server"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//指示是否应使用服务器GC。")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.GC.Concurrent"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//指示是否应使用后台垃圾回收。")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Threading.ThreadPool.MinThreads"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Threading.ThreadPool.MaxThreads"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"tfm"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"netcoreapp2.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 可选的字符串值，用于指定目标框架Moniker。")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"framework"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此部分的存在表明该应用程序是依赖于框架的应用程序。")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Microsoft.NETCore.App"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2.1.0"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"applyPatches"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果为false，则使用以前找到的最兼容的框架版本。当applyPatches未指定或为true时，将使用同一版本或更高版本的框架，该更高版本框架仅与指定框架的patch字段不同（Major.Minor.Patch）。")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"rollForwardOnNoCandidateFx"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 根据设置选择合适的框架版本 https://github.com/dotnet/core-setup/blob/master/Documentation/design-docs/roll-forward-on-no-candidate-fx.md")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"additionalProbingPaths "')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lib"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 指定在查找依赖项时要考虑的其他路径的可选属性。值可以是单个字符串，也可以是字符串数组。")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("[appname].deps.json")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtimeTarget"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('".NETCoreApp,Version=v2.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"signature"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"aafc507050a6c13a0cf2d6d4c3de136e6571da6e"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"compilationOptions"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"defines"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"TRACE"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"DEBUG"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"languageVersion"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"platform"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"warningsAsErrors"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"targets"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('".NETCoreApp,Version=v2.1"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果是自包含形式，上面将会是`.NETCoreApp,Version=v2.1/win-x64`")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyApp/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"dependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Banana"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.0.0"')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyApp.dll"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"compile"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyApp.dll"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Banana/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"dependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Foo"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.0.0"')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"lib/netcoreapp2.1/System.Banana.dll"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 该地址lib开头，代表的是包内地址，与libraries中每个包的path属性组合得到package内文件路径")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"assemblyVersion"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.0.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fileVersion"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.0.0.0"')]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"compile"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ref/netcoreapp2.1/System.Banana.dll"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Foo/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"lib/netcoreapp2.1/System.Foo.dll"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"assemblyVersion"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.0.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fileVersion"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.0.0.0"')]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"compile"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ref/netcodeapp2.1/System.Foo.dll"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"libraries"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyApp/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"project"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"serviceable"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sha512"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Banana/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"package"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// package代表是包引用，project代表是项目引用")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"serviceable"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sha512"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sha512-C63ok7q+Fi6O6I/WB4ut3hFibGSraUlE461LxhhwNk5Vcdl4ijDhX1QDupDdp3Cxr7TgwB55Sd4zNtlwT7ksAA=="')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"path"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"system.banana/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此路径由包名和版本组成，与runtime下的dll路径组合成package内dll文件路径")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hashPath"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"system.banana.1.0.0.nupkg.sha512"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Foo/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"package"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"serviceable"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sha512"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sha512-avYGOiBQ4U/fJfzEDF7lzPLhk/w6P9/28y0iiQh3AxlWOheuZTgXA/pzuORuAu/s5B2bXHO2BlvQKZN0PfQ2HQ=="')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"path"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"system.foo/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hashPath"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"system.foo.1.0.0.nupkg.sha512"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"文件详解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件详解","aria-hidden":"true"}},[t._v("#")]),t._v(" 文件详解")]),t._v(" "),a("ul",[a("li",[t._v("文件详细解释见"),a("a",{attrs:{href:"https://github.com/dotnet/cli/blob/master/Documentation/specs/runtime-configuration-file.md#sections",target:"_blank",rel:"noopener noreferrer"}},[t._v("runtime-configuration-file"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("使用包"),a("code",[t._v("Microsoft.Extensions.DependencyModel")]),t._v("可以查询正在运行的托管应用程序有关其依赖项的各种数据，默认实例"),a("code",[t._v("Microsoft.Extensions.DependencyModel.DependencyContext.Default")]),t._v("。")]),t._v(" "),a("li",[t._v("相关文章："),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/core/run-time-config/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档-.NET Core 运行时配置设置"),a("OutboundLink")],1),t._v("，"),a("a",{attrs:{href:"https://www.cnblogs.com/lwqlun/p/9704702.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入理解.NET Core 的基元: deps.json, runtimeconfig.json, dll 文件"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"additionalprobingpaths-不生效的问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#additionalprobingpaths-不生效的问题","aria-hidden":"true"}},[t._v("#")]),t._v(" additionalProbingPaths 不生效的问题")]),t._v(" "),a("ul",[a("li",[t._v("不是不生效，是达不到预期效果，很多人使用这个配置只是为了共享 dll，将一些框架的 dll 集中放到一个文件夹。")]),t._v(" "),a("li",[t._v("很多人以为"),a("code",[t._v("additionalProbingPaths")]),t._v("等同于.Net 框架 MyApp.exe.config 配置的[runtime.assemblyBinding.probing]（配置如下）。其实不然，runtimeconfig.json 文件的 additionalProbingPaths 设置的目录相当于只是 package 目录，文件结构和 nuget 缓存目录一致。可查看"),a("code",[t._v("MyApp.runtimeconfig.dev.json")]),t._v("，里面有几个设置，可查看对应文件夹的文件结构。")])]),t._v(" "),a("div",{staticClass:"language-xml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("configuration")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("runtime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("assemblyBinding")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("xmlns")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("urn:schemas-microsoft-com:asm.v1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("probing")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("privatePath")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("lib"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("assemblyBinding")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("runtime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("configuration")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h3",{attrs:{id:"共享-dll，设置搜索路径"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#共享-dll，设置搜索路径","aria-hidden":"true"}},[t._v("#")]),t._v(" 共享 dll，设置搜索路径")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("先做个关于"),a("code",[t._v("deps.json")]),t._v("文件的说明，")])]),t._v(" "),a("li",[a("p",[t._v("因此 additionalProbingPaths 配置设置的目录不是直接在此目录直接搜索的，而是要求 package 结构。**那么如何共享 dll 呢？**加入设置的搜索目录是"),a("code",[t._v("lib")]),t._v("，方法有下面几个：")]),t._v(" "),a("ul",[a("li",[t._v("1.既然是要求包结构，那么可以复制 nuget 包缓存目录里面的文件，连同结构一起复制到 lib 文件夹，此法麻烦。")]),t._v(" "),a("li",[t._v("2.如果希望全部 dll 都放在 lib 目录，那么需要修改"),a("code",[t._v("deps.json")]),t._v("，"),a("code",[t._v("targets")]),t._v(" 节点下，每个包的 "),a("code",[t._v("runtime")]),t._v(" 就是 dll 的路径，加上"),a("code",[t._v("libraries")]),t._v("节点每个包的"),a("code",[t._v("path")]),t._v("，组合成了在 lib 中的目录。因此修改这两个参数即可。"),a("code",[t._v("runtime")]),t._v("中的 dll 路径直接设置为 dll，"),a("code",[t._v("path")]),t._v("设置为当前目录，不设置默认是包名+版本。修改后如下（部分省略）：")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"targets"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('".NETCoreApp,Version=v2.1"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Banana/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Banana.dll"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"libraries"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"System.Banana/1.0.0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"path"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"."')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),a("li",[a("p",[t._v("注意，对于自包含应用，所有的 dll 都是在应用目录，"),a("code",[t._v("deps.json")]),t._v("中 runtime 记录的 dll 名称不含路径，path 属性也没有。而框架依赖应用，runtime 中的 dll 名称是包内路径，path 记录的是包名+版本。另外，"),a("code",[t._v("targets")]),t._v("节点下的"),a("code",[t._v("native")]),t._v("，目前经我测试，框架的运行时（比如 nuget 包 Microsoft.NETCore.App.Runtime.win-x64）的"),a("code",[t._v("native")]),t._v("要放在应用目录，其他第三方包的"),a("code",[t._v("native")]),t._v("未测试，但文档说会搜索"),a("code",[t._v("APPROOT/runtimes/win-x64/native/sni.dll")]),t._v("类似的目录。")])])]),t._v(" "),a("h2",{attrs:{id:"runtimeconfig-json-文件创建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#runtimeconfig-json-文件创建","aria-hidden":"true"}},[t._v("#")]),t._v(" runtimeconfig.json 文件创建")]),t._v(" "),a("ul",[a("li",[t._v("一下是我一番探索的结果，得到了该文件的创建方法，当时是在找不到文档。")]),t._v(" "),a("li",[t._v("先分析"),a("code",[t._v("MyApp.runtimeconfig.json")]),t._v("是编译后生成的，所以在"),a("a",{attrs:{href:"https://github.com/dotnet/sdk/blob/7209eb0e66bfba58714af68ddef81115552a4a0c/src/Tasks/Microsoft.NET.Build.Tasks/targets/Microsoft.NET.Sdk.targets#L194",target:"_blank",rel:"noopener noreferrer"}},[t._v("Microsoft.NET.Build.Tasks"),a("OutboundLink")],1),t._v("，找到任务"),a("code",[t._v("GenerateBuildRuntimeConfigurationFiles")]),t._v("。")]),t._v(" "),a("li",[t._v("再根据名称找到源码"),a("a",{attrs:{href:"https://github.com/dotnet/sdk/blob/49a6842940a884f2a06860fa9173c2f11963618d/src/Tasks/Microsoft.NET.Build.Tasks/GenerateRuntimeConfigurationFiles.cs",target:"_blank",rel:"noopener noreferrer"}},[t._v("GenerateRuntimeConfigurationFiles.cs"),a("OutboundLink")],1),t._v("。看其中属性，"),a("code",[t._v("RuntimeConfigPath")]),t._v("相关代码是写入，而"),a("code",[t._v("UserRuntimeConfig")]),t._v("是读取。接着在"),a("code",[t._v("Microsoft.NET.Sdk.targets")]),t._v("中找到"),a("a",{attrs:{href:"https://github.com/dotnet/sdk/blob/7209eb0e66bfba58714af68ddef81115552a4a0c/src/Tasks/Microsoft.NET.Build.Tasks/targets/Microsoft.NET.Sdk.targets#L41",target:"_blank",rel:"noopener noreferrer"}},[t._v("UserRuntimeConfig"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("li",[t._v("最后确定，项目中默认自定义文件名"),a("code",[t._v("runtimeconfig.template.json")]),t._v("，")]),t._v(" "),a("li",[t._v("下面是例子，注意不要多加"),a("code",[t._v("runtimeOptions")]),t._v("。框架会自动读取并合并：")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"additionalProbingPaths"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lib"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("在"),a("a",{attrs:{href:"https://www.cnblogs.com/wxmayifei/p/11394038.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("关于 .Net Core runtimeconfig 文件说明"),a("OutboundLink")],1),t._v("中得知，在"),a("code",[t._v(".csproj")]),t._v("项目文件也可设置"),a("code",[t._v("additionalProbingPaths")]),t._v("，但最后是出现在"),a("code",[t._v(".runtimeconfig.dev.json")]),t._v("文件，仅在开发环境中生效，例子如下：")])]),t._v(" "),a("div",{staticClass:"language-xml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("ItemGroup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("AdditionalProbingPath")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("Include")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("lib1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("AdditionalProbingPath")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("Include")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("lib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("ItemGroup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("ul",[a("li",[t._v("既然是默认名称那么就可以修改。自定义的运行时配置文件名，在项目文件中加入"),a("code",[t._v("UserRuntimeConfig")]),t._v("，填写自定义名称即可。")])]),t._v(" "),a("div",{staticClass:"language-xml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("PropertyGroup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("UserRuntimeConfig")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("runtimeconfig.template.json"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("UserRuntimeConfig")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("PropertyGroup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("ul",[a("li",[t._v("本地相关 tasks "),a("code",[t._v("C:\\Program Files\\dotnet\\sdk\\2.1.602\\Sdks\\Microsoft.NET.Sdk\\targets")])]),t._v(" "),a("li",[t._v("其他配置："),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/core/run-time-config/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档-.NET Core 运行时配置设置"),a("OutboundLink")],1)])])])},[],!1,null,null,null);s.default=r.exports}}]);