# 使用 TypeScript 开发 electron

- 本文尝试根据官方示例，使用 TypeScript 开发基于 electron 的桌面应用
- 官方示例 https://github.com/electron/electron-quick-start-typescript

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start-typescript
# Go into the repository
cd electron-quick-start-typescript
# Install dependencies
npm install
# Run the app
npm start
```

## 遇到的问题

- 中间可能由于网络问题，electron 依赖下载错误，如果`npm install`执行成功，`npm start`失败，考虑删掉`node_modules`文件夹重新安装依赖

## 分析

- 查看 build 之后的 dist 文件夹，实际上是将 ts 文件编译成了 js 文件
  ![图片描述](http://img.mukewang.com/5c7811350001276f03870237.png)
- 运行的时候再调用 electron 运行 build 之后的 js 文件

## 运行结果

- 最终跑起来是这样子的

![图片描述](http://img.mukewang.com/5c7813550001b3ea09550427.png)

## 手动搭建工程

- 从零开始运行第一个 electron 应用，从 hello world 到打包发布
- 参考[打造你的第一个 Electron 应用](https://electronjs.org/docs/tutorial/first-app)

### 初始化工程

- 没安装[yarn](https://yarnpkg.com/zh-Hant/)的话，首先全局安装
- 选择`yarn`，因为它可以更好地处理依赖关系，并可以使用`yarn clean`帮助减少最后构建文件的大小

```bash
npm install -g yarn
```

- 初始化一个空项目

```bash
yarn init
```

### 安装依赖

- 首先安装 electron，electron 包会通过`electron-download`包来下载相关文件，会访问`https://github.com/electron/electron/releases/`获取相关文件，大部分情况会由于网络问题无法下载，此时就需要通过设置 electron 镜像解决，参考[安装 Electron](https://electronjs.org/docs/tutorial/installation)
- win 用户添加环境变量`ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"`，可使用 powershell，快速设置临时环境变量，此环境变量只在本次生效

```powershell
$env:ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
```

```powershell
yarn add -D electron
```

```powershell
yarn add -D typescript
```

### 设置脚本和页面内容

- `package.json`配置文件节点`scripts`添加一个脚本，指定入口文件为`main.js`，ts文件最终会编译为js文件，所以指定入口文件为js文件即可

```json
  "main": "main.js",
  "scripts": {
    "start": "tsc main.ts && electron main.js"
  }
```

- 新建`main.ts`和`index.html`文件，内容分别如下

main.ts

```typescript
const { app, BrowserWindow } = require("electron");
import * as path from "path";

let win;

function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({ width: 600, height: 800 });

  //然后加载app的index.html
  let indexPath = path.join(__dirname, "index.html");
  win.loadFile(indexPath);

  win.webContents.openDevTools();

  // 当 window 被关闭，这个事件会被触发。
  win.on("closed", () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null;
  });
}

app.on("ready", createWindow);

// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>
  </head>

  <body>
    <h1>Hello World!</h1>
    We are using node
    <script>
      document.write(process.versions.node);</script>, Chrome
    <script>
      document.write(process.versions.chrome);</script>, and Electron
    <script>
      document.write(process.versions.electron);</script>.
  </body>
</html>
```

### 运行

- 一切准备就绪，运行即可看到跑起来的应用
- 注意记得加上在退出应用时执行`app.quit()`，否则会有部分进程无法退出，一直锁定文件，无法重新打包发布运行

```bash
yarn start
```

### 打包

- 参考[分发应用](https://electronjs.org/docs/tutorial/application-distribution)
- 推荐使用[electron-builder](https://github.com/electron-userland/electron-builder)，打包好可安装程序，带自动更新功能，如果第一次安装，由于网络原因下载资源失败，可先使用[electron-packager](https://github.com/electron-userland/electron-packager)
- 安装`electron-builder`，并设置脚本，添加pack、dist脚本

```bash
yarn add -D electron-builder
```

```json
  "scripts": {
    "build": "tsc main.ts",
    "start": "tsc main.ts && electron main.js",
    "pack": "yarn build && electron-builder --dir",
    "dist": "yarn build && electron-builder",
  }
```

- 执行打包

```bash
yarn dist
```

- 最终打包好的应用在dist文件夹，`win-unpacked`文件夹则是发布的应用，直接打开`electron.exe`即可运行应用

### 项目结构

- 最终项目的结构

![ ](http://img.mukewang.com/5c7a468500014cd303870407.png)

## 总结

- 想要高效开发颜值高的应用，还得搭配好的模板，这里推荐[electron-vue](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/getting_started.html)
- [相关资源](https://github.com/sindresorhus/awesome-electron)，建议通读[官方文档](https://electronjs.org/docs)，写的很好，提供的资源也多
-只有自己动手从零开始实践，才会收获得更多！