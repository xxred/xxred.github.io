(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{213:function(t,e,a){"use strict";a.r(e);a(54);var n=a(193),o=a.n(n),r={data:function(){return{}},methods:{git:function(){var t=this;o.a.get("https://api.github.com/repos/git-for-windows/git/releases/latest").then(function(e){var a=e.data,n=a.tag_name.replace("v","Git-").replace(".windows","")+"-64-bit.exe",o="https://npm.taobao.org/mirrors/git-for-windows/".concat(a.tag_name,"/").concat(n);console.log(o),t.download(o)})},download:function(t){document.location=t}},mounted:function(){}},i=a(0),s=Object(i.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"常用开发软件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用开发软件","aria-hidden":"true"}},[t._v("#")]),t._v(" 常用开发软件")]),t._v(" "),a("ul",[a("li",[t._v("收集日常开发可能碰到的开发软件")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("软件名称")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("最新版下载")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("更多版本（镜像）地址")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[a("a",{attrs:{href:"https://git-scm.com/"}},[t._v("git-for-windows")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("a",{attrs:{href:"javascript:;"},on:{click:t.git}},[t._v("点击下载")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("a",{attrs:{href:"https://npm.taobao.org/mirrors/git-for-windows/"}},[t._v("淘宝镜像")])])])])])])},[],!1,null,null,null);e.default=s.exports}}]);