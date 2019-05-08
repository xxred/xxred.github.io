# SqlServer 相关

## 连接字符串配置

- [ConnectionString 源码](https://github.com/dotnet/corefx/blob/master/src/System.Data.SqlClient/src/System/Data/SqlClient/SqlConnectionString.cs)，里面有所有的配置以及默认值

## 报错

### Failed to generate SSPI context.

- `Trusted_Connection=True;`设置为`Trusted_Connection=False;`
