# aspnetcore 中使用 Newlife.IdentityServer4 管理 IdentityServer 数据

- 本文讲述如何实现，IdentityServer 数据的管理，包括添加删除等基础操作和相应 UI

## 后端

- 此处直列关键点，不做详细描述，此项目跟普通的数据库管理无异，所以只做简单记录
- 实例请查看[这里](https://github.com/xxred/NewLife.IdentityServer4/tree/c48d897e3e23a397bb6a5230d294cfc694dfa2a6/)

### 添加引用

- 新建 asp.net core 项目，[IdentityServer4.XCode](https://github.com/xxred/IdentityServer4.XCode)引用，代码入口添加服务，视自己情况而定，options 的参数需要与前端配合
- 添加[Easy.Admin](https://github.com/xxred/Easy.Admin)引用，`Easy.Admin`包含了具有增删查改的基类控制器。并且封装了统一的响应结果，真实结果包含在 Data 属性、异常拦截处理、模型绑定等，使用后只需要关注业务即可

```json
{
  "Status": 0,
  "Data": [
    {
      "ID": 68,
      "Name": "b5c4"
    }
  ],
  "Msg": "ok",
  "Paper": null
}
```

```csharp
            services.AddIdentityServer(options =>
                {
                    options.UserInteraction.LoginReturnUrlParameter = "returnUrl";//返回url的参数名

                    options.UserInteraction.LoginUrl = "/login";

                    options.Authentication.CookieAuthenticationScheme = "Jwt-Cookie";
                })
                .AddXCodeConfigurationStore()
                .AddXCodeOperationalStore(options =>
                {
                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    // options.TokenCleanupInterval = 15; // interval in seconds. 15 seconds useful for debugging
                })
                .AddDeveloperSigningCredential();
```

### 添加控制器

- 由于引用了[Easy.Admin](https://github.com/xxred/Easy.Admin)，我们要做的事就很简单了
- 新建控制器`ClientsController`，继承自`EntityController<Clients>`，添加相关特性

```csharp
    [DisplayName("客户端")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : EntityController<Clients>
    {
    }
```

- 基类`EntityController<>`实现了基础的增改查删操作，并自带一个搜索方法 Search，前端可根据搜索实体自定义搜索，还可跨表搜索
- 运行后导航到`/swagger`即可看到新增的接口
- 添加其他几个控制器，参考[这里](https://github.com/xxred/NewLife.IdentityServer4/tree/c48d897e3e23a397bb6a5230d294cfc694dfa2a6/NewLife.IdentityServer4/Controllers)

### 说明

- 此后端可作为内部管理使用，为所有实体添加对应的控制器，即可生成响应的增改查删接口，日常管理数据和和开发使用特别方便
- 如果想基于此项目开发其它业务，直接增加接口，做好权限控制即可，目前版本不包含权限管理

## 前端

- 前端项目基于[xxred/Easy.Front-End](https://github.com/xxred/Easy.Front-End)，他改造自[PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/)。产生于 vue-element-admin 还没升级到 vue-cli3 的时候，删了不少功能，架子大体相同，现在新版全部升级，v4.0 也发布了，Easy.Front-End 就不必再看了
- Easy.Front-End 主要考虑为基础框架，导入包引用即可使用，后续更新只需更新包的版本，而不必手动复制粘贴源码
- 重大修改的地方，只是为了搭建 IdentityServer 的前端部分，主要包括 api 地址重新设置、后端获取路由动态生成菜单、根据基础表格表单页动态生成页面

### api 地址重新设置

- 这个功能其实意义不大，覆盖原系统的硬编码 api 地址，现在一般都是从头到尾自己搭建前端项目，复制框架源码的，很少是导入包直接用。当时为了两边调试方便所以做了，先说说怎么用
- Easy.Front-End 项目 src 文件夹下有个`apiSettings.js`文件，新建项目同样的位置也需要一个这样的文件，手动导入，更新接口，内容如下

```javascript
const login = {
  loginByUsername: '/api/users/login',
  logout: '/api/users/logout',
  getUserInfo: '/api/users/getuserinfo'
}

const route = {
  getRoutes: '/api/routes'
}

export default settings => {
  settings.baseUrl = 'https://localhost:44352'
  settings.login = login
  settings.route = route
  return settings
}
```

- 只需要重新定义对象进行覆盖即可。导出的是一个函数，因此可以调试到此文件，可查看到所有接口，根据自己的需要进行覆盖

### 后端获取路由动态生成菜单

- 此功能需要后端配合，返回类似路由的格式，再由前端进行处理组件部分
- 后端返回数据结构如下

```json
[
  {
    "path": "/ApiResources",
    "component": "views/layout/Layout",
    "children": [
      {
        "path": "index",
        "template": "<table-base table-name=\"ApiResources\" />",
        //"component": "views/components/test", component为空，取template
        "name": "ApiResources",
        "meta": { "title": "Api资源", "icon": "international" }
      }
    ]
  }
]
```

- 前端接收到数据，将组件有字符路径换成方法，或者指定模板，要点如下。具体参见[这里](https://github.com/xxred/Easy.Front-End/tree/a8e42f1f873598ebd05711bcc31dcc67f0618b4e/src/store/modules/permission.js)
- 要使用模板功能，`vue.config.js`配置文件必须设置`runtimeCompiler`为 true

```javascript
if (router.component) {
  const component = router.component
  router.component = resolve => {
    // 动态加载组件会编译加载项目所有组件
    // 这里不能全写变量，写开头确定起始地址，写结尾确定文件名
    // 这样就相当于编译'@/**/*.vue'，编译之后模块列表才会有所有的模块，传模块路径匹配才会命中
    require(['@/' + component + '.vue'], resolve)
  }
} else if (router.template) {
  router.component = resolve => {
    resolve({
      template: router.template
    })
  }
}
```

### 根据基础表格表单页动态生成页面

- 这个功能需要后端返回每个表的信息，字段名和展示名、数据类型等，这个数据格式自己定，简单随意就好
- 页面代码如下

```html
<el-table v-loading="listLoading" :data="dataList">
  <el-table-column
    v-for="(column, idx) in columns"
    :key="idx"
    :label="column.displayName"
    :prop="column.name"
  />

  <el-table-column
    label="操作"
    align="center"
    width="230"
    fixed="right"
    class-name="small-padding fixed-width"
  >
    <template slot-scope="scope">
      <el-button type="primary" size="mini" @click="handleUpdate(scope.row)"
        >编辑</el-button
      >
      <el-button
        v-if="scope.row.status != 'deleted'"
        size="mini"
        type="danger"
        @click="handleDelete(scope.row)"
        >删除</el-button
      >
    </template>
  </el-table-column>
</el-table>

<!--以下是表单页-->
<el-form
  ref="dataForm"
  :model="temp"
  label-position="left"
  label-width="120px"
  style="width: 400px; margin-left:50px;"
>
  <el-form-item
    v-for="(column, idx) in columns"
    :key="idx"
    :label="column.displayName"
    :prop="column.name"
  >
    <el-switch
      v-if="column.typeStr=='Boolean'"
      v-model="temp[column.name]"
      style="display: block"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="是"
      inactive-text="否"
    />

    <el-date-picker
      v-else-if="column.typeStr=='DateTime'"
      v-model="temp[column.name]"
      type="datetime"
      format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间"
    />

    <el-input
      v-else
      v-model="temp[column.name]"
      type="text"
      :placeholder="'请输入'+column.displayName"
    />
  </el-form-item>
</el-form>
```

- 使用的时候，后端返回的路由数据，不要设置`component`，而将`template`设置为`<table-base table-name=\"{name}\" />`，其中的 name 动态替换
- 注册全局组件[table-base](https://github.com/xxred/Easy.Front-End/blob/a8e42f1f873598ebd05711bcc31dcc67f0618b4e/src/views/common/tableBase.vue)

```javascript
// 注册全局table基础组件
Vue.component('table-base', () => import('@/components/tableBase.vue'))
```

## 最后

- [Newlife.IdentityServer4](https://github.com/xxred/NewLife.IdentityServer4)作为后端部分，引用 [Easy.Admin](https://github.com/xxred/Easy.Admin)，简化基础工作，一键生成 curd 接口，专注业务，提供所有表字段信息以供动态生成菜单和页面
- [Newlife.IdentityServer4.Vue](https://github.com/xxred/NewLife.IdentityServer4.Vue)作为前端部分，引用[Easy.FrontEnd](https://github.com/xxred/Easy.FrontEnd)，根据一些表和列信息，生成相应菜单和页面，几乎没有页面需要手写

## 总结

- Newlife.IdentityServer4 只是对 IdentityServer 数据简单管理，未来将会增加权限控制，前端优化页面，改善引导方便使用
- 开发中遇到的坑，大都是自己异想天开，新增的功能参考很少，但是自身弄清楚原理，导致一直不成功
- 磨刀不误砍柴工，基础夯实，才能走的更远！
