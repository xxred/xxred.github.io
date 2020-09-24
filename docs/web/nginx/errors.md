# 常遇到的错误

- 如无特殊说明，均指反向代理中遇到的问题。

## 400 bad request

### post put 数据错误

- post、put 方法传递数据时，返回 400
- 原因，代理设置头有这一行 `proxy_set_header Connection "upgrade";`，这一行将原本的 http1.1 请求升级成为 websocket
- 解决，删除即可
- 参考[nginx 反向代理，400 bad request 解决记录（websocket）](https://blog.csdn.net/u011655220/article/details/79583341)、[WebSocket proxying](http://nginx.org/en/docs/http/websocket.html)
