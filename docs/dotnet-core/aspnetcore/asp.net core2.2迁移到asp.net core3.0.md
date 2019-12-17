# asp.net core2.2 迁移到 asp.net core3.0

- 官方迁移教程 https://docs.microsoft.com/zh-cn/aspnet/core/migration/22-to-30?view=aspnetcore-3.0&tabs=visual-studio
- 3.0 新增功能，里面提到一些新功能用法 https://docs.microsoft.com/zh-cn/aspnet/core/release-notes/aspnetcore-3.0?view=aspnetcore-3.0
- https://docs.microsoft.com/zh-cn/aspnet/core/fundamentals/http-requests?view=aspnetcore-3.0
- 官网教程详细介绍了常用的需要迁移的地方或组件， 下面介绍官网没提到或者没在教程上的地方，做一个收集

## 认证 Authentication、授权 Authorization 和身份标识 Identity

- 在 ASP.NET Core 中配置证书身份验证 https://docs.microsoft.com/zh-cn/aspnet/core/security/authentication/certauth?view=aspnetcore-3.0
- 使用 JwtBearer 或者 OpenIdConnect 认证，安装 `Microsoft.AspNetCore.Authentication.JwtBearer`或者`Microsoft.AspNetCore.Authentication.OpenIdConnect`
- 授权 Authorization 变化，必须使用中间件 https://docs.microsoft.com/zh-cn/aspnet/core/migration/22-to-30?view=aspnetcore-3.0&tabs=visual-studio#authorization
- 使用 UserManager 和 SignInManager 原来在`Microsoft.AspNetCore.Authentication`的，现在需要安装 `Microsoft.Extensions.Identity.Core`

## 发出 HTTP 请求 HttpClientFactory

- 之前用 HttpClientFactory 静态方法创建 HttpClient 的可以参考 https://docs.microsoft.com/zh-cn/aspnet/core/fundamentals/http-requests?view=aspnetcore-3.0

## OAuth 使用 System.Txt.Json

- OAuthHandler 中请求结果读取字符串后使用的序列化组件改成了 System.Txt.Json，相关类参数也换成了 JsonDocument 或者 JsonElement

```csharp
var payload = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
var user = payload.RootElement;
```

## SpaServices

- 这部分用法不变，只需要安装包 `Microsoft.AspNetCore.SpaServices.Extensions`
- 另外，IdentityServer3.0 支持 Web API 和 SPA 的身份验证和授权 https://docs.microsoft.com/zh-cn/aspnet/core/release-notes/aspnetcore-3.0?view=aspnetcore-3.0#identityserver4-supports-authentication-and-authorization-for-web-apis-and-spas 具体体验方式是添加 spa 项目时勾选身份验证即可
- 据体文档 https://docs.microsoft.com/zh-cn/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-3.0

## 跨域

- 不再允许最大限度跨域，以下代码运行报错

```csharp
            // 跨域
            app.UseCors(config =>
                config.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                    .AllowCredentials());
```

- 改为使用默认的策略

```csharp
app.UseCors("default");
```

## swagger 升级

- swagger 使用的是 Swashbuckle.AspNetCore，目前版本是版本是 5.0.0-rc4，这个正式版还没出，这个版本就是为了适配 dotnetcore 3.0 的，整体变化不大，部分设置修改为了类
- 首先是 api 描述有 Info 换成了 OpenApiInfo，引入 Microsoft.OpenApi.Models 命名空间
- 下面是认证设置，先是 4.x 旧版本

```csharp
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Authorization",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });

                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer",new string[]{}}
                });
```

- 5.x 版本

```csharp
                var bearerScheme = new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                };

                c.AddSecurityDefinition("Bearer", bearerScheme);

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    { bearerScheme, new List<string>()}

                });
```

- 然后是 OAuth 设置，4.x 版本

```csharp
                    c.AddSecurityDefinition("oauth2", new OAuth2Scheme
                    {
                        Type = "oauth2",
                        Flow = "authorizationCode",
                        TokenUrl = "/api/Account/GetToken",
                        AuthorizationUrl = oAuthConfiguration.Authority.EnsureEnd("/") + "connect/authorize",
                        Description = "OAuth2登陆授权",
                        Scopes = new Dictionary<string, string>
                        {
                            { "api1", "测试"},
                            { "openid","唯一标识" },
                            { "profile","用户信息"}
                        }
                    });

                    c.AddSecurityRequirement(new Dictionary<string, Enumerable<string>>
                    {
                        { "oauth2",new string[]{}}
                    });
```

- 5.x 版本

```csharp
var oauth2Scheme = new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        Description = "OAuth2登陆授权",
                        Flows = new OpenApiOAuthFlows()
                        {
                            AuthorizationCode = new OpenApiOAuthFlow()
                            {
                                AuthorizationUrl = new Uri(oAuthConfiguration.Authority.EnsureEnd("/") + "connect/authorize"),
                                TokenUrl = new Uri("/api/Account/GetToken",UriKind.Relative),
                                Scopes = new Dictionary<string, string>
                                {
                                    {"api1", "测试"},
                                    {"openid", "唯一标识"},
                                    {"profile", "用户信息"}
                                }
                            }
                        }
                    };

                    c.AddSecurityDefinition("oauth2", oauth2Scheme);
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        { oauth2Scheme, new List<string>(){"openid"}}
                    });
```

## 未完待续

- 后续遇到再补充
