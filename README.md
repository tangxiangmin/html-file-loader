
html-file-loader
===

> 解决`html-webpack-plugin`中加载本地资源文件的问题

## Feature

* [x] html模板中的文件支持依赖分析并重写路径，内置支持匹配`script`、`img`、`link`、`audio`、`video`等多种标签
* [ ] 支持自定义标签属性及匹配规则，方便扩展诸如懒加载相关的需求
* [ ] 支持占位符__uri('xx')在文本中强制解析依赖文件，该api参考[fis3](http://fis.baidu.com/fis3/docs/user-dev/uri.html)

## 相关配置
```js
module: {
    rules: [
        {
            test: /\.(htm|html)$/i,
            loader: 'html-src-loader',
            options: {} // todo
        },
    ]
},
plugins: [
    new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './demo/index.html')
        }
    )
],
```

## 为什么需要自定义匹配规则
该loader主要借鉴了[html-withimg-loader](https://github.com/wzsxyz/html-withimg-loader)的一些思想，但是`html-withimg-loader`缺少对于自定义匹配规则的配置，由于原作者貌似已经停止维护了，无法提交PR，因此手动实现一个版本。

在图片懒加载等场景中，我们需要将实际资源保存在如`data-src`等属性上，则这些属性也是需要被解析依赖的。

进一步来说，如果我们需要某个常规的标签上也需要保存解析资源依赖，则自定义匹配规则可以很方便的进行扩展。
