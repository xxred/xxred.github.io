(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{217:function(t,a,r){"use strict";r.r(a);var e=r(0),s=Object(e.a)({},function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"静态构造函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#静态构造函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 静态构造函数")]),t._v(" "),r("h2",{attrs:{id:"定义"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#定义","aria-hidden":"true"}},[t._v("#")]),t._v(" 定义")]),t._v(" "),r("h2",{attrs:{id:"调用时机"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#调用时机","aria-hidden":"true"}},[t._v("#")]),t._v(" 调用时机")]),t._v(" "),r("h2",{attrs:{id:"子类继承后的关系"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#子类继承后的关系","aria-hidden":"true"}},[t._v("#")]),t._v(" 子类继承后的关系")]),t._v(" "),r("ul",[r("li",[t._v("静态构造函数只执行一次，由框架自己调用")]),t._v(" "),r("li",[t._v("构造函数调用前会先调用静态构造函数，然后调用父类构造函数，父类构造函数调用又会触发父类静态构造函数")]),t._v(" "),r("li",[t._v("如果子类静态构造函数中实例化new一个自己，会触发父类的静态构造函数，因为子类构造函数调用前会调用父类构造函数，进而触发父类静态构造函数")]),t._v(" "),r("li",[t._v("访问本类所属静态成员时，会且只会触发本类的静态构造函数，即使父类有静态构造函数也不会触发，不像构造函数一样会触发父类构造函数，说明访问静态成员比较懒并不会，能少干点就不会多干活")]),t._v(" "),r("li",[t._v("外部代码通过子类访问父类的静态成员，反编译可以看到实际上编译成是父类的静态成员，所以实际上是访问父类的静态成员，只是我们写的时候不用多加父类，所以只会触发父类的静态构造函数")])])])},[],!1,null,null,null);a.default=s.exports}}]);