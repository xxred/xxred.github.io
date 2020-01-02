# 后端使用介绍

- 后端主要是用了 NewLife.XCode 作为数据库操作工具，系列教程[在此](https://www.cnblogs.com/nnhy/p/xcode_initdata.html#autoid-3-0-0)（想要知道怎么添加一个表吗？修改 xml 文件即可得到表对应实体，使劲戳它）。在此基础上，结合 aspnetcore，添加身份认证、异常拦截处理、swagger 文档、自动生成菜单、vue 开发中间件等基础功能。

## 控制器设计

- 首先是`AdminControllerBase`，该类是控制器基类。特性上对应功能分别是路由设置、统一结果封装、Api 控制器声明、身份认证过滤、跨域设置。成员有：当前当前请求对应登录用户、是否超级管理员、处理成功结果返回，处理失败结果返回

  ```csharp
    /// <summary>
    /// 基类Api
    /// </summary>
    [Route("api/[controller]")]
    [ApiResultFilter]
    [ApiController]
    [ApiAuthenticateFilter()]
    [EnableCors]
    public class AdminControllerBase : ControllerBase
    {

        private IUser _appUser;

        /// <summary>
        /// 当前用户
        /// </summary>
        public IUser AppUser
        {
            get => _appUser ?? (_appUser = HttpContext.Features.Get<IUser>());
            set => _appUser = value;
        }

        /// <summary>
        /// 是否超级管理员
        /// </summary>
        public bool IsSupperAdmin => AppUser.Role.IsSystem;

        /// <summary>
        /// 返回可带分页的结果
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="data"></param>
        /// <param name="p"></param>
        /// <returns></returns>
        protected ApiResult Ok<TResult>(TResult data, PageParameter p = null)
        {
            return ApiResult.Ok(data, p);
        }

        /// <summary>
        /// 返回默认状态为402的结果
        /// </summary>
        /// <param name="msg"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        protected ApiResult Error(String msg = null, Int32 status = 402)
        {
            return ApiResult.Err(msg, status);
        }
    }
  ```

- 接着是实体`EntityController`，继承自`AdminControllerBase`，是个泛型类，只接受数据库实体。实体控制器包含列表搜索、单体查看、添加、更新、删除等基础功能，并用`ApiAuthorizeFilter`特性标记了权限。

  ```csharp
  /// <summary>
  /// 基类Api
  /// </summary>
  public class EntityController<TEntity> : AdminControllerBase where TEntity : Entity<TEntity>, new
  {
      /// <summary>
      /// 获取实体列表
      /// </summary>
      /// <param name="p">分页</param>
      /// <param name="key">搜索关键字</param>
      /// <returns></returns>
      [Route("Search")]
      [HttpPost]
      [ApiAuthorizeFilter(PermissionFlags.Detail)]
      [DisplayName("搜索{type}")]
      public virtual ApiResult<IList<TEntity>> Search([FromQuery]PageParameter p, [FromQuery]ring key){}

      /// <summary>
      /// 获取单对象
      /// </summary>
      /// <param name="id">对象id</param>
      /// <returns><see cref="T:TEntity" /></returns>
      [HttpGet("{id}")]
      [ApiAuthorizeFilter(PermissionFlags.Detail)]
      [DisplayName("查看{type}")]
      public virtual ApiResult<TEntity> Get([FromRoute]string id){}

      /// <summary>
      /// 添加
      /// </summary>
      /// <param name="value">需要添加的对象</param>
      [HttpPost]
      [ApiAuthorizeFilter(PermissionFlags.Insert)]
      [DisplayName("添加{type}")]
      public virtual ApiResult Post([FromBody]TEntity value){}

      /// <summary>
      /// 更新
      /// </summary>
      /// <param name="value">需要更新的对象</param>
      /// <returns></returns>
      [HttpPut]
      [ApiAuthorizeFilter(PermissionFlags.Update)]
      [DisplayName("更新{type}")]
      public virtual ApiResult Put([FromBody]TEntity value){}

      /// <summary>
      /// 删除
      /// </summary>
      /// <param name="id">需要删除对象的id</param>
      [HttpDelete("{id}")]
      [ApiAuthorizeFilter(PermissionFlags.Delete)]
      [DisplayName("删除{type}")]
      public virtual ApiResult Delete([FromRoute]string id){}

      /// <summary>
      /// 获取模型列信息
      /// </summary>
      /// <returns></returns>
      [HttpGet]
      [Route("GetColumns")]
      [ApiAuthorizeFilter(PermissionFlags.Detail)]
      [DisplayName("列信息{type}")]
      public virtual ApiResult<List<TableColumnDto>> GetColumns(){}
  }
  ```

## 使用

- 请确保完成了[NewLife.XCode](https://www.cnblogs.com/nnhy/p/xcode_initdata.html#autoid-3-0-0)系列教程
- 添加一个控制器很简单，新增实体之后，继承实体控制器就行，自带 curd，自动生成菜单，默认页面

  ```csharp
    /// <summary>
    /// 用户
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [DisplayName("用户")]
    public class UserController : EntityController<ApplicationUser>
    {
    }
  ```
