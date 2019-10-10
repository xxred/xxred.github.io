# vue 动态路由、动态加载组件、动态生成页面

- 相信很多做后端管理系统的同学，都会有这样的需求，那就是动态加载菜单，动态路由，甚至是动态生成页面。下面将一一介绍这些功能

## 动态路由

- 本文使用路由组件是[vue-router](https://router.vuejs.org/zh/)，更多信息请查看官网
- 动态路由即从后端请求路由信息，然后转化生成路由信息。所以这里的关键是不会提前知道什么菜单对应什么组件，因此路由声明的时候不再是写死的组件，而是可替换的动态路径。相关的功能就是[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)，以及[异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)
- 具体过程就是[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)的前置守卫中，根据是否登录来判断是否请求用户信息以及路由信息，再将请求的路由信息转化成路由，最后添加到路由表

```javascript
router.beforeEach((to, from, next) => {
  if (store.getters.roles.length === 0) {
    // 判断当前用户是否已拉取完user_info信息，得到用户信息后立即请求路由信息
    store
      .dispatch('GetUserInfo')
      .then(res => {
        // 拉取user_info
        const roles = res.data.Data.Roles // note: roles must be a array! such as: ['editor','develop']

        store
          .dispatch('GenerateRoutes', {
            roles
          })
          .then(() => {
            // 执行GenerateRoutes动作后，store.getters.addRouters得到的就是内置的路由以及请求的路由的集合
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({
              ...to,
              replace: true
            }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
      })
      .catch(err => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(err || 'Verification failed, please login again')
          next({
            path: '/'
          })
        })
      })
  } else {
    // 在这里省略了根据当前用户角色判断是否有权限访问即将跳转的路由

    next()
  }
})
```

- 以上是导航守卫中的设置，下面介绍请求路由信息并转化成路由，详细代码不展示，只贴出转化部分，使用递归方法转化成多级菜单

```javascript
function formatRoutes(routes) {
  const fmRoutes = []
  routes.forEach(router => {
      const component = router.component
      router.component = resolve => {
        require(['@/' + component + '.vue'], resolve)
      }
    } else if (router.template) {
      router.component = resolve => {
        resolve({
          template: router.template
        })
      }

    let children = router.children
    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }

    router.children = children

    fmRoutes.push(router)
  })

  return fmRoutes
}
```

## 动态加载组件

- 路由的组件直接赋值 template 就不讲了，直接写代码就成，提前注册好组件即可
- 以下写法相信很多地方都可以查到，但是要点很多地方都没注明
- 路由的组件赋值一个方法，内部 require 加载组件。这个官方文档[异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)有写。但注意以下**要点**：
  - 路径的开头要正确，能访问，可以是别名也可以是相对地址
  - 后面部分则是限制模块的类型，即文件名
- 所以以下写法，就是编译`@`别名对应地址下所有`vue`文件，中间的变量补齐地址即可
- 分析一下，千万不要全部都写变量，比如`require([component], resolve)`，这样 webpack 不知道你的组件会是什么也不知道位置，所以不会编译也不会匹配该组件。注意到没，一个是编译一个是匹配。像上面的写法，组件不会被编译，更别提匹配了。即使假设某组件被编译进去了，在这里单单用变量也是匹配不到的，因为路径的问题。即根据 component 的路径，匹配不到已编译的组件，因为匹配期间不会再计算代码所在文件路径相对 component 的路径。比如 component 的值分别为`@/views/index.vue`、`../views/index.vue`、`./views/index.vue`，运行期间这些直接拿去跟已注册组件匹配，并不会再次计算真实路径
- 看不懂上面也没关系，没经历过确实不太容易理解。经过上面的解释再理解下面写法就 ok 了，把下面的写法看成常规的`require(['@/views/index.vue'], resolve)`没毛病吧，再换成下面写法，webpack 知道组件位于`@/views/`，组件后缀名`.vue`，该文件夹的 vue 文件统统编译，变的只有中间部分路径

```javascript
router.component = resolve => {
  require(['@/views/' + component + '.vue'], resolve)
}
```

## 动态生成页面

- 有了以上基础再来看这里。这里的动态生成页面是指一个路由对应的组件如果存在则加载，不存在则用 template 赋值一个默认页面
- 此功能可用于大量结构类似的页面，比如很多菜单对应的都是表格页，常见于中后台管理系统。因为会先尝试加载默认路径，不存在才使用默认页，所以个别页面只需要在默认路径放置组件即可覆盖默认页面

```javascript
if (router.component) {
  const component = router.component
  router.component = resolve => {
    require(['@/' + component + '.vue'], resolve)
  }
} else if (router.template) {
  router.component = resolve => {
    resolve({
      template: router.template
    })
  }
} else {
  // 如果没有指定component路径并且没有设置template，尝试加载默认路径位置组件或用默认页面
  const component = `${router.name}/index`
  router.component = async resolve => {
    try {
      // 尝试加载模块
      await require(['@/views/' + component + '.vue'], resolve)
    } catch {
      // 加载失败，不存在此模块，使用默认模板
      console.log('@/views/' + component + '.vue不存在，加载默认模板')
      resolve({
        template: `<table-base table-name="${router.name}" />`
      })
    }
  }
}
```

## 最后

- 经过多个日夜的折腾，这几个功能才搞定，一切尽在代码中 https://github.com/xxred/Easy.Front-End
- 感谢项目 https://github.com/PanJiaChen/vue-element-admin/
