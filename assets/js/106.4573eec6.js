(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{246:function(t,a,e){"use strict";e.r(a);var r=e(0),o=Object(r.a)({},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"window-下的各种自动化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#window-下的各种自动化","aria-hidden":"true"}},[t._v("#")]),t._v(" window 下的各种自动化")]),t._v(" "),e("p",[t._v("[TOC]")]),t._v(" "),e("h2",{attrs:{id:"软件包管理器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#软件包管理器","aria-hidden":"true"}},[t._v("#")]),t._v(" 软件包管理器")]),t._v(" "),e("ul",[e("li",[t._v("如apt-get或yum，brew")])]),t._v(" "),e("h3",{attrs:{id:"chocolatey"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#chocolatey","aria-hidden":"true"}},[t._v("#")]),t._v(" Chocolatey")]),t._v(" "),e("h4",{attrs:{id:"介绍与安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#介绍与安装","aria-hidden":"true"}},[t._v("#")]),t._v(" 介绍与安装")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://chocolatey.org/about",target:"_blank",rel:"noopener noreferrer"}},[t._v("介绍"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://chocolatey.org/install",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装"),e("OutboundLink")],1)])]),t._v(" "),e("h4",{attrs:{id:"配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置","aria-hidden":"true"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("https://chocolatey.org/docs/chocolatey-configuration")])]),t._v(" "),e("li",[e("p",[t._v("如果未下载，可新建环境变量"),e("code",[t._v("ChocolateyInstall")]),t._v("为自定义的安装地址")])]),t._v(" "),e("li",[e("p",[t._v("如果已经下载安装，需要修改Chocolatey安装的位置")]),t._v(" "),e("ul",[e("li",[t._v("因为后续下载的一些包默认是在"),e("code",[t._v("C:\\ProgramData\\Chocolatey\\lib")]),t._v("，可以预见会越来越大，C盘由要开始清盘行动")]),t._v(" "),e("li",[t._v("简单粗暴把"),e("code",[t._v("C:\\ProgramData\\Chocolatey")]),t._v("剪切到其他盘，将系统环境变量"),e("code",[t._v("ChocolateyInstall")]),t._v("改成剪切后的地址")])])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://chocolatey.org/docs/commands-config",target:"_blank",rel:"noopener noreferrer"}},[t._v("配置"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[t._v("修改包下载地址，安装时修改见"),e("a",{attrs:{href:"https://github.com/chocolatey/choco/wiki/Installation#install-with-powershellexe",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[t._v("设置缓存路径")])])]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("choco config "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" cacheLocation c:"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("temp"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("choco\n")])])]),e("h4",{attrs:{id:"安装软件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装软件","aria-hidden":"true"}},[t._v("#")]),t._v(" 安装软件")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://chocolatey.org/docs/commands-install",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装"),e("OutboundLink")],1)])]),t._v(" "),e("h4",{attrs:{id:"相关文章"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#相关文章","aria-hidden":"true"}},[t._v("#")]),t._v(" 相关文章")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://blog.csdn.net/msmile_my/article/details/78665762",target:"_blank",rel:"noopener noreferrer"}},[t._v("windows下的brew---\x3eChocolatey"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.jianshu.com/p/f5f4efd04cab",target:"_blank",rel:"noopener noreferrer"}},[t._v("chocolatey 定制路径"),e("OutboundLink")],1)])]),t._v(" "),e("h2",{attrs:{id:"自动安装软件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#自动安装软件","aria-hidden":"true"}},[t._v("#")]),t._v(" 自动安装软件")]),t._v(" "),e("ul",[e("li",[t._v("重装系统最烦的是要装很多软件，又要重新找一遍下载地址，而且不记得需要安装什么软件，等到使用再去安装下载就太迟了")]),t._v(" "),e("li",[t._v("可视化 ChocolateyGui、Boxstarter")]),t._v(" "),e("li",[t._v("https://boxstarter.org/WhyBoxstarter#")]),t._v(" "),e("li",[t._v("虽然典型的Chocolatey软件包包含静默安装应用程序而无需用户干预的代码，但Boxstarter软件包通常由多次调用Chocolatey的cinst命令组成，以安装环境所需的所有应用程序。但是，它可能还包含将这些应用程序连接在一起并自定义环境所需的相当多的自定义代码。例如，Boxstarter包可能：\n"),e("ul",[e("li",[t._v("为单个IIS Web应用程序创建IIS站点，端口绑定和证书设置。")]),t._v(" "),e("li",[t._v("为需要侦听特定端口的应用程序配置防火墙规则。")]),t._v(" "),e("li",[t._v("调整各种窗口设置，使机器符合用户的口味。")]),t._v(" "),e("li",[t._v("安装重要的Windows更新。")]),t._v(" "),e("li",[t._v("处理配置文件，切换WMI设置以及启动（或停止）环境运行所需的服务。")])])])]),t._v(" "),e("h3",{attrs:{id:"自定义安装包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#自定义安装包","aria-hidden":"true"}},[t._v("#")]),t._v(" 自定义安装包")]),t._v(" "),e("ul",[e("li",[t._v("https://chocolatey.org/docs/how-to-create-custom-package-templates")])]),t._v(" "),e("h2",{attrs:{id:"收集的文章"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#收集的文章","aria-hidden":"true"}},[t._v("#")]),t._v(" 收集的文章")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"http://www.yangqiu.cn/shiyanlou-com/2022367.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("如何在Windows下像Mac一样优雅开发"),e("OutboundLink")],1)])])])},[],!1,null,null,null);a.default=o.exports}}]);