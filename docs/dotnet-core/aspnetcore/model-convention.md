# 应用模型约定

- 就是框架的应用，包括所有控制器，所有方法，所有参数，路由，过滤器都可以统一修改，比如统一路由前缀
- ApiConventionApplicationModelConvention
  IActionModelConvention
  IControllerModelConvention
  IParameterModelConvention
  IParameterModelBaseConvention
- api action 处理 ApiConvention https://github.com/aspnet/AspNetCore/blob/master/src/Mvc/Mvc.Core/src/ApplicationModels/ApiConventionApplicationModelConvention.cs
- 所有 Conventions ApplicationModelConventions https://github.com/aspnet/AspNetCore/blob/master/src/Mvc/Mvc.Core/src/ApplicationModels/ApplicationModelConventions.cs
- 提供者 ApplicationModelProvider https://github.com/aspnet/AspNetCore/blob/master/src/Mvc/Mvc.Core/src/ApplicationModels/DefaultApplicationModelProvider.cs
