(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{326:function(t,r,e){"use strict";e.r(r);var a=e(0),u=Object(a.a)({},function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"关于vue的各种错误或异常收集"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#关于vue的各种错误或异常收集","aria-hidden":"true"}},[t._v("#")]),t._v(" 关于vue的各种错误或异常收集")]),t._v(" "),e("h2",{attrs:{id:"循环引入模块"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#循环引入模块","aria-hidden":"true"}},[t._v("#")]),t._v(" 循环引入模块")]),t._v(" "),e("h3",{attrs:{id:"描述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#描述","aria-hidden":"true"}},[t._v("#")]),t._v(" 描述")]),t._v(" "),e("ul",[e("li",[t._v("问题发生在引入模块的时候，由于循环引入模块导致最先引入的模块返回空值。main.js入口引入router，router引入Layout.vue，关键在于Layout.vue又引入了router，从router中读取路由数据显示菜单。")])]),t._v(" "),e("h3",{attrs:{id:"分析"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分析","aria-hidden":"true"}},[t._v("#")]),t._v(" 分析")]),t._v(" "),e("ul",[e("li",[t._v("模块引入的时候，会先把该模块的依赖引入一次，缓存起来，其它地方第二次引入就直接返回。")]),t._v(" "),e("li",[t._v("main.js第一次引入router，在这之前会先引入router的依赖模块Layout.vue（此时还没引入router），而Layout.vue又依赖于router。所以需要先引入router，注意这个时候才是第一次引入router。这个时候就相当于进入死循环了，但是Webpack处理了这个问题。Layout.vue引入的router返回了空值，这样就完成了Layout.vue的引入，再完成router的引入，这个时候main.js里面引入的router就是正常的，而Layout.vue引入的router则是空值。因此，router明明有值菜单却不显示。")])]),t._v(" "),e("h3",{attrs:{id:"解决"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#解决","aria-hidden":"true"}},[t._v("#")]),t._v(" 解决")]),t._v(" "),e("ol",[e("li",[t._v("避免循环引入模块，不要在让Layout.vue直接或间接依赖router，因为router肯定依赖Layout.vue作为模板。")]),t._v(" "),e("li",[t._v("router中延迟加载Layout.vue，不马上引入Layout.vue，也可避免循环引入。")])]),t._v(" "),e("h3",{attrs:{id:"案例"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#案例","aria-hidden":"true"}},[t._v("#")]),t._v(" 案例")]),t._v(" "),e("ul",[e("li",[t._v("还原此次提交即可重现 https://github.com/xxred/Easy.Front-End/commit/bf6d5741e38225b28af1e6a464681466d6885cfe")]),t._v(" "),e("li",[t._v("解决方法在本次提交 https://github.com/xxred/Easy.Front-End/commit/f9c7fb37c08d08db3553f3562814ac97e52822a2")])])])},[],!1,null,null,null);r.default=u.exports}}]);