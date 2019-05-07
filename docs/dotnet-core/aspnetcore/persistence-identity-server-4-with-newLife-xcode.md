# 使用 NewLife.XCode 持久化 IdentityServer4

- IdentityServer4 是基于 ASP.NET Core 的 OpenID Connect 和 OAuth 2.0 框架。
- 它具有以下功能：
  - 身份验证即服务。适用于所有应用（Web，本机，移动设备，服务）的集中登录逻辑和工作流程。
  - 单点登录/注销。
  - API 的访问控制。为各种类型的客户端发出 API 访问令牌，例如服务器到服务器，Web 应用程序，SPA 和本机/移动应用程序
- IdentityServer 是一个中间件，可将符合规范的 OpenID Connect 和 OAuth 2.0 端点添加到任意 ASP.NET Core 应用程序中。它已经被越来越多的应用程序使用，那么如何将这款优秀的中间件添加到系统中来，与现有系统对接呢？本文主要实现持久化 IdentityServer4 的功能，通过 NewLife.XCode 保存相关数据。记录实现步骤和遇到的问题
- 示例代码仓库[IdentityServer4.XCode](https://github.com/xxred/IdentityServer4.XCode/tree/master/Entities)

## 实体分析

### xml 模型

- 参考[官方示例模板](https://github.com/IdentityServer/IdentityServer4.Templates)中的`is4admin`模板中生成的数据库，使用[码神工具](https://github.com/NewLifeX/XCoder.git)导出 xml 实体模型，得到如下模型：

```xml
<?xml version="1.0" encoding="utf-8"?>
<Tables Version="9.11.7012.14588" Output="" NameSpace="IdentityServer4.XCode.Entities" ConnName="IdentityServer" BaseClass="Entity" xmlns:xs="http://www.w3.org/2001/XMLSchema-instance" xs:schemaLocation="http://www.newlifex.com https://doc.newlifex.com/ModelSchema.xsd" xmlns="http://www.newlifex.com/ModelSchema.xsd">
  <Table Name="ApiClaims">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Type" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ApiResourceId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ApiResourceId" />
    </Indexes>
  </Table>
  <Table Name="ApiProperties">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Key" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Value" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ApiResourceId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ApiResourceId" />
    </Indexes>
  </Table>
  <Table Name="ApiResources">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Enabled" DataType="Boolean" />
      <Column Name="Name" DataType="String" RawType="TEXT" Master="True" Length="0" Nullable="False" />
      <Column Name="DisplayName" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Description" DataType="String" RawType="TEXT" Length="0" />
      <Column Name="Created" DataType="String" RawType="TEXT" Length="0" />
      <Column Name="Updated" DataType="String" RawType="TEXT" Length="0" />
      <Column Name="LastAccessed" DataType="String" RawType="TEXT" Length="0" />
      <Column Name="NonEditable" DataType="Int64" RawType="INTEGER" Description="不可编辑" />
    </Columns>
    <Indexes>
      <Index Name="IX_ApiResources_Name" Columns="Name" Unique="True" />
    </Indexes>
  </Table>
  <Table Name="ApiScopeClaims">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Type" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ApiScopeId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ApiScopeId" />
    </Indexes>
  </Table>
  <Table Name="ApiScopes">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Name" DataType="String" RawType="TEXT" Master="True" Length="0" Nullable="False" />
      <Column Name="DisplayName" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Description" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Required" DataType="Boolean" />
      <Column Name="Emphasize" DataType="Boolean" />
      <Column Name="ShowInDiscoveryDocument" DataType="Boolean" />
      <Column Name="ApiResourceId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ApiResourceId" />
      <Index Name="IX_ApiScopes_Name" Columns="Name" Unique="True" />
    </Indexes>
  </Table>
  <Table Name="ApiSecrets">
    <Columns>
      <Column Name="Created" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Expiration" DataType="DateTime" Nullable="False" />
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Description" DataType="String" RawType="TEXT" Length="0" />
      <Column Name="Value" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Type" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ApiResourceId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ApiResourceId" />
    </Indexes>
  </Table>
  <Table Name="AuditEntries">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="When" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Source" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="SubjectType" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="SubjectIdentifier" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Subject" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Action" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ResourceType" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Resource" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ResourceIdentifier" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Succeeded" DataType="Int64" RawType="INTEGER" />
      <Column Name="Description" DataType="String" RawType="TEXT" Length="0" />
      <Column Name="NormalisedSubject" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="NormalisedAction" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="NormalisedResource" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="NormalisedSource" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
    </Columns>
    <Indexes>
      <Index Columns="When" />
    </Indexes>
  </Table>
  <Table Name="ClientClaims">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Type" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Value" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="ClientCorsOrigins">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Origin" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="ClientGrantTypes">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="GrantType" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="ClientIdPRestrictions">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Provider" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="ClientPostLogoutRedirectUris">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="PostLogoutRedirectUri" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="ClientProperties">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Key" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Value" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="ClientRedirectUris">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="RedirectUri" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="Clients">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Enabled" DataType="Boolean" Description="启用(默认为true)" />
      <Column Name="ClientId" DataType="String" RawType="TEXT" Length="0" Nullable="False" Description="客户端ID(应用程序的唯一识别标识)" />
      <Column Name="ProtocolType" DataType="String" RawType="TEXT" Length="0" Nullable="False" Description="协议类型(默认oidc)" />
      <Column Name="RequireClientSecret" DataType="Boolean" Description="需要密钥(指定此客户端是否需要密钥才能从令牌端点请求令牌（默认为true）)" />
      <Column Name="RequirePkce" DataType="Boolean" Description="校验密钥(使用基于授权代码authorization_code的授权类型的客户端是否必须发送校验密钥)" />
      <Column Name="AllowPlainTextPkce" DataType="Boolean" Description="允许纯文本密钥(指定是否可以使用文本方法发送证明密钥（不推荐，默认false）)" />
      <Column Name="AllowOfflineAccess" DataType="Boolean" Description="允许刷新token(需要offline_access范围scope)" />
      <Column Name="AllowAccessTokensViaBrowser" DataType="Boolean" Description="允许通过浏览器接收token(这对于强化允许多种响应类型的流很有用（例如，不允许使用代码id_token添加令牌响应类型的混合流客户端，从而将令牌泄漏到浏览器中）)" />
      <Column Name="FrontChannelLogoutUri" DataType="String" RawType="TEXT" Length="0" Description="客户端前端注销URI(用于基于HTTP的前端通道注销。有关详细信息，请参阅 https://openid.net/specs/openid-connect-frontchannel-1_0.html)" />
      <Column Name="FrontChannelLogoutSessionRequired" DataType="Boolean" Description="发送会话id到前端注销URI(是否应将用户的会话ID发送到FrontChannelLogoutUri。默认为true)" />
      <Column Name="BackChannelLogoutUri" DataType="String" RawType="TEXT" Length="0" Description="客户端注销URI(用于基于HTTP的反向通道注销。有关更多详细信息，请参阅 https://openid.net/specs/openid-connect-backchannel-1_0.html)" />
      <Column Name="BackChannelLogoutSessionRequired" DataType="Boolean" Description="发送会话id到注销URI(是否应在请求中将用户的会话ID发送到BackChannelLogoutUri。默认为true)" />
      <Column Name="EnableLocalLogin" DataType="Boolean" Description="仅用本地登录(此客户端是否可以仅使用本地帐户或外部IdP。默认为true)" />
      <Column Name="UserSsoLifetime" DataType="Int64" RawType="INTEGER" Description="用户身份持续时间(自上次用户进行身份验证以来的最长持续时间（以秒为单位）。默认为0。您可以调整会话令牌的生命周期，以控制在使用Web应用程序时，用户需要重新输入凭据的时间和频率，而不是进行静默身份验证)" />
      <Column Name="IdentityTokenLifetime" DataType="Int64" RawType="INTEGER" Description="识别令牌生命周期(秒为单位，默认为300秒/5分钟)" />
      <Column Name="AccessTokenLifetime" DataType="Int64" RawType="INTEGER" Description="访问令牌生命周期(秒为单位，默认为3600秒/1小时)" />
      <Column Name="AuthorizationCodeLifetime" DataType="Int64" RawType="INTEGER" Description="访问令牌生命周期(秒为单位，默认为300秒/5分钟)" />
      <Column Name="AbsoluteRefreshTokenLifetime" DataType="Int64" RawType="INTEGER" Description="刷新令牌生命周期(秒为单位，默认为2592000秒/30天)" />
      <Column Name="SlidingRefreshTokenLifetime" DataType="Int64" RawType="INTEGER" Description="滑动刷新令牌生命周期(秒为单位，默认为1296000秒/15天)" />
      <Column Name="RefreshTokenUsage" DataType="Int64" RawType="INTEGER" Description="刷新令牌句柄是否保持不变(ReUse，OneTime)" Type="IdentityServer4.Models.TokenUsage" />
      <Column Name="RefreshTokenExpiration" DataType="Int64" RawType="INTEGER" Description="刷新令牌期限(Absolute 刷新令牌将在固定时间点到期（由AbsoluteRefreshTokenLifetime指定），Sliding刷新令牌时，将刷新刷新令牌的生命周期（按SlidingRefreshTokenLifetime中指定的数量）。生命周期不会超过AbsoluteRefreshTokenLifetime)" Type="IdentityServer4.Models.TokenExpiration" />
      <Column Name="UpdateAccessTokenClaimsOnRefresh" DataType="Boolean" Description="更新访问令牌(是否应在刷新令牌请求上更新访问令牌（及其声明）)" />
      <Column Name="AccessTokenType" DataType="Int64" RawType="INTEGER" Description="访问令牌类型(指定访问令牌是引用令牌还是自包含JWT令牌（默认为Jwt）)" Type="IdentityServer4.Models.AccessTokenType" />
      <Column Name="IncludeJwtId" DataType="Boolean" Description="是否嵌入JwtId(指定JWT访问令牌是否应具有嵌入的唯一ID（通过jti声明）)" />
      <Column Name="AlwaysSendClientClaims" DataType="Boolean" Description="发送客户端声明(如果设置，将为每个流发送客户端声明。如果不是，仅用于客户端凭证流（默认为false）)" />
      <Column Name="AlwaysIncludeUserClaimsInIdToken" DataType="Boolean" Description="用户声明添加到ID令牌(当同时请求ID令牌和访问令牌时，是否应始终将用户声明添加到ID令牌，而不是重新请求客户端使用userinfo端点。默认值为false)" />
      <Column Name="ClientClaimsPrefix" DataType="String" RawType="TEXT" Length="0" Description="客户端声明前缀(如果设置，客户端声明将以此为前缀。默认为client_。目的是确保它们不会意外地与用户声明冲突)" />
      <Column Name="PairWiseSubjectSalt" DataType="String" RawType="TEXT" Length="0" Description="生成成对subjectId使用的盐值" />
      <Column Name="RequireConsent" DataType="Boolean" Description="需要同意(默认为true)" />
      <Column Name="AllowRememberConsent" DataType="Boolean" Description="存储同意决策(默认true)" />
      <Column Name="ConsentLifetime" DataType="Int64" RawType="INTEGER" Description="用户同意的生命周期(默认null，无到期)" />
      <Column Name="ClientName" DataType="String" RawType="TEXT" Length="0" Nullable="False" Description="显示名称" />
      <Column Name="Description" DataType="String" RawType="TEXT" Length="0" Description="说明" />
      <Column Name="ClientUri" DataType="String" RawType="TEXT" Length="0" Description="客户端信息url(有关客户端的更多信息的URI（在同意页面上使用）)" />
      <Column Name="LogoUri" DataType="String" RawType="TEXT" Length="0" Description="客户端logo地址(在同意页面上使用)" />
      <Column Name="UserCodeType" DataType="String" RawType="TEXT" Length="0" Description="设备流用户代码的类型" />
      <Column Name="DeviceCodeLifetime" DataType="Int64" RawType="INTEGER" Description="设备代码的生命周期(秒为单位，默认为300秒/5分钟)" />
      <Column Name="Created" DataType="String" RawType="TEXT" Length="0" Description="创建" />
      <Column Name="Updated" DataType="String" RawType="TEXT" Length="0" Description="更新" />
      <Column Name="LastAccessed" DataType="DateTime" Description="上次授权时间" />
      <Column Name="NonEditable" DataType="Boolean" Description="不可编辑" />
    </Columns>
    <Indexes>
      <Index Name="IX_Clients_ClientId" Columns="ClientId" Unique="True" />
    </Indexes>
  </Table>
  <Table Name="ClientScopes">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Scope" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="ClientSecrets">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Created" DataType="String" RawType="TEXT" Length="0" />
      <Column Name="Expiration" DataType="DateTime" RawType="TEXT" />
      <Column Name="Description" DataType="String" RawType="TEXT" Length="0" />
      <Column Name="Value" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Type" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="ClientId" />
    </Indexes>
  </Table>
  <Table Name="ConfigurationEntries">
    <Columns>
      <Column Name="Key" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Value" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
    </Columns>
  </Table>
  <Table Name="DeviceCodes">
    <Columns>
      <Column Name="DeviceCode" DataType="String" RawType="TEXT" PrimaryKey="True" Length="0" Nullable="False" />
      <Column Name="UserCode" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="SubjectId" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="CreationTime" DataType="DateTime" Nullable="False" />
      <Column Name="Expiration" DataType="DateTime" Nullable="False" />
      <Column Name="Data" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
    </Columns>
    <Indexes>
      <Index Name="IX_DeviceCodes_DeviceCode" Columns="DeviceCode" Unique="True" PrimaryKey="True" />
      <Index Name="IX_DeviceCodes_UserCode" Columns="UserCode" Unique="True" />
    </Indexes>
  </Table>
  <Table Name="ExtendedApiResources">
    <Columns>
      <Column Name="Id" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ApiResourceName" DataType="String" RawType="TEXT" PrimaryKey="True" Length="0" Nullable="False" />
      <Column Name="NormalizedName" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Reserved" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Name="ApiNameIndex" Columns="ApiResourceName" Unique="True" PrimaryKey="True" />
      <Index Name="ApiResourceNameIndex" Columns="NormalizedName" Unique="True" />
    </Indexes>
  </Table>
  <Table Name="ExtendedClients">
    <Columns>
      <Column Name="Id" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="String" RawType="TEXT" PrimaryKey="True" Length="0" Nullable="False" />
      <Column Name="Description" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="NormalizedClientId" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="NormalizedClientName" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Reserved" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Name="IdIndex" Columns="ClientId" Unique="True" PrimaryKey="True" />
      <Index Name="ClientIdIndex" Columns="NormalizedClientId" Unique="True" />
      <Index Name="ClientNameIndex" Columns="NormalizedClientName" Unique="True" />
    </Indexes>
  </Table>
  <Table Name="ExtendedIdentityResources">
    <Columns>
      <Column Name="Id" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="IdentityResourceName" DataType="String" RawType="TEXT" PrimaryKey="True" Length="0" Nullable="False" />
      <Column Name="NormalizedName" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Reserved" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Name="IdentityNameIndex" Columns="IdentityResourceName" Unique="True" PrimaryKey="True" />
      <Index Name="IdentityResourceNameIndex" Columns="NormalizedName" Unique="True" />
    </Indexes>
  </Table>
  <Table Name="IdentityClaims">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Type" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="IdentityResourceId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="IdentityResourceId" />
    </Indexes>
  </Table>
  <Table Name="IdentityProperties">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Key" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Value" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="IdentityResourceId" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Columns="IdentityResourceId" />
    </Indexes>
  </Table>
  <Table Name="IdentityResources">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Enabled" DataType="Boolean" />
      <Column Name="Name" DataType="String" RawType="TEXT" Master="True" Length="0" Nullable="False" />
      <Column Name="DisplayName" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Description" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Required" DataType="Int64" RawType="INTEGER" />
      <Column Name="Emphasize" DataType="Int64" RawType="INTEGER" />
      <Column Name="ShowInDiscoveryDocument" DataType="Int64" RawType="INTEGER" />
      <Column Name="Created" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Updated" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="NonEditable" DataType="Int64" RawType="INTEGER" />
    </Columns>
    <Indexes>
      <Index Name="IX_IdentityResources_Name" Columns="Name" Unique="True" />
    </Indexes>
  </Table>
  <Table Name="PersistedGrants">
    <Columns>
      <Column Name="Id" DataType="Int32" RawType="INTEGER" Identity="True" PrimaryKey="True" />
      <Column Name="Key" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="Type" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="SubjectId" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="ClientId" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
      <Column Name="CreationTime" DataType="DateTime" Nullable="False" />
      <Column Name="Expiration" DataType="DateTime" Nullable="False" />
      <Column Name="Data" DataType="String" RawType="TEXT" Length="0" Nullable="False" />
    </Columns>
    <Indexes>
      <Index Columns="SubjectId,ClientId,Type" />
    </Indexes>
  </Table>
</Tables>
```

### 实体类

- 以`Client`为例，从数据库取出来的数据，要映射到[IdentityServer4.Models.Client](https://github.com/IdentityServer/IdentityServer4.Storage/blob/master/src/Models/Client.cs)这个类
- 上面 xml 实体生成的类是没有复杂类型的，比如`ClientSecrets`、`AllowedGrantTypes`等，所以需要手动添加，在生成的`Client.Biz.cs`中，拓展属性一栏添加缺失的部分属性：

```csharp
        #region 扩展属性

        /// <summary>
        /// Client secrets - only relevant for flows that require a secret
        /// </summary>
        public ICollection<Secret> ClientSecrets =>
            Entities.ClientSecrets.FindAllByClientId(Id)
            .Select(s => new Secret(s.Value, s.Description, s.Expiration)
            {
                Type = s.Type
            }).ToList();


        /// <summary>
        /// Specifies the allowed grant types (legal combinations of AuthorizationCode, Implicit, Hybrid, ResourceOwner, ClientCredentials).
        /// </summary>
        public ICollection<string> AllowedGrantTypes =>
            ClientGrantTypes.FindAllByClientId(Id)
                .Select(s => s.GrantType)
                .ToList();

        /// <summary>
        /// Specifies allowed URIs to return tokens or authorization codes to
        /// </summary>
        public ICollection<string> RedirectUris =>
            ClientRedirectUris.FindAllByClientId(Id)
                .Select(s => s.RedirectUri)
                .ToList();

        /// <summary>
        /// Specifies allowed URIs to redirect to after logout
        /// </summary>
        public ICollection<string> PostLogoutRedirectUris =>
            ClientPostLogoutRedirectUris.FindAllByClientId(Id)
                .Select(s => s.PostLogoutRedirectUri)
                .ToList();

        /// <summary>
        /// Specifies the api scopes that the client is allowed to request. If empty, the client can't access any scope
        /// </summary>
        public ICollection<string> AllowedScopes =>
            ClientScopes.FindAllByClientId(Id)
                .Select(s => s.Scope)
                .ToList();

        /// <summary>
        /// Specifies which external IdPs can be used with this client (if list is empty all IdPs are allowed). Defaults to empty.
        /// </summary>
        public ICollection<string> IdentityProviderRestrictions =>
            ClientIdPRestrictions.FindAllByClientId(Id)
                .Select(s => s.Provider)
                .ToList();

        /// <summary>
        /// Allows settings claims for the client (will be included in the access token).
        /// </summary>
        /// <value>
        /// The claims.
        /// </value>
        public ICollection<Claim> Claims =>
            ClientClaims.FindAllByClientId(Id)
                .Select(s => new Claim(s.Type, s.Value))
                .ToList();

        /// <summary>
        /// Gets or sets the allowed CORS origins for JavaScript clients.
        /// </summary>
        /// <value>
        /// The allowed CORS origins.
        /// </value>
        public ICollection<string> AllowedCorsOrigins =>
            ClientCorsOrigins.FindAllByClientId(Id)
                .Select(s => s.Origin)
                .ToList();

        /// <summary>
        /// Gets or sets the custom properties for the client.
        /// </summary>
        /// <value>
        /// The properties.
        /// </value>
        public IDictionary<string, string> Properties

        {
            get
            {
                var dic = new Dictionary<string, string>();
                var list = ClientProperties.FindAllByClientId(Id);
                foreach (var item in list)
                {
                    dic[item.Key] = item.Value;
                }

                return dic;
            }
        }

        #endregion
```

- 以上实体所有属性与`IdentityServer4.Models.Client`一一对齐，类型、名称、可访问性一致，确保转换不会出错
- 其它需要添加拓展属性的还有`ApiResources`、`ApiScopes`。完整例子在[IdentityServer4.XCode](https://github.com/xxred/IdentityServer4.XCode/tree/master/Entities)

## 储存层

- 这部分是 IdentityServer 中间件调用的部分，通过接口调用功能，比如`IClientStore`。这部分要做的就是实现`IStore`接口，从数据库查找客户端等数据并转换类型后返回，以供 IdentityServer 使用
- 实现接口，在程序启动时注入实现即可，比如`IClientStore`

```csharp
 /// <summary>
    /// Implementation of IClientStore thats uses XCode.
    /// </summary>
    /// <seealso cref="IdentityServer4.Stores.IClientStore" />
    public class ClientStore : IClientStore
    {
        private readonly ILogger<ClientStore> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="ClientStore"/> class.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <exception cref="ArgumentNullException">context</exception>
        public ClientStore(ILogger<ClientStore> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Finds a client by id
        /// </summary>
        /// <param name="clientId">The client id</param>
        /// <returns>
        /// The client
        /// </returns>
        public Task<Client> FindClientByIdAsync(string clientId)
        {
            var model = Clients.FindByClientId(clientId)?.ToModel();

            _logger.LogDebug("{clientId} found in database: {clientIdFound}", clientId, model != null);

            return Task.FromResult(model);
        }
```

- 注入到服务里面，除了`IClientStore`，还有`IDeviceFlowStore`、`IPersistedGrantStore`、`IResourceStore`

```csharp
        /// <summary>
        /// Configures XCode implementation of IClientStore, IResourceStore, and ICorsPolicyService with IdentityServer.
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <returns></returns>
        public static IIdentityServerBuilder AddXCodeConfigurationStore(
            this IIdentityServerBuilder builder)
        {
            builder.AddClientStore<ClientStore>();
            builder.AddResourceStore<ResourceStore>();
            builder.AddCorsPolicyService<CorsPolicyService>();

            return builder;
        }
```

## 使用

- 编译并引用[IdentityServer4.XCode](https://github.com/xxred/IdentityServer4.XCode)，并在项目文件`Startup.cs`的`ConfigureServices`方法添加如下注入代码

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

## 总结

- 本次整体看起来蛮简单的，但还是有不少坑。比如`PersistedGrants`类有个字段是`Key`，生成的拓展查询方法叫做`FindByKey`，让人误以为是根据 key 字段查找；还有个别表没有自增主键，导致批量删除方法失效
- 不足之处只要有，`IdentityServer`使用的模型中有可空类型如`int?`这种的，即 null 值有意义，但是 XCode 不能很好的表达这种设计，只得在初始化时给一定大小的初始值。另一个是 XCode 实体类拓展查询是静态方法，设置无法重载，要自定义某个查询，只能重载 store 类里面的方法，然后自己实现查询和转换
- 此实例参考[IdentityServer/IdentityServer4.EntityFramework.Storage](https://github.com/IdentityServer/IdentityServer4.EntityFramework.Storage)，由于 XCode 中没有上下文，所以去掉了上下文直接用静态类查询替代，未来有更好的方法再进行替换
