# vs使用技巧

## 查找和替换之正则匹配替换

- `$1`、`$2`这种 `$+捕获位置` 的形式代替匹配到的结果
- 查找：`Request\[("\w+")\]`
- 替换：`Request.GetRequestValue($1)`
- 结果：`Request["name"]`=>`Request.GetRequestValue("name")`

## 调试源码

- http://www.cnblogs.com/tdfblog/p/debugging-asp-net-core-2-source.html