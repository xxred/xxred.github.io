# asp.net core 健康检查

- ASP.NET Core 2.2 开始，提供了健康检查中间件和库，用来报告应用基础结构组件的运行状况。[官方文档在此](https://docs.microsoft.com/zh-cn/aspnet/core/host-and-deploy/health-checks)

  > 运行状况检查由应用程序作为 HTTP 终结点公开。 可以为各种实时监视方案配置运行状况检查终结点：
  >
  > - 运行状况探测可以由容器业务流程协调程序和负载均衡器用于检查应用的状态。 例如，容器业务流程协调程序可以通过停止滚动部署或重新启动容器来响应失败的运行状况检查。 负载均衡器可以通过将流量从失败的实例路由到正常实例，来应对不正常的应用。
  > - 可以监视内存、磁盘和其他物理服务器资源的使用情况来了解是否处于正常状态。
  > - 运行状况检查可以测试应用的依赖项（如数据库和外部服务终结点）以确认是否可用和正常工作。

- 本文主要是介绍这个功能，记录基础用法，以及一些可能除了上述提到的其他场景

## 安装和运行

- 引用 `Microsoft.AspNetCore.App` 元包或`Microsoft.AspNetCore.Diagnostics.HealthChecks` 包。
- 配置

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddHealthChecks();
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
        app.UseHealthChecks("/health");
    }
}
```

- 运行后访问`/health`，将返回纯文本`Healthy`，状态枚举`HealthStatus`共三个：`HealthStatus.Healthy`、`HealthStatus.Degraded` 或 `HealthStatus.Unhealthy` 状态
- 此基本配置注册运行健康检查服务，并对请求进行响应，默认不注册任何其他检查，所以只是简单的响应请求，代表应用正常

## 自定义检查项

- 通过实现 `IHealthCheck`接口创建检查项

```csharp
public class ExampleHealthCheck : IHealthCheck
{
    public ExampleHealthCheck()
    {
        // 这里可以通过构造函数注入实现获取其他服务
    }

    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default(CancellationToken))
    {
        // 执行健康检查，代码逻辑写在这里
        // 这里定义检查结果为true
        var healthCheckResultHealthy = true;

        if (healthCheckResultHealthy)
        {
            return Task.FromResult(
                HealthCheckResult.Healthy("检查表明健康"));
        }

        return Task.FromResult(
            HealthCheckResult.Unhealthy("检查表明不健康"));
    }
}
```

- 注册

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddHealthChecks()
    .AddCheck<ExampleHealthCheck>(
        name: "example_health_check1",
        failureStatus:HealthSus.Unhealthy,
        tags: new[] { "example" });

    // 或者这样
    services.AddHealthChecks()
    .AddCheck(
        name: "example_health_check2",
        check: ()=>HealthCheckResu.Healthy("ok123"),
        tags: new[] { "example" });
}
```

- 注册参数解释，name 就是检查项名称
- failureStatus 指定检查结果是失败时响应的状态
- tags 标签可用于后续筛选。目的是将此标签视为健康检查的消费者，用作健康检查的便捷分组和过滤机制
- 如果指定了 check 参数则不必实现`IHealthCheck`接口，检查时调用改 check，因此 failureStatus 也不必指定

## 运行检查

- 注册检查中间件，指定访问链接和检查配置

### 筛选检查

- Predicate 委托会在遍历所有检查的时候被调用

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseHealthChecks("/health", new HealthCheckOptions()
    {
        // 过滤掉其他检查，只执行 Foo and Baz 检查
        Predicate = (check) => check.Tags.Contains("foo_tag") ||
            check.Tags.Contains("baz_tag")
}
```

### 自定义 HTTP 状态码

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseHealthChecks("/health", new HealthCheckOptions()
    {
        // 下面的状态信息是默认分配为HealthStatus属性，可以自定义不同的健康状态返回不同状态码
        ResultStatusCodes =
        {
            [HealthStatus.Healthy] = StatusCodes.Status200OK,
            [HealthStatus.Degraded] = StatusCodes.Status200OK,
            [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable
        }
    });
}
```

### 取消缓存头

- 为了防止健康检查请求响应缓存，健康检查中间件将修改缓存标头，默认`AllowCachingResponses`为 false，不响应缓存

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseHealthChecks("/health", new HealthCheckOptions()
    {
        // 默认为false
        AllowCachingResponses = false
    });
}
```

### 自定义输出

- 默认响应是将检查结果状态`HealthStatus`直接输出成纯文本。这里可以自定义输出，封装统一的响应结果，并输出更多信息

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    ResponseWriter = WriteResponse
}

private static Task WriteResponse(HttpContext httpContext,
    HealthReport result)
{
    httpContext.Response.ContentType = "application/json";

    var json = new JObject(
        new JProperty("status", result.Status.ToString()),
        new JProperty("results", new JObject(result.Entries.Select(pair =>
            new JProperty(pair.Key, new JObject(
                new JProperty("status", pair.Value.Status.ToString()),
                new JProperty("description", pair.Value.Description),
                new JProperty("data", new JObject(pair.Value.Data.Select(
                    p => new JProperty(p.Key, p.Value))))))))));
    return httpContext.Response.WriteAsync(
        json.ToString(Formatting.Indented));
}
```

## 应用

- [数据库探测](https://docs.microsoft.com/zh-cn/aspnet/core/host-and-deploy/health-checks#database-probe)，例子可以是执行`select 1 from tableName`根据数据库响应来判断是否健康
- [单独的就绪情况和运行情况探测](https://docs.microsoft.com/zh-cn/aspnet/core/host-and-deploy/health-checks#separate-readiness-and-liveness-probes)，在某些托管方案中，可能初始化是一个比较耗时的操作，应用正常运行，但是可能还不能正常处理请求并响应
- [具有自定义响应编写器的基于指标的探测](https://docs.microsoft.com/zh-cn/aspnet/core/host-and-deploy/health-checks#metric-based-probe-with-a-custom-response-writer)，比如检查内存占用是否超标，cpu 是否占用过高，连接数是否达到上限
- [按端口筛选](https://docs.microsoft.com/zh-cn/aspnet/core/host-and-deploy/health-checks#filter-by-port)，指定端口，一般用于容器环境，根据容器启动时配置的端口号进行响应
- [分发运行状况检查库](https://docs.microsoft.com/zh-cn/aspnet/core/host-and-deploy/health-checks#distribute-a-health-check-library)，将检查接口实现独立一个类，并通过依赖注入获取参数，检查时根据参数编写逻辑
- [检查发布服务器](https://docs.microsoft.com/zh-cn/aspnet/core/host-and-deploy/health-checks#health-check-publisher)，如果向 DI 添加 IHealthCheckPublisher，则运行状态检查系统将定期执行状态检查，并使用结果调用 PublishAsync。适用于需要推送的健康系统，而不是健康系统主动发出健康检查的请求

## 相关阅读

- [ASP.NET Core 2.2.0 发布](https://blogs.msdn.microsoft.com/webdev/2018/10/17/asp-net-core-2-2-0-preview3-now-available/)

## 总结

- 虽然大部分内容都是官方文档内容，但是写完之后相当于整理了一遍。不仅理解了看文档时不理解的地方，也更进一步了解了它的使用场景。本来以为简单的用法，过了一遍就认为自己懂了会用了，但实际上只是浮于表面，很多地方不懂得为什么这么设计，每个参数都有什么用
- 一个新的学习思路：先了解它的应用场景，解决了什么问题，再回过头来看，针对各种场景，功能都是怎么设计和实现的，最后看不同的需求都是怎么通过不同使用方式来满足的。
