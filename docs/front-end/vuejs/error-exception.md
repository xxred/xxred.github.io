# 关于vue的各种错误或异常收集

## 循环引入模块

### 描述

- 问题发生在引入模块的时候，由于循环引入模块导致最先引入的模块返回空值。main.js入口引入router，router引入Layout.vue，关键在于Layout.vue又引入了router，从router中读取路由数据显示菜单。

### 分析

- 模块引入的时候，会先把该模块的依赖引入一次，缓存起来，其它地方第二次引入就直接返回。
- main.js第一次引入router，在这之前会先引入router的依赖模块Layout.vue（此时还没引入router），而Layout.vue又依赖于router。所以需要先引入router，注意这个时候才是第一次引入router。这个时候就相当于进入死循环了，但是Webpack处理了这个问题。Layout.vue引入的router返回了空值，这样就完成了Layout.vue的引入，再完成router的引入，这个时候main.js里面引入的router就是正常的，而Layout.vue引入的router则是空值。因此，router明明有值菜单却不显示。

### 解决

1. 避免循环引入模块，不要在让Layout.vue直接或间接依赖router，因为router肯定依赖Layout.vue作为模板。
2. router中延迟加载Layout.vue，不马上引入Layout.vue，也可避免循环引入。

### 案例

- 还原此次提交即可重现 https://github.com/xxred/Easy.Front-End/commit/bf6d5741e38225b28af1e6a464681466d6885cfe
- 解决方法在本次提交 https://github.com/xxred/Easy.Front-End/commit/f9c7fb37c08d08db3553f3562814ac97e52822a2