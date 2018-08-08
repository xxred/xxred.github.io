# 微软开源的文档工具

[TOC]

## 什么是DocFX

DocFX是.NET的API文档生成器，目前支持C＃和VB。它从源代码中的三重斜杠注释生成API参考文档。它还允许您使用Markdown文件创建其他主题，如教程和操作方法，以及自定义生成的参考文档。 DocFX从源代码和Markdown文件构建静态HTML网站，可以轻松地托管在任何Web服务器上（例如，github.io）。此外，DocFX还可以灵活地通过模板自定义网站的布局和样式。如果您有兴趣使用自己的样式创建自己的网站，可以按照如何创建自定义模板 创建自定义模板。

DocFX还具有以下很酷的功能：

- 与您的源代码集成。您可以单击API上的“查看源”以导航到GitHub中的源代码（您的源代码必须推送到GitHub）。
- 跨平台支持。我们有一个在Windows上本机运行的exe版本，在Mono上它也可以在Linux和macOS上运行。
- 与Visual Studio集成。您可以在Visual Studio中无缝使用DocFX。
- 降价扩展。我们引入了DocFX Flavored Markdown（DFM）来帮助您编写API文档。DFM 与GitHub Flavored Markdown（GFM）100％兼容，具有一些有用的扩展，如文件包含，代码片段，交叉引用和yaml标头。有关DFM的详细说明，请参阅[DFM](http://dotnet.github.io/docfx/spec/docfx_flavored_markdown.html)。

## 一些教程资源

- [官网](http://dotnet.github.io/docfx/)
- [docfx 做一个和微软一样的文档平台](https://blog.csdn.net/lindexi_gd/article/details/78661304)
- [种子项目（与AppVeyor集成的示例）](https://github.com/docascode/docfx-seed)

## 基础搭建，配合appveyor部署

- [安装docfx(官网比较慢我自己克隆了一份教程)](https://xxred.gitee.io/docfx/tutorial/docfx_getting_started.html#2-use-docfx-as-a-command-line-tool)
- [命令使用](https://xxred.gitee.io/docfx/tutorial/docfx.exe_user_manual.html)

### 创建并运行docfx

- 首先在github上创建一个项目，然后克隆到本地，方便后面直接提交，并且也需要用到这个地址
- 命令行执行`docfx init`，感受一下都有什么配置
- 最后会产生一个项目`docfx_project`，然后执行`docfx docfx_project\docfx.json --serve`
- 顺利的话，访问[http://localhost:8080](http://localhost:8080)就可以看到结果了

### appveyor文件配置

- 在`docfx_project`文件夹创建文件`appveyor.yml`
- 粘贴以下内容

```yml
environment: # 环境变量，在这里声明，下面使用
  op_build_user: "OpenPublishBuild"
  op_build_user_email: "vscopbld@microsoft.com"
  access_token:
    secure: bCtIcPHYlrOYLppEVAH8R4VZpAWou5dKlDhbEPyXfgmI9wEMvH4MD0fFXYrv5sLS

image: Visual Studio 2017 # 镜像，也就是所依赖的环境
init: # 初始化
  - git config --global core.aurocrlf true #自动完成标准化与转换（CRLF 与 LF 自动转换）
  
install: #
    # 以下通过choco安装docfx
  - ps: |
        if(-Not $env:APPVEYOR_PULL_REQUEST_TITLE)
        {
            git checkout $env:APPVEYOR_REPO_BRANCH -q
            choco install docfx -y
            # choco install nuget.commandline -y
        }
build_script: # 构建生成
  - ps: |
        if(-Not $env:APPVEYOR_PULL_REQUEST_TITLE)
        {
            #-----------利用docfx命令生成html-----------------------------------------------------start
            # & nuget install docfx.console -Version 2.18.4 -Source https://www.myget.org/F/docfx/api/v3/index.json
            # & docfx.console.2.18.4\tools\docfx docfx.json
            & docfx docfx.json
            if ($lastexitcode -ne 0){
              throw [System.Exception] "docfx build failed with exit code $lastexitcode."
            }
            #-----------利用docfx命令生成html-------------------------------------------------------end
        }
# 编译.net项目，这里暂时用不到，先注释
#  - msbuild src/SampleClass1/SampleClass1.sln

on_success: # 成功构建之后部署
    # 以下就是配置git账号和token，将最终生成的html部署（提交）到你的站点（仓库），
  - ps: |
        if(-Not $env:APPVEYOR_PULL_REQUEST_TITLE)
        {
            #-----------配置git账号信息，使用到的就是上面的环境变量----------------------------------start
            git config --global credential.helper store
            Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:access_token):x-oauth-basic@github.com`n"
            git config --global user.email $env:op_build_user_email
            git config --global user.name $env:op_build_user
            #-----------配置git账号信息，使用到的就是上面的环境变量------------------------------------end

            #-----------这里就是部署的地方，克隆你项目的pages分支，复制生成的html然后提交--------------start
            git clone https://github.com/xxred/docfx-example.git -b gh-pages origin_site -q
            Copy-Item origin_site/.git _site -recurse
            CD _site
            git add -A 2>&1
            git commit -m "CI Updates" -q
            git push origin gh-pages -q
            #-----------这里就是部署的地方，克隆你项目的pages分支，复制生成的html然后提交----------------end
        }
```

- 以上`access_token`那里换成自己的，怎么来的呢？首先[创建一个](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)，[然后加密](https://ci.appveyor.com/tools/encrypt)
- token这个我有想到，直接提交在源码这里岂不是大家都能拿来用？后面看看原来有个加密，appveyor使用的时候再解密，所以上面`$($env:access_token)`还有个`$()`包着，所以可以放心的将一些私密性的字符加密再放上去。
- 倒数大概七行这样子，`git clone`后面的地址换成自己的地址，因为再下面需要提交，没错，利用上面的access_token作为身份证
- 上面只有两个操作，更多操作请移步[官网](https://www.appveyor.com/docs/build-configuration/)，了解整个过程

### 提交

- 将`docfx_project`项目里面的文件剪切到你克隆下来的项目的根目录，相当于去掉`docfx_project`文件夹，然后提交
- 创建一个分支`gh-pages`用来发布静态文件，避免跟源文件同一个分支

```bash
git branch gh-pages
git checkout gh-pages
git push origin gh-pages
git checkout master
```

### appveyor最后配置

- 打开[appveyor官网](https://ci.appveyor.com)，并使用github账号直接登陆
- 找到并点击`projects`
- 接着点击`NEW PROJECT`，在github那一栏，选择上面创建的项目，鼠标放在上面并点击`Add`
- 然后再选择的这个项目的面板，点击`NEW BUILD`

### 更多

- [环境变量](https://www.appveyor.com/docs/environment-variables/)