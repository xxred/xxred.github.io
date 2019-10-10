# NewLife-IdentityServer - 基于 IdentityServer4 的授权中心

- IdentityServer 是啥就不多介绍了，有关更多信息，请参见 http://docs.identityserver.io/en/latest/index.html 。这里主要介绍如何基于它搭建一个授权中心，并避过一些坑
- 说是坑，其实是一些关键性的知识或者经验没具备，处理流程不清楚
- 项目地址 https://github.com/xxred/NewLife.IdentityServer4.git

## 设置过程

1. 设置过程说起来比较简单，需要 Easy.Admin-https://github.com/xxred/Easy.Admin 、 IdentityServer4.XCode-https://github.com/xxred/IdentityServer4.XCode 这两个库，这两个库手动编译一份并添加引用，建议 clone 下来直接添加到项目，方便调试。因为 Asp.Net Core 项目的依赖是具有传递性的，因此项目只需要添加这两个项目，以及一个 MySql.Data 包即可
2. 首先 IdentityServer4.XCode 项目处理的是数据库存储，将客户端数据存储在数据库并映射到 IdentityServer 所需要的类型，所以本文说的跟网上大部分教程使用内存数据都不一样，同样都是使用 X 组件的数据库组件 XCode
3. Easy.Admin 项目则是通用权限系统，处理了大部分基础流程，所以 NewLife.IdentityServer 看起来很简单。其中重点是登录认证的设置。[JwtBearerAuthenticationHandler](https://github.com/xxred/Easy.Admin/blob/master/Easy.Admin/Authentication/JwtBearer/JwtBearerAuthenticationHandler.cs#L61) 的 HandleSignInAsync 方法在系统登录是添加`sub`、`idp`、`auth_time`、`iat`等声明，这几个声明 IdentityServer4 会用来提取认证信息
4. 另一点是 Claim 类型转化清除，`System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();`这行代码清除了转换，[JwtBearerAuthenticationHandler](https://github.com/xxred/Easy.Admin/blob/master/Easy.Admin/Authentication/JwtBearer/JwtBearerAuthenticationHandler.cs#L40) 的 HandleAuthenticateAsync 方法中，认证结束后就不会将`sub`等声明转化成`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier`。因为后续 IdentityServer4 会用到`sub`等信息，所以必须清除转换
5. 还有认证协议问题，这里使用的认证协议名称跟默认的 AuthenticationScheme 不一样，这一点还没研究透，先这么处理

   ```csharp
   services.AddIdentityServer(options =>
                {
                    options.UserInteraction.LoginReturnUrlParameter = "returnUrl";//返回url的参数名

                    options.UserInteraction.LoginUrl = "/login";

                    options.Authentication.CookieAuthenticationScheme =
                        //IdentityConstants.ApplicationScheme;
                        "Jwt-Cookie";
                })
   ```

## 运行

- 注意以上的点，然后将 IdentityServer 添加到管道即可`app.UseIdentityServer();`，运行的时候将前端文件放到 wwwroot 目录下即可，打包好的前端文件详见 https://github.com/xxred/NewLife.IdentityServer4/releases
- 配置文件位于 `appsettings.json`，下面可以是客户端(Easy.Admin 就是一个客户端，前端项目也可用于它)配置，设置授权服务地址即可

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ApiTitle": "授权中心",
  "OAuthConfiguration": [
    {
      "Scheme": "IdentityServer4",
      "Authority": "http://localhost:8057",
      "CallbackPath": "/sign-client",
      "ClientId": "client",
      "ClientSecret": "client",
      "ResponseType": "code",
      "Scopes": ["api1", "openid"]
    },
    {
      "Scheme": "Github",
      "ClientId": "ClientId",
      "ClientSecret": "ClientSecret"
    },
    {
      "Scheme": "QQ",
      "ClientId": "ClientId",
      "ClientSecret": "ClientSecret"
    }
  ],
  "connectionStrings": {
    "IdentityServer": {
      "connectionString": "Server=127.0.0.1;Port=3306;Database=IdentityServer;Uid=root;Pwd=123456;",
      "providerName": "MySql.Data.MySqlClient"
    },
    "Membership": {
      "connectionString": "Server=127.0.0.1;Port=3306;Database=IdentityServer;Uid=root;Pwd=123456;",
      "providerName": "MySql.Data.MySqlClient"
    }
  }
}
```

- 将配置中的数据库设置注释就是使用 sqlite，简单省事。跑起来之后，导航到`http://host:port/ClientRedirectUris/Index`设置客户端跳转链接
- 如果步骤没有遗漏，跑起来的授权服务中心应该就可以服务了

## 最后

- 未全面测试，可能还有很多问题，但是作为一个简易授权服务是没问题了
