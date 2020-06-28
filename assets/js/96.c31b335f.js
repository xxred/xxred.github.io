(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{244:function(t,s,e){"use strict";e.r(s);var a=e(0),r=Object(a.a)({},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"前端调试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前端调试","aria-hidden":"true"}},[t._v("#")]),t._v(" 前端调试")]),t._v(" "),e("h2",{attrs:{id:"前言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前言","aria-hidden":"true"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),e("ul",[e("li",[t._v("当我第一次知道这种东西，我也惊呆了，居然还有这种操作，实在强大到没朋友，从此爱上调试，按时下班")]),t._v(" "),e("li",[t._v("无数次通过调试解决问题的经验告诉我，调试绝对是开发者最应该掌握的重要技能之一。调试能帮助我们定位问题解决问题，每解决一个问题，经验值就往上涨。后面就可以考经验解决很多问题，并且能正确避开当年踩过的雷区，减少再犯次数，节省解决问题的时间，大大提高开发效率和编码水平。我想这应该是掌握调试技能的一个很重要意义，而不仅仅是为了解决问题")]),t._v(" "),e("li",[t._v("你是否遇到过以下情况：\n"),e("ol",[e("li",[t._v("按钮的点击事件不起作用，点击按钮没反应。下载人家的demo运行，点击登录之后不出错页面也不跳转")]),t._v(" "),e("li",[t._v("请求数据后填充到页面，但是页面却不显示数据")]),t._v(" "),e("li",[t._v("某个请求总是被取消")]),t._v(" "),e("li",[t._v("明明按照人家教程来写，代码一模一样，却得不到和教程一样的效果")]),t._v(" "),e("li",[t._v("无意中写错字母，大小写部分，运行出错，但是看代码怎么都看不出问题")]),t._v(" "),e("li",[t._v("按照文档的写法，控制台老是报错，且错误发生在使用的组件里面，不是自己写的代码")]),t._v(" "),e("li",[t._v("等等，还有很多类型的问题")])])]),t._v(" "),e("li",[t._v("以上问题基本都可以通过调试解决，只需要掌握相关的调试技巧就可以")])]),t._v(" "),e("h2",{attrs:{id:"断点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#断点","aria-hidden":"true"}},[t._v("#")]),t._v(" 断点")]),t._v(" "),e("ul",[e("li",[t._v("调试的第一步就是打断点。断点的目的是，代码运行时在你想要开始调试的地方停下来。这个时候就可以查看当前上下文信息，比如全局变量、局部变量的值，函数的输入是否正确，请求的返回值是否正常等。通过此操作判断问题发生的地方，好对症下药")]),t._v(" "),e("li",[t._v("以"),e("a",{attrs:{href:"https://www.google.cn/chrome/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("谷歌浏览器"),e("OutboundLink")],1),t._v("（版本为69）为例，编辑器为"),e("a",{attrs:{href:"https://code.visualstudio.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("VSCode"),e("OutboundLink")],1),t._v("（版本1.26.1）")])]),t._v(" "),e("h3",{attrs:{id:"断点方式一"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#断点方式一","aria-hidden":"true"}},[t._v("#")]),t._v(" 断点方式一")]),t._v(" "),e("ul",[e("li",[t._v("这种方式是比较常用的方式，在浏览器开发工具找到对应源码，在script脚本节点里面的代码行断点")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908164523349-1511998750.png",alt:" "}})]),t._v(" "),e("ul",[e("li",[t._v("首先在浏览器页面按F12打开开发工具，点击"),e("code",[t._v("Sources")]),t._v("选项，默认显示的是"),e("code",[t._v("Page")]),t._v("标签。然后找到需要调试的源码文件")]),t._v(" "),e("li",[t._v("如果是正常html页面，那么源码一般是在对应域名下面。如果是"),e("code",[t._v("webpack")]),t._v("处理的页面，并且开启了源码映射，源码就是在"),e("code",[t._v("webpack://")]),t._v("下面。可通过快捷键"),e("code",[t._v("ctrl+ o")]),t._v("打开搜索框输入文件名搜索源码")]),t._v(" "),e("li",[t._v("只要找到源码，在脚本代码显示区域左边的数字上添加断点即可，之后只要代码运行到断点处，开发工具就会进入调试状态")]),t._v(" "),e("li",[e("strong",[t._v("注意")]),t._v("：有的数字行是灰色的，就是不可断点。有时候点击15行断点选中14行，这是因为浏览器真正执行的代码行不是你看到的那一行，可能是优化掉了或者经过某种转换。还有的情况是，添加某一行断点，会跳转到另一个页面并命中某一行,这个页面的背景色是黄色且文件名是"),e("code",[t._v("VM")]),t._v("开头。上述情况，大部分都是因为浏览器显示的源码版本，跟真正的源码文件不一致，只需要刷新一下页面，保证显示的源码是最新的即可")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908172829771-1566985050.png",alt:" "}})]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("技巧1")]),t._v("：有时候源码历经千辛万苦都找不到在哪，这时候就需要祭出"),e("code",[t._v("console.log")]),t._v("了。在需要调试的那一行代码前加上"),e("code",[t._v("console.log(666)")]),t._v(",然后运行一次，到控制台查看结果输出，点击右边的链接会自动跳转到源码，这样就可以直接断点了")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908171746677-1995428598.png",alt:" "}})]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("技巧2")]),t._v("：如下图，在"),e("code",[t._v("Filesystem")]),t._v("添加文件夹到工作路径，选择之后会有提示，点击接受。如果你的谷歌浏览器没有这玩意，请升级版本，还是没有的话，请忽略这段话。虽然不知道这是什么时候出的功能，但是我偶然发现的，它可以编辑之后真的保存到文件，这个可以当编辑器用了。")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908224342404-1314488285.png",alt:" "}})]),t._v(" "),e("h3",{attrs:{id:"断点方式二"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#断点方式二","aria-hidden":"true"}},[t._v("#")]),t._v(" 断点方式二")]),t._v(" "),e("ul",[e("li",[t._v("这种方式很粗暴，在需要调试的地方加"),e("code",[t._v("debugger")]),t._v("关键字，代码运行到的时候会自动停下，进入调试模式")]),t._v(" "),e("li",[t._v("此方法不需要手动断点，但是麻烦的是可能你调试一次就不用再调试了，但是每次运行到那里都会停下，必须移除这个代码才行")]),t._v(" "),e("li",[t._v("这玩意我在不少网站也见到有人用，不想让人家方便的查看到网站源码，一打开控制台就自动debugger")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908175702361-1255694529.png",alt:" "}})]),t._v(" "),e("h3",{attrs:{id:"断点方式三"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#断点方式三","aria-hidden":"true"}},[t._v("#")]),t._v(" 断点方式三")]),t._v(" "),e("ul",[e("li",[t._v("这种方式简单归为在编辑器中断点调试，是需要连接调试器（可以是远程调试器）或者附加进程，然后接收调试信息，就可以在编辑器源码进行断点调试")]),t._v(" "),e("li",[e("strong",[t._v("在Chrome和VS Code中调试Vue.js")]),t._v("："),e("a",{attrs:{href:"https://github.com/Microsoft/vscode-recipes/blob/master/vuejs-cli/README.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("此方法出处"),e("OutboundLink")],1),t._v("。这种方式使用"),e("code",[t._v("VSCode")]),t._v("的“Debugger for Chrome”扩展，"),e("strong",[t._v("推荐")]),t._v("。感觉就是上面的第一种方式，只不过将源码映射到本地源码，并在编辑器上显示。简单介绍下步骤：\n"),e("ol",[e("li",[t._v("webpack配置："),e("code",[t._v("webpack")]),t._v("配置添加"),e("code",[t._v("devtool：'source-map'")]),t._v("开启源码映射。")])])])]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Vue CLI 3.X")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  configureWebpack"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    devtool"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"source-map"')]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("调试配置：VSCode中按F5，将出现选择环境的输入框（如果已有"),e("code",[t._v("launch.json")]),t._v("不会出现），选择Chrome。在"),e("code",[t._v("launch.json")]),t._v("中的配置如下。其中"),e("code",[t._v("url")]),t._v("是打开浏览器之后访问的地址，"),e("code",[t._v("webRoot")]),t._v("是"),e("code",[t._v("app.js")]),t._v("、"),e("code",[t._v("main.js")]),t._v("等入口文件所在目录，后面两个是实验性功能（高级功能，鼠标悬停在上面会有说明）")])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.2.0"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"configurations"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"chrome"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"request"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"launch"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"启动 Chrome 并打开 localhost"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://localhost:8080"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"webRoot"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${workspaceFolder}/src"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"breakOnLoad"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sourceMapPathOverrides"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"webpack:///src/*"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${webRoot}/*"')]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[t._v("调试：在vue文件组件你想调试的行的断点，通过命令"),e("code",[t._v("npm start")]),t._v("、"),e("code",[t._v("npm dev")]),t._v("或者"),e("code",[t._v("npm serve")]),t._v("其中一个命令（具体是哪一个可以查看"),e("code",[t._v("package.json")]),t._v("的"),e("code",[t._v("scripts")]),t._v("节点）运行项目")]),t._v(" "),e("li",[t._v("按"),e("code",[t._v("F5")]),t._v("启动调试，一切正常的话将会命中你的断点")]),t._v(" "),e("li",[e("strong",[t._v("注意")]),t._v("：如果没有命中断点并且你的断点不是红点，需要一个骚操作才能在"),e("code",[t._v("VSCode")]),t._v("断点调试：在打开的谷歌浏览器的开发工具源码断点调试一次（或者加关键字"),e("code",[t._v("debugger")]),t._v("触发调试,参考上面方式一），运行到断点处"),e("code",[t._v("VSCode")]),t._v("会自跳出一个缓存的源码页来进行调试。另外，基于以上情况，如果在"),e("code",[t._v("VSCode")]),t._v("调试的显示的源码跟真的源码不同，那么就是源码映射不正确，上面的配置"),e("code",[t._v("webRoot")]),t._v("不正确。即使不正确，通过这个骚操作一样可以在"),e("code",[t._v("VSCode")]),t._v("调试，就是不太优雅，效果如下：")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180909010532460-655205794.png",alt:" "}}),t._v(" "),e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180909011059744-544155148.png",alt:" "}})]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("远程调试Chrome")]),t._v(" "),e("ul",[e("li",[t._v("附加浏览器的方式，不同于上一种，修改代码后要刷新页面才能重新断点调试")]),t._v(" "),e("li",[t._v("待更新")])])])]),t._v(" "),e("h3",{attrs:{id:"断点方式四"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#断点方式四","aria-hidden":"true"}},[t._v("#")]),t._v(" 断点方式四")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("这种方式归为调试nodejs,可以调试"),e("code",[t._v("webpack")]),t._v("配置，或者后端运行的node实例。")])]),t._v(" "),e("li",[e("p",[t._v("这种方式是在启动node的时候加上"),e("code",[t._v("--inspect")]),t._v("，开启V8 Inspector功能，通过"),e("code",[t._v("WebSockets")]),t._v("通信，调试器连接即可调试，更多调试器参考"),e("a",{attrs:{href:"https://nodejs.org/en/docs/guides/debugging-getting-started/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),e("OutboundLink")],1),t._v("。以下是几个示例：")]),t._v(" "),e("ul",[e("li",[t._v("调试"),e("code",[t._v("vue.config.js")]),t._v("，可以在调试查看配置，这样即使看不懂文档也可以按照自己的想法来写配置，甚至根本不用在看文档。使用方式是在"),e("code",[t._v("VSCode")]),t._v("配置如下，两种配置等效。调试"),e("code",[t._v("webpack.config.js")]),t._v("同理，将启动文件替换即可，可查看"),e("code",[t._v("package.json")]),t._v("的"),e("code",[t._v("scripts")]),t._v("节点对应命令确定启动文件")])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.2.0"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"configurations"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n       "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"node"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"request"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"launch"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Launch Program"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"args"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n               "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"serve"')]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"program"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${workspaceFolder}  /node_modules/@vue/cli-service/bin/v  ue-cli-service.  js"')]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//client-app/src/aspnet-dev.js"')]),t._v("\n       "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"node"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"request"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"launch"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Launch via NPM"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtimeExecutable"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"node"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"runtimeArgs"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n               "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"--inspect-brk=9229"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n               "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('".  /node_modules/@vue/cli-service/b  in/vue-cli-service.js"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./client-app/src/aspnet-dev.  js"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n               "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"serve"')]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"autoAttachChildProcesses"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n           "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"port"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("9229")]),t._v("\n       "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180910040023820-923469508.png",alt:" "}})]),t._v(" "),e("ul",[e("li",[t._v("调试aspnetcore的NodeServices其中一种"),e("a",{attrs:{href:"https://github.com/aspnet/JavaScriptServices/issues/1524#issuecomment-418785756",target:"_blank",rel:"noopener noreferrer"}},[t._v("打开方式"),e("OutboundLink")],1),t._v("，这个可以在"),e("code",[t._v("VSCode")]),t._v("进行调试，调试器由"),e("code",[t._v("VSCode")]),t._v("提供，不会自动连接，有点麻烦，建议用下一种，方便。")]),t._v(" "),e("li",[t._v("如果用谷歌浏览器的开发工具做调试器，可以尝试"),e("a",{attrs:{href:"https%EF%BC%9A//chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj"}},[t._v("插件nim")]),t._v("，启动node或自动打开标签页。或者谷歌浏览器自带的，在"),e("code",[t._v("Connection")]),t._v("处添加连接，检测到信号会自动连接，在Filesyatem添加需要调试的源码即可。如果浏览器连接了node环境的站点，并且启用了Inspector，那么开发工具会有一个图标可以快速打开node调试器")])])])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180910034021921-543136384.png",alt:" "}}),t._v(" "),e("img",{attrs:{src:"https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180910034753985-2108365859.png",alt:" "}})]),t._v(" "),e("h2",{attrs:{id:"其他参考（按推荐指数排列）"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他参考（按推荐指数排列）","aria-hidden":"true"}},[t._v("#")]),t._v(" 其他参考（按推荐指数排列）")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"http://seejs.me/2016/03/27/jsdebugger/",target:"_blank",rel:"noopener noreferrer"}},[t._v("一探前端开发中的JS调试技巧"),e("OutboundLink")],1),t._v("（推荐看一看，找了一圈才找到这个原创地址）")]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.zhihu.com/question/20260762",target:"_blank",rel:"noopener noreferrer"}},[t._v("有哪些 JS 调试技巧？"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/aspnet/JavaScriptServices/tree/master/src/Microsoft.AspNetCore.SpaServices#using-visual-studio-codes-debugger-for-chrome-extension",target:"_blank",rel:"noopener noreferrer"}},[t._v("使用Visual Studio Code的“Debugger for Chrome”扩展"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("vuejs官方文档：在 VS Code 和 Chrome 中调试"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js的V8 Inspector集成"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://nodejs.org/en/docs/guides/debugging-getting-started/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js调试指南"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://code.visualstudio.com/docs/editor/debugging#_launch-configurations",target:"_blank",rel:"noopener noreferrer"}},[t._v("在VSCode中调试"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://forum.vuejs.org/t/debugging-vue-files-with-visual-studio-code/8022",target:"_blank",rel:"noopener noreferrer"}},[t._v("vuejs论坛相关讨论"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/34003929",target:"_blank",rel:"noopener noreferrer"}},[t._v("调试程序时，设置断点的原理是什么？"),e("OutboundLink")],1)])])])},[],!1,null,null,null);s.default=r.exports}}]);