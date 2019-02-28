# 简单理解 OAuth 2.0

- 虽然经常用 OAuth 2.0，但是原理却不曾了解，印象里觉得很简单，请求跳来跳去，今天看完相关介绍，就来捋一捋 OAuth 2.0，记录一下加深印象
- OAuth 2.0 是行业标准的授权协议。OAuth 2.0 取代了 2006 年创建的原始 OAuth 协议所做的工作.OAuth 2.0 专注于客户端开发人员的简单性，同时为 Web 应用程序，桌面应用程序，移动电话和客厅设备提供特定的授权流程。该规范及其扩展正在 IETF OAuth 工作组内开发。
- 理解 OAuth 2.0 参考http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html
- OAuth 社区网站https://oauth.net
- OAuth Server 的实现-IdentityServer4 源码分析https://www.cnblogs.com/jackcao/p/10031828.html
- OAuth 的机制原理讲解及开发流程https://kb.cnblogs.com/page/189153/

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
