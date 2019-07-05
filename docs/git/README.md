# 基本操作

## 添加远程仓库

- git remote add github-origin https://github.com/xxred/xxred.github.io.git

## 添加本地分支关联远程分支

- git branch --set-upstream debug origin/debug

## 拉取所有

- `git clone --mirror ssh://git@url.git`
- `git config --bool core.bare false`

## 推送所有

- `git push --mirror origin`
