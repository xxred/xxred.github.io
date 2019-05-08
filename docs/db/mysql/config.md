# mysql 相关配置

## 修改密码模式

- 8.0 版本，密码默认严格加密模式，修改为普通模式
  `ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password' PASSWORD EXPIRE NEVER;`

## 允许远程链接

- https://www.cnblogs.com/weifeng1463/p/7941625.html
