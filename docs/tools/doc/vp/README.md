# 使用vuepress注意事项

## 文件结构

- 每个文件夹分类下需要有一个`REAMDE.md`文件，文件名全大写，拓展名小写
- `REAMDE.md`将会生成`index.html`，所以md文件不要用`index`作为文件名

## 文件内容

- 每个md文件生成的html文件对应的标题是md文件的第一个标题，所以每个md文件都需要有一个标题

```markdown
# 标题

- 内容
```