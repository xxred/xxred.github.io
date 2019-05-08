# nginx 在 docker 中使用

- nginx 跑在 docker 中，如何代理其它容器的服务？不能直接访问到其它容器或者主机其他端口，所以所有反向代理必须明确指定个容器 ip 和端口。但是容器重启后 ip 可能更改，所以需要动态生成代理配置
- http://dockone.io/article/297
