# 搭建一个简易的vue项目

## 环境搭建

- node.js
  - 使用chocolatey安装`choco install nodejs`
  - 安装[chocolatey](https://chocolatey.org/install)
- webpack
  - `npm install webpack -g`
- vue-cli脚手架
  - `npm install vue-cli -g`

## 初始化项目

- vue-cli构建
  - `vue init webpack project`
  - 安装提示输入即可
- 安装依赖
  - `npm install`
- 运行
  - `npm run dev`
  - 完成之后访问[http://localhost:8080](http://localhost:8080)

## 添加loader

- [loader文档](https://webpack.docschina.org/concepts/loaders/)
- 通过加载器配置，告诉webpack打包的时候如何处理某个文件
- 比如加载css
  - 安装加载器`npm install --save-dev style-loader css-loader`
  - `webpack.config.js`添加配置

```js
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };

```

- 添加其他加载器同理
- 注意
  - 如果是在script中使用import 'xx.css'，可用`extract-text-webpack-plugin`插件抽离出来
  - 有的时候出现`Module build failed: Unknown word (1:1)  removed by extract-text-webpack-plugin`这个错
  - 在script中这样导入会很严格，如果找不到css里面引用的图片会编译不通过
  - 所以不建议在script里面引用css，那样打包css到js里面，也不方便维护，如果实在需要，则使用`extract-text-webpack-plugin`插件

## 配置别名和拓展名

- 使用别名可以简化路径访问，配置拓展名引入文件可以不写拓展名
- `webpack.config.js`中添加配置

```js
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
```

## eslint检查设置

- 有时候格式检查太过严格，需要设置排除项，比如排除`test1`文件夹
  - `.eslintignore`文件里面直接配置，把排除的文件夹写上去
  - 或者`webpack.config.js`中添加配置

```js
  module: {
    rules: [
         test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src'), resolve('test')],
+            exclude: [resolve('src/test1')],
            options: {
              formatter: require('eslint-friendly-formatter'),
              emitWarning: !config.dev.showEslintErrorsInOverlay
            }
    ]
  }
```

## 将某个模块设置为全局变量

- 比如兼容jquery的时候，可以将jquery注入到全局变量访问
- `webpack.config.js`中添加配置

```js
plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      'window.$666': 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
```

- 注意：
  - js使用jquery的名称需要与上面的配置的一样，才能被替换
  - 打包生成之后生成的代码，引用`$`的地方会被替换为`__webpack_provided_window_dot_$`，如果是在eval函数里面使用，那么不会被识别，因此执行的时候仍然会报找不到错