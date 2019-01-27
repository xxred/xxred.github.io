# 基于 Vuejs 的 vuido 十分钟 hello world

- 先介绍 vuido 相关技术
- 首先是 libui，[libui](https://github.com/andlabs/libui)是 C 语言实现的一个简单可移植的(但不是不灵活)GUI 库，其使用所支持的每个平台的本地 GUI 技术
- 然后 libui-node，[libui-node](https://github.com/parro-it/libui-node)是 libui 的 node 封装。
- 最后 vuido，[vuido](https://github.com/mimecorg/vuido) 使用 Vue.js 的本机桌面应用程序
- [安装文档](https://vuido.mimec.org/installation)

## 说明

- 本次演示说明仅限于 windows 操作系统
- 环境安装可能不会这么顺利，所以了解上面的知识可能有帮助
- vuido 依赖于 libui-node 库，libui-node 借助 nbind 将 c 连接到 node，安装 libui-node 的时候会有编译 c 代码的过程
- nbind 使用 node-gyp 库进行编译，node-gyp 是一个 C++模块编译工具，node-gyp 又用到了 python，并调用`Visual Studio Build Tools`编译代码
- 所以整个过程就是，先下载安装`windows-build-tools`和 c 依赖库，`libui-download`下载`libui`源码，执行`node-gyp configure build`开始编译，调用 python，然后是利用`Visual Studio Build Tools`编译 c 代码，链接到 node 得到`nbind.node`文件，由 vuido 调用
- 如果执行`node-gyp configure build`过程出错，尝试删除用户文件夹的`.node-gyp`文件夹，重新安装`npm uninstall --global node-gyp`,`npm install --global node-gyp`
- 避免权限不够，请用管理员权限打开命令行执行命令，相关文件下载在官网有

## 环境准备及运行

### 一、安装构建工具

- 执行`npm install --global --production windows-build-tools`，
  - 这个会下载安装 Python 和 Visual Studio Build Tools，如果 Python 下载失败可以手动安装，如果已经安装了，但是命令行执行`python`命令无效，可手动添加 python 路径到系统路径，我的下载过程也曲折，网络不好，多试了几次才下载完成
  - [python2.7.15](https://www.python.org/downloads/release/python-2715/)
  - [Visual Studio Build Tools](https://www.microsoft.com/en-us/download/details.aspx?id=48159)

```bash
PS F:\Downloads\Src\Test\vuido\my-project> npm install --global --production windows-build-tools

> windows-build-tools@5.1.0 postinstall C:\Users\12504\AppData\Roaming\npm\node_modules\windows-build-tools
> node ./dist/index.js



Downloading vs_BuildTools.exe
[>                                            ] 0.0% (0 B/s)
Downloaded vs_BuildTools.exe. Saved to C:\Users\12504\.windows-build-tools\vs_BuildTools.exe.

Starting installation...
Launched installers, now waiting for them to finish.
This will likely take some time - please be patient!

Status from the installers:
---------- Visual Studio Build Tools ----------
Successfully installed Visual Studio Build Tools.
------------------- Python --------------------
Python 2.7.15 is already installed, not installing again.

Now configuring the Visual Studio Build Tools..

All done!

+ windows-build-tools@5.1.0
added 145 packages from 98 contributors in 18.688s
```

- 下载安装[Visual C++ Redistributable Package for Visual Studio 2013](https://www.microsoft.com/en-us/download/details.aspx?id=40784)，用于 Visual Studio Build Tools 编译 c 代码

### 二、安装 vue 脚手架（3.x），初始化项目

- 安装 vue cli 工具`npm install --global @vue/cli @vue/cli-init`
- 初始化项目`vue init mimecorg/vuido-webpack-template my-project`

### 三、构建运行

- `npm install`

```bash
PS F:\Downloads\Src\Test\vuido\my-project> npm install

> libui-node@0.2.1 install F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node
> libui-download && autogypi && npm run build

Downloaded zip: C:\Users\12504\.libui\libui-shared-windows-x64-alpha3.5-master-008.tar.gz
Libui binaries extracted to: F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node

> libui-node@0.2.1 build F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node
> node-gyp configure build


F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node>if not defined npm_config_node_gyp (node "C:\Program Files\nodejs\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" configure build )  else (node "C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" configure build )
Warning: Missing input files:
F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node\build\Release\nbind.node
在此解决方案中一次生成一个项目。若要启用并行生成，请添加“/m”开关。
  Copying ../../../nbind/src/symbols.txt to Release\obj\nbind\\symbols.txt
  已复制         1 个文件。
  common.cc
  reflect.cc
  Color.cc
  EventLoop.cc
  Point.cc
  PointDouble.cc
  Size.cc
  SizeDouble.cc
  timer-common.cc
  Ui.cc
  UiBox.cc
  UiButton.cc
  UiCheckbox.cc
  UiColorButton.cc
  UiCombobox.cc
  UiControl.cc
  UiDateTimePicker.cc
  UiEditableCombobox.cc
  UiEntry.cc
  UiFontButton.cc
  UiForm.cc
  UiGrid.cc
  UiGroup.cc
  UiLabel.cc
  UiMenu.cc
  UiMultilineEntry.cc
  UiProgressBar.cc
  UiRadioButtons.cc
  UiSeparator.cc
  UiSlider.cc
  UiSpinbox.cc
  UiTab.cc
  UiWindow.cc
  AttributedString.cc
  FontAttribute.cc
  FontDescriptor.cc
  OpenTypeFeatures.cc
  BrushGradientStop.cc
  DrawBrush.cc
  DrawMatrix.cc
  DrawStrokeParams.cc
  DrawTextLayout.cc
  UiArea.cc
  UiAreaDrawParams.cc
  UiAreaHandler.cc
  UiAreaKeyEvent.cc
  UiAreaMouseEvent.cc
  UiDrawContext.cc
  UiDrawPath.cc
  libui_loop.cc
  timer.cc
  Buffer.cc
  Binding.cc
  win_delay_load_hook.cc
    正在创建库 F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node\build\Release\nbind.lib 和对象
   F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node\build\Release\nbind.exp
  nbind.vcxproj -> F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node\build\Release\\nbi
  nd.node
  Copying F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node/build/Release/nbind.node to
   F:\Downloads\Src\Test\vuido\my-project\node_modules\vuido\node_modules\libui-node\nbind.node
  已复制         1 个文件。
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN vue-loader@15.6.1 requires a peer of css-loader@* but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.7: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 85 packages from 89 contributors and audited 7559 packages in 83.378s
found 0 vulnerabilities

PS F:\Downloads\Src\Test\vuido\my-project> npm install start
npm WARN deprecated start@5.1.0: Deprecated in favor of https://github.com/deepsweet/start
npm WARN vue-loader@15.6.1 requires a peer of css-loader@* but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.7: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ start@5.1.0
added 1 package from 1 contributor and audited 7560 packages in 8.628s
found 0 vulnerabilities

PS F:\Downloads\Src\Test\vuido\my-project> npm install
npm WARN vue-loader@15.6.1 requires a peer of css-loader@* but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.7: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

audited 7560 packages in 6.112s
found 0 vulnerabilities
```

- 构建`npm run build`，运行`npm start`，到这里一般没什么问题了

## 打包

- 打包工具[launchui-packager-gui](https://github.com/mimecorg/launchui-packager-gui)，这个工具是基于 Vuido，所以上面能跑，这个应该也可以，打包完之后就可以得到可执行的 exe 执行文件

## 总结

- 第一次总是不会那么顺利，根据错误提示做各种猜测，不断尝试去解决，经过几分钟的折腾 hello world 终于跑起来，可能有的人更快，可能有的人一天也搞不定，可能有的人电脑的环境啥都装有了，但是
- 只有了解整个过程，知根知底，才能对症下药，百发百中，整理之后有了更深的认识，希望能帮助到初学的同学
