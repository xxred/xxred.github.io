# ASP.NET Core Blazor 状态管理

- 本文探究一下，ASP.NET Core Blazor 的状态管理。Blazor WebAssembly 在 ASP.NET Core 3.1 中为预览版，所以这里讨论的是 Blazor Server。大多数情况下，应用保持与服务器的持续连接。用户状态处于线路中服务器的内存中。
- 用户线路的状态的示例包括：
  - 呈现的 UI——组件实例和对应输出的层次结构。
  - 组件实例中的任何字段和属性的值。
  - 依赖于线路的依赖注入（DI）服务实例中保存的数据。

Blazor 线路

- 每个 blazor 页面对应一个线路，通过该线路与服务器进行通信。如果网络突然中断，Blazor 会尝试将用户重新连接到那个初始线路。但总可能会出于各种原因而连不上之前的线路：
  - 超时或服务器内存压力大必须断开连接的线路
  - 多服务器、负载均衡环境中，任何请求都可能变的不可用。请求不可用，在用户尝试重新连接时就会失败。
  - 用户关闭并重新打开页面或重载页面，都会删除浏览器内存中保存的任何状态。例如，通过 JavaScript 互操作调用设置的值将丢失。

## 跨线路保留状态

- 跨线路状态保存的数据一般是需要大量精力创建的数据，而不是读取已存在数据。比如，购物车数据，步骤数据，等等不容易创建的数据，但是像创建的用户名这种简单数据就没必要了。
- 如果真的需要跨线路保存，即数据保存到单个线路以外，不要只将数据存储在服务器内存中，必须采取一些措施进行持久化。

## 保留状态的位置

- 有三个常用位置保存：
  - [数据库中的服务器端](https://docs.microsoft.com/zh-cn/aspnet/core/blazor/state-management?view=aspnetcore-3.1#server-side-in-a-database)
  - [URL](https://docs.microsoft.com/zh-cn/aspnet/core/blazor/state-management?view=aspnetcore-3.1#url)
  - [浏览器中的客户端](https://docs.microsoft.com/zh-cn/aspnet/core/blazor/state-management?view=aspnetcore-3.1#client-side-in-the-browser)

### 数据库中的服务器端

- 对于永久数据持久性或必须跨多个用户或设备的任何数据,服务器端数据库无疑是最佳选择，比如 Mysql。

### URL

- 对于表示导航状态的暂时性数据，请将数据作为 URL 的一部分进行建模。 URL 中的状态模型示例包括：
  - 已查看实体的 ID。
  - 分页网格中的当前页码。

### 浏览器中的客户端

- 对于用户正在主动创建的暂时性数据，公共后备存储有浏览器的 localStorage 和 sessionStorage 集合。

## 最后

- 关于以上 ASP.NET Core Blazor 状态管理就介绍这么多，更多详情请参考[这里](https://docs.microsoft.com/zh-cn/aspnet/core/blazor/state-management)。
