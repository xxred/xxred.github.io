# 前端调试

## 前言

- 当我第一次知道这种东西，我也惊呆了，居然还有这种操作，实在强大到没朋友，从此爱上调试，按时下班
- 无数次通过调试解决问题的经验告诉我，调试绝对是开发者最应该掌握的重要技能之一。调试能帮助我们定位问题解决问题，每解决一个问题，经验值就往上涨。后面就可以考经验解决很多问题，并且能正确避开当年踩过的雷区，减少再犯次数，节省解决问题的时间，大大提高开发效率和编码水平。我想这应该是掌握调试技能的一个很重要意义，而不仅仅是为了解决问题
- 你是否遇到过以下情况：
  1. 按钮的点击事件不起作用，点击按钮没反应。下载人家的demo运行，点击登录之后不出错页面也不跳转
  2. 请求数据后填充到页面，但是页面却不显示数据
  3. 某个请求总是被取消
  4. 明明按照人家教程来写，代码一模一样，却得不到和教程一样的效果
  5. 无意中写错字母，大小写部分，运行出错，但是看代码怎么都看不出问题
  6. 按照文档的写法，控制台老是报错，且错误发生在使用的组件里面，不是自己写的代码
  7. 等等，还有很多类型的问题
- 以上问题基本都可以通过调试解决，只需要掌握相关的调试技巧就可以

## 断点

- 调试的第一步就是打断点。断点的目的是，代码运行时在你想要开始调试的地方停下来。这个时候就可以查看当前上下文信息，比如全局变量、局部变量的值，函数的输入是否正确，请求的返回值是否正常等。通过此操作判断问题发生的地方，好对症下药
- 以[谷歌浏览器](https://www.google.cn/chrome/index.html)（版本为69）为例，编辑器为[VSCode](https://code.visualstudio.com/)（版本1.26.1）

### 断点方式一

- 这种方式是比较常用的方式，在浏览器开发工具找到对应源码，在script脚本节点里面的代码行断点

![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908164523349-1511998750.png)

- 首先在浏览器页面按F12打开开发工具，点击`Sources`选项，默认显示的是`Page`标签。然后找到需要调试的源码文件
- 如果是正常html页面，那么源码一般是在对应域名下面。如果是`webpack`处理的页面，并且开启了源码映射，源码就是在`webpack://`下面。可通过快捷键`ctrl+ o`打开搜索框输入文件名搜索源码
- 只要找到源码，在脚本代码显示区域左边的数字上添加断点即可，之后只要代码运行到断点处，开发工具就会进入调试状态
- **注意**：有的数字行是灰色的，就是不可断点。有时候点击15行断点选中14行，这是因为浏览器真正执行的代码行不是你看到的那一行，可能是优化掉了或者经过某种转换。还有的情况是，添加某一行断点，会跳转到另一个页面并命中某一行,这个页面的背景色是黄色且文件名是`VM`开头。上述情况，大部分都是因为浏览器显示的源码版本，跟真正的源码文件不一致，只需要刷新一下页面，保证显示的源码是最新的即可

![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908172829771-1566985050.png)

- **技巧1**：有时候源码历经千辛万苦都找不到在哪，这时候就需要祭出`console.log`了。在需要调试的那一行代码前加上`console.log(666)`,然后运行一次，到控制台查看结果输出，点击右边的链接会自动跳转到源码，这样就可以直接断点了

![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908171746677-1995428598.png)

- **技巧2**：如下图，在`Filesystem`添加文件夹到工作路径，选择之后会有提示，点击接受。如果你的谷歌浏览器没有这玩意，请升级版本，还是没有的话，请忽略这段话。虽然不知道这是什么时候出的功能，但是我偶然发现的，它可以编辑之后真的保存到文件，这个可以当编辑器用了。

![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908224342404-1314488285.png)

### 断点方式二

- 这种方式很粗暴，在需要调试的地方加`debugger`关键字，代码运行到的时候会自动停下，进入调试模式
- 此方法不需要手动断点，但是麻烦的是可能你调试一次就不用再调试了，但是每次运行到那里都会停下，必须移除这个代码才行
- 这玩意我在不少网站也见到有人用，不想让人家方便的查看到网站源码，一打开控制台就自动debugger

![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180908175702361-1255694529.png)

### 断点方式三

- 这种方式简单归为在编辑器中断点调试，是需要连接调试器（可以是远程调试器）或者附加进程，然后接收调试信息，就可以在编辑器源码进行断点调试
- **在Chrome和VS Code中调试Vue.js**：[此方法出处](https://github.com/Microsoft/vscode-recipes/blob/master/vuejs-cli/README.md)。这种方式使用`VSCode`的“Debugger for Chrome”扩展，**推荐**。感觉就是上面的第一种方式，只不过将源码映射到本地源码，并在编辑器上显示。简单介绍下步骤：
  1. webpack配置：`webpack`配置添加`devtool：'source-map'`开启源码映射。

```javascript
// Vue CLI 3.X
module.exports = {
  configureWebpack: {
    devtool: "source-map"
  }
};
```

  2. 调试配置：VSCode中按F5，将出现选择环境的输入框（如果已有`launch.json`不会出现），选择Chrome。在`launch.json`中的配置如下。其中`url`是打开浏览器之后访问的地址，`webRoot`是`app.js`、`main.js`等入口文件所在目录，后面两个是实验性功能（高级功能，鼠标悬停在上面会有说明）

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "启动 Chrome 并打开 localhost",
            "url": "http://localhost:8080",
            "webRoot": "${workspaceFolder}/src",
            "breakOnLoad": true,
            "sourceMapPathOverrides": {
                "webpack:///src/*": "${webRoot}/*"
            }
        }
    ]
}
```

  3. 调试：在vue文件组件你想调试的行的断点，通过命令`npm start`、`npm dev`或者`npm serve`其中一个命令（具体是哪一个可以查看`package.json`的`scripts`节点）运行项目
  4. 按`F5`启动调试，一切正常的话将会命中你的断点
  5. **注意**：如果没有命中断点并且你的断点不是红点，需要一个骚操作才能在`VSCode`断点调试：在打开的谷歌浏览器的开发工具源码断点调试一次（或者加关键字`debugger`触发调试,参考上面方式一），运行到断点处`VSCode`会自跳出一个缓存的源码页来进行调试。另外，基于以上情况，如果在`VSCode`调试的显示的源码跟真的源码不同，那么就是源码映射不正确，上面的配置`webRoot`不正确。即使不正确，通过这个骚操作一样可以在`VSCode`调试，就是不太优雅，效果如下：

![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180909010532460-655205794.png)
![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180909011059744-544155148.png)

- **远程调试Chrome**
  - 附加浏览器的方式，不同于上一种，修改代码后要刷新页面才能重新断点调试
  - 待更新

### 断点方式四

- 这种方式归为调试nodejs,可以调试`webpack`配置，或者后端运行的node实例。
- 这种方式是在启动node的时候加上`--inspect`，开启V8 Inspector功能，通过`WebSockets`通信，调试器连接即可调试，更多调试器参考[官方文档](https://nodejs.org/en/docs/guides/debugging-getting-started/)。以下是几个示例：
  - 调试`vue.config.js`，可以在调试查看配置，这样即使看不懂文档也可以按照自己的想法来写配置，甚至根本不用在看文档。使用方式是在`VSCode`配置如下，两种配置等效。调试`webpack.config.js`同理，将启动文件替换即可，可查看`package.json`的`scripts`节点对应命令确定启动文件

  ```json
  {
     "version": "0.2.0",
     "configurations": [
         {
             "type": "node",
             "request": "launch",
             "name": "Launch Program",
             "args": [
                 "serve"
             ],
             "program": "${workspaceFolder}  /node_modules/@vue/cli-service/bin/v  ue-cli-service.  js"//client-app/src/aspnet-dev.js"
         },
         {
             "type": "node",
             "request": "launch",
             "name": "Launch via NPM",
             "runtimeExecutable": "node",
             "runtimeArgs": [
                 "--inspect-brk=9229",
                 ".  /node_modules/@vue/cli-service/b  in/vue-cli-service.js",  //"./client-app/src/aspnet-dev.  js",
                 "serve"
             ],
             "autoAttachChildProcesses": true,
             "port": 9229
         }
      ]
  }
  ```

  ![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180910040023820-923469508.png)

  - 调试aspnetcore的NodeServices其中一种[打开方式](https://github.com/aspnet/JavaScriptServices/issues/1524#issuecomment-418785756)，这个可以在`VSCode`进行调试，调试器由`VSCode`提供，不会自动连接，有点麻烦，建议用下一种，方便。
  - 如果用谷歌浏览器的开发工具做调试器，可以尝试[插件nim](https：//chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj)，启动node或自动打开标签页。或者谷歌浏览器自带的，在`Connection`处添加连接，检测到信号会自动连接，在Filesyatem添加需要调试的源码即可。如果浏览器连接了node环境的站点，并且启用了Inspector，那么开发工具会有一个图标可以快速打开node调试器

![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180910034021921-543136384.png)
![ ](https://images2018.cnblogs.com/blog/1057748/201809/1057748-20180910034753985-2108365859.png)

## 其他参考（按推荐指数排列）

- [一探前端开发中的JS调试技巧](http://seejs.me/2016/03/27/jsdebugger/)（推荐看一看，找了一圈才找到这个原创地址）
- [有哪些 JS 调试技巧？](https://www.zhihu.com/question/20260762)
- [使用Visual Studio Code的“Debugger for Chrome”扩展](https://github.com/aspnet/JavaScriptServices/tree/master/src/Microsoft.AspNetCore.SpaServices#using-visual-studio-codes-debugger-for-chrome-extension)
- [vuejs官方文档：在 VS Code 和 Chrome 中调试](https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html)
- [Node.js的V8 Inspector集成](https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js)
- [Node.js调试指南](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [在VSCode中调试](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)
- [vuejs论坛相关讨论](https://forum.vuejs.org/t/debugging-vue-files-with-visual-studio-code/8022)
- [调试程序时，设置断点的原理是什么？](https://zhuanlan.zhihu.com/p/34003929)