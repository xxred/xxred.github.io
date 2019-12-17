# 介绍

## Easy.Admin 是什么

- 这是一套基于 aspnetcore 的通用权限框架，前后端分离方式。仅包含用户、角色、菜单这三个功能。包含日志、orm、缓存、api 文档生成以及常用开发小工具。
- Easy.Admin 提供了基础设施如：异常拦截、统一响应结果、自定义模型绑定等。除此之外的功能大部分由[NewLifex.XCode](https://github.com/NewLifeX/X)提供。

## 特点

- 让你具有快速开发的能力，特别适合业务不太复杂，但又有管理需求的系统。
- 简单且方便，无论是直接使用还是扣代码，要撘一个开发框架，里面总有你想要的。
- 比如实现一个单表的 curd，只需要两步，视图用的公共模板，也可覆盖替换：
  - [添加实体](https://github.com/xxred/IdentityServer4.XCode/blob/master/Entities/aIdentityServer.xml#L175)，执行 tt 文件生成实体
  - [添加控制器](https://github.com/xxred/NewLife.IdentityServer4/blob/master/NewLife.IdentityServer4/Controllers/ClientsController.cs)

## 目标

- 现阶段提供基础的权限框架，愿景是站在巨人的肩膀上创新，将更多更强的组件组合搭配，打出更强的组合拳。后续会逐渐添加服务注册发现、配置中心、调用链路监控，容器化等功能。后期向微服务框架发展，从基础权限框架到微服务框架，覆盖范围由易到难

## 起步

- 分别克隆前后端项目，注意是克隆而不是下载，否则会给后面带来麻烦。

```bash
git clone https://github.com/xxred/Easy.Admin.git
git clone https://github.com/xxred/Easy.Front-End.git
```

- 趁着克隆期间，下载前端环境，[nodejs](https://nodejs.org/en/)，安装完之后验证 node 版本以及安装 yarn。

```bash
node -v
npm -v
npm install -g yarn
```

- 项目下载完之后，进入前端项目执行命令`yarn`还原前端项目包。
- 运行后端项目，后端项目会自动运行前端项目，因此要保证前端项目路径配置正确。配置位于 appsettings.Development.json 的`ClientAppSourcePath`项，去掉此项则不运行前端项目，前端项目可单独跑。
- 如果后端项目运行时代码报错 IIS 没有启用，请点击带有绿色图标运行按钮内右边的箭头，下拉选择 Easy.Admin 再运行。如果后端项目已经运行，swagger 能访问，页面不能访问且报错包含`npm`，请检查前端项目路径配置是否正确，以及是否还原前端项目包

## 前置学习参考

- 后端大部分功能包含在 NewLife.XCode，特别是数据库操作部分，系列教程参考：https://www.cnblogs.com/nnhy/p/xcode_curd.html
- 前端部分教程参考：https://juejin.im/post/59097cd7a22b9d0065fb61d2

## 例程参考

- 上文提到的添加控制器和公共模板，参考[NewLife.IdentityServer4](https://github.com/xxred/NewLife.IdentityServer4)
- 公共页面模板以及模板替换参考，[NewLife.IdentityServer4.Vue](https://github.com/xxred/NewLife.IdentityServer4.Vue)

## 包地址

- [![nuget:Easy.Admin](https://img.shields.io/nuget/vpre/Easy.Admin.svg?style=flat&label=Easy.Admin)](https://www.nuget.org/packages/Easy.Admin/)
- [![npm](https://img.shields.io/npm/v/@xxred/easy-front-end)](https://www.npmjs.com/package/@xxred/easy-front-end)
