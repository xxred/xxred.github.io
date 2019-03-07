# 简单理解 OAuth 2.0 及资料收集，IdentityServer4 部分源码解析

- 虽然经常用 OAuth 2.0，但是原理却不曾了解，印象里觉得很简单，请求跳来跳去，今天看完相关介绍，就来捋一捋 OAuth 2.0，记录一下加深印象
- OAuth 2.0 是行业标准的授权协议。OAuth 2.0 取代了 2006 年创建的原始 OAuth 协议所做的工作.OAuth 2.0 专注于客户端开发人员的简单性，同时为 Web 应用程序，桌面应用程序，移动电话和客厅设备提供特定的授权流程。该规范及其扩展正在 IETF OAuth 工作组内开发。
- [理解 OAuth 2.0](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)
- [OAuth 社区网站](https://oauth.net)
- [OAuth Server 的实现-IdentityServer4 源码分析](https://www.cnblogs.com/jackcao/p/10031828.html)
- [OAuth 的机制原理讲解及开发流程](https://kb.cnblogs.com/page/189153/)
- [IdentityServer4 中文文档与实战](http://www.cnblogs.com/stulzq/p/8119928.html)
- [IdentityServer4.Docs.zh-Hans](https://github.com/raochunjiang/IdentityServer4.Docs.zh-Hans)
- [rfc6749](https://tools.ietf.org/html/rfc6749)
- [OAuth2 授权](http://www.cnblogs.com/linianhui/p/oauth2-authorization.html)，建议了解大概概念在看

## 解决的问题

- 在不将密码透露给第三方的基础上，授权给第三方访问服务器资源

## 认证流程

1. 得到授权码 code
2. 获取 access token
3. 通过 access token，获取 OpenID
4. 通过 access token 及 OpenID 调用 API，获取用户授权信息

![ ](http://blog.unvs.cn/upload/oauth2.0_developer_pic.jpg)

- 第一步得到授权码 code，这个可以看做一个获取资源的请求，该请求需要登录（输入密码，或者 qq 登录等）。登陆过程就是用户自己在授权服务器登陆的，不用第三方拿密码自己登陆授权服务器。登录授权服务器之后，返回 code，完成第一步。到这里用户的登录动作就完成了
- 第二步第三方应用根据 code 请求 token，再到几步后面获取其它资源，刷新 token 等
- 中间根据授权类型，授权范围做相应处理，整个协议大概就可以这样子理解，实际的登录过程由用户在授权服务器登录，所以输入密码过程要认准域名，防止伪造的网站，泄露了密码

## .net 实现

- [IdentityServer](https://github.com/IdentityServer/IdentityServer4)是一个免费的开源 OpenID Connect 和 OAuth 2.0 框架，适用于 ASP .NET Core。IdentityServer4 由 Dominick Baier 和 Brock Allen 创建和维护，整合了在应用程序中集成基于令牌的身份验证，单点登录和 API 访问控制所需的所有协议实现和可扩展性点。IdentityServer4 由 OpenID Foundation 正式认证，因此符合规范且可互操作
- 这是 ASP .NET Core 中用的较多的框架，可参考 demo 快速体验
- []https://github.com/raochunjiang/IdentityServer4.Docs.zh-Hans

## 自定义 IdentityServer

- 仿照 IdentityServer4 源码造一个 IdentityServer

### 结构及流程

1. 主要看中间件`IdentityServerMiddleware`，所有的端点走的都是这么个流程，所以关键点在于`endpoint`，不用的 url 请求对应不同的`endpoint`

```csharp
                var endpoint = router.Find(context);
                if (endpoint != null)
                {
                    _logger.LogInformation("Invoking IdentityServer endpoint: {endpointType} for {url}", endpoint.GetType().FullName, context.Request.Path.ToString());

                    var result = await endpoint.ProcessAsync(context);

                    if (result != null)
                    {
                        _logger.LogTrace("Invoking result: {type}", result.GetType().FullName);
                        await result.ExecuteAsync(context);
                    }

                    return;
                }
```

首先是根据 context 查找匹配的端点，然后调用端点的`ProcessAsync`方法，得到结果`result`，然后执行方法`ExecuteAsync`得到结果

2. 所有的授权相关请求，都对应一个 endpoint，每个 endpoint，基本都有一个 Validator，用于验证。比如验证客户端参数是否合法，请求信息时验证是否登陆等等。\_validator 是 IAuthorizeRequestValidator 接口的实例，用于验证，可通过 DI 注入自己的验证

```csharp
        // ProcessAsync方法
        public override async Task<IEndpointResult> ProcessAsync(HttpContext context)
        {
            // 省略部分代码

            var user = await UserSession.GetUserAsync();
            var result = await ProcessAuthorizeRequestAsync(values, user, null);

            // 省略部分代码

            return result;
        }

        // ProcessAuthorizeRequestAsync方法
         internal async Task<IEndpointResult> ProcessAuthorizeRequestAsync(NameValueCollection parameters, ClaimsPrincipal user, ConsentResponse consent)
        {
            // 省略部分代码

            // validate request
            var result = await _validator.ValidateAsync(parameters, user);

            // 省略部分代码
            return new AuthorizeResult(response);
        }
```

如果我们要自定义某个授权过程中的请求，可以继承 IEndpointHandler 实现自己的 endpoint，并自定义路径

```csharp
    // 首先实现IEndpointHandler接口
    public class CustomAuthorizeEndpoint : IEndpointHandler
    {
        public Task<IEndpointResult> ProcessAsync(HttpContext context)
        {
            throw new NotImplementedException();
        }
    }

    // 然后在Startup.cs的ConfigureServices方法注入
    services.AddTransient<CustomAuthorizeEndpoint>();
    services.AddSingleton(new Endpoint("Authorize", "/customUrl/authorize", typeof(CustomAuthorizeEndpoint)));
```

3. 其他方面同理，实现相关接口，注入，即可实现自定义，以下列出一些接口及功能说明：

- IClientStore，客户端存储，可自定义实现从数据库存取客户端数据
- IEndpointHandler，Endpoint 端点，根据 url 匹配 Endpoint，处理并响应请求
- IAuthorizeRequestValidator，授权请求验证，可校验客户端参数、类型是否跟已注册客户端一致

框架提供的自定义验证，即在默认验证实现中加入自定义验证

- ICustomAuthorizeRequestValidator，允许在授权和令牌请求中插入自定义验证逻辑
- ICustomTokenRequestValidator，允许在授权和令牌请求中插入自定义验证逻辑
- ICustomTokenValidator，允许插入自定义令牌验证逻辑

## 总结

- 入门过程不能太急躁，首先过一下相关概念，然后跑一下具体的例子，仔细感受例子，尽量跟相关概念对上号，慢慢对上所有概念，这时候就会对相关概念进一步加深理解。
- 接下来就可以自己 Diy 一下功能，根据自己的需求做小小的改动。这个步骤相当于学会了之后用在项目里，虽然还没达到了如指掌的程度，但是出了问题能快速定位问题，不会一头雾水，这是之前体验例子对概念的好处。如果还没用上项目，可以吧 Diy 的方式方法记录下来备用，如果直接用上了，也可以记录下来，举一反三
- 假如这是个比较重要，常用的功能，但是又比较复杂，难理解，那么走完上述两步之后，建议自己实现个精简版。这样有利于整体把握概念，扫清所有盲点，只有自己能实现了，才算是真正掌握，以后多次用到，出了问题也能轻松定位解决，这个收益绝对很赚
- 以上就是一点学习总结，不能掉进心浮气躁的陷阱，这将一无所获且浪费时间！
