(window.webpackJsonp=window.webpackJsonp||[]).push([[154],{241:function(t,e,n){"use strict";n.r(e);var o=n(0),d=Object(o.a)({},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"树莓派安装-dotnet-环境"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#树莓派安装-dotnet-环境","aria-hidden":"true"}},[t._v("#")]),t._v(" 树莓派安装 dotnet 环境")]),t._v(" "),n("ul",[n("li",[t._v("确定系统位数："),n("code",[t._v("uname -m")]),t._v("执行该命令得到结果如果为"),n("code",[t._v("armv7l")]),t._v("则是 32 位，如果是"),n("code",[t._v("armv8")]),t._v("则是 64 位")]),t._v(" "),n("li",[t._v("文档地址https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#manual-install")]),t._v(" "),n("li",[t._v("安装完之后，修改 dotnet 的软连接。先删除旧版本的 dotnet"),n("code",[t._v("rm /usr/bin/dotnet")]),t._v("。创建新的软连接"),n("code",[t._v("sudo ln -s /home/pi/dotnet/dotnet /usr/bin/dotnet")]),t._v("，第一个地址替换为 dotnet 实际安装地址。\n检查版本信息"),n("code",[t._v("dotnet --info")]),t._v("。")])])])},[],!1,null,null,null);e.default=d.exports}}]);