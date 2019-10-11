(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{310:function(t,s,n){"use strict";n.r(s);var a=n(0),e=Object(a.a)({},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"easy-admin-基于-asp-net-core-的通用权限管理系统"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#easy-admin-基于-asp-net-core-的通用权限管理系统","aria-hidden":"true"}},[t._v("#")]),t._v(" Easy.Admin - 基于 Asp.Net Core 的通用权限管理系统")]),t._v(" "),n("ul",[n("li",[t._v("经过间断的一年多接近两年的修修补补，从 Asp.Net Mvc 到 Asp.Net Core，到如今.Net Core 3.0 正式版发布，这个项目终于可以发一个版本了。虽然还有不少问题，但是总归应该没有大问题")]),t._v(" "),n("li",[t._v("这个项目一开始是我个人的学习项目，基于新生命 X 组件的 Api 项目，将 Asp.Net Core 的一些东西运用于实际，简化请求处理流程，后来就用到公司项目上了。作为基础的通用权限管理系统，基本每个公司应该都会有的，这个项目用起来也不错，所以也就这样不断默默完善，现在终于到了给她整理发个版的时候了")]),t._v(" "),n("li",[t._v("另一个目的就是给小伙伴们一个参考，都是很基础的东西，官网文档 https://docs.microsoft.com/zh-cn/aspnet/core/ 上都有。有归有，你不一定会看，看了也不一定懂，懂了也不一定会动手搞一下。所以这里提供给大家复制粘贴，作为一个参考，添加想要的功能到自己的项目")]),t._v(" "),n("li",[t._v("项目地址 https://github.com/xxred/Easy.Admin")]),t._v(" "),n("li",[t._v("下面介绍一下项目的一些功能，部分处理流程")])]),t._v(" "),n("h2",{attrs:{id:"功能概览"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#功能概览","aria-hidden":"true"}},[t._v("#")]),t._v(" 功能概览")]),t._v(" "),n("div",{staticClass:"language-csharp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-csharp"}},[n("code",[t._v("        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ConfigureServices")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IServiceCollection")]),t._v(" services"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加数据库连接")]),t._v("\n            services"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddConnectionStr")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加身份标识Identity")]),t._v("\n            services"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddIdentity")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ClaimsIdentity"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UserIdClaimType "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" JwtRegisteredClaimNames"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Sub"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ClaimsIdentity"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UserNameClaimType "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" JwtRegisteredClaimNames"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UniqueName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加身份验证")]),t._v("\n            services"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ConfigAuthentication")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            services"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddMvc")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ModelBinderProviders"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Insert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PagerModelBinderProvider")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ModelBinderProviders"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Insert")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EntityModelBinderProvider")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("SetCompatibilityVersion")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("CompatibilityVersion"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Version_2_2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ConfigJsonOptions")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 文档")]),t._v("\n            services"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ConfigSwaggerGen")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 跨域")]),t._v("\n            services"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddCors")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 扫描控制器添加菜单")]),t._v("\n            services"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ScanController")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ol",[n("li",[n("p",[t._v("第一个是添加字符串链接，设置数据库连接字符串，格式其实自己定就可以了，只要把对应字符串设置上就行了，不用管格式到底是什么，怎么高兴怎么设置")]),t._v(" "),n("div",{staticClass:"language-json extra-class"},[n("pre",{pre:!0,attrs:{class:"language-json"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v('"connectionStrings"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v('"IdentityServer"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v('"connectionString"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Server=127.0.0.1;Port=3306;Database=IdentityServer;Uid=root;Pwd=123456;"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v('"providerName"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MySql.Data.MySqlClient"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Membership"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v('"connectionString"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Server=127.0.0.1;Port=3306;Database=IdentityServer;Uid=root;Pwd=123456;"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token property"}},[t._v('"providerName"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MySql.Data.MySqlClient"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[t._v("对应微软的 Identity 库，只不过用户类型修改为 x 组件的，登录注销等相关功能使用 UserManager，所以可以自由切换实体，使用任意 orm，其关键在于 IUserStore 和 IRoleStore 两个接口，在 IUserStore 的实现中处理系统与数据库交互")])]),t._v(" "),n("li",[n("p",[t._v("给 MVC 添加了两个模型绑定器，一个用于处理分页，一个是处理实体。从请求中读取值并设置到相应模型，实体模型绑定器的工作是根据主键从数据库查询数据，然后赋值前端传过来的值。后面是 json 序列化配置，主要是命名规则设置、日期格式、序列化深度等")])]),t._v(" "),n("li",[n("p",[t._v("添加 swagger 文档设置，根据配置显示文档标题、遍历项目目录添加项目注释文件、最后就是配合 OAuth2.0 登录了，避免每次登陆的繁琐")])]),t._v(" "),n("li",[n("p",[t._v("跨域设置，可是设置 Policy，然后添加到控制器，这里为了测试方便，直接不写，在管道处设置全部放行")]),t._v(" "),n("div",{staticClass:"language-csharp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-csharp"}},[n("code",[t._v("app"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("UseCors")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AllowAnyHeader")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AllowAnyMethod")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AllowAnyOrigin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("AllowCredentials")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[t._v("扫描控制器，生成菜单，将控制器上的权限操作码与菜单绑定，再设置到角色上，实现权限控制")])]),t._v(" "),n("li",[n("p",[t._v("统一响应结果，ApiResultFilterAttribute 加在控制器基类，将所有响应结果包装成统一的格式")])]),t._v(" "),n("li",[n("p",[t._v("异常拦截，请求过程中所有异常通过中间件 ApiExceptionMiddleware 拦截，返回统一的结果，以供前端展示友好结果")])]),t._v(" "),n("li",[n("p",[t._v("集成第三方登录协议，内置了 QQ、Github 登录，微信的由于申请不到就没做。默认支持 OpenID Connect")])])]),t._v(" "),n("h2",{attrs:{id:"展望"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#展望","aria-hidden":"true"}},[t._v("#")]),t._v(" 展望")]),t._v(" "),n("ul",[n("li",[t._v("基本上，基础的就是这些了，未来可能增加日志审计、流式日志展示、应用重启、系统信息获取、配置在线修改等等可能比较有用的功能")]),t._v(" "),n("li",[t._v("还有一些比较硬核的功能，比如千万级别数据流式导出到 csv 文件，在线数据迁移等等可能分出项目来做，先成型再完善")])]),t._v(" "),n("h2",{attrs:{id:"最后"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#最后","aria-hidden":"true"}},[t._v("#")]),t._v(" 最后")]),t._v(" "),n("ul",[n("li",[t._v("Asp.Net Core3.0 已经发布了，Swagger5.x，IdentityServer3.x 都与之对应，都要升级，但是现在先不升级，把现有的整理好，算是对过去的努力的交代")])])])},[],!1,null,null,null);s.default=e.exports}}]);