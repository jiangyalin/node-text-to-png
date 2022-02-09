# node-text-to-png
基于node的文本转png图片支持自动换行，竖排

## Building and Installing

```
npm install node-text-to-png
```

## Example

```
const nodeTextToPng = require('node-text-to-png')

const dataBuffer = nodeTextToPng({
    text: 'Hello World',
    mode: 'row',
    vertical: true
})

fs.writeFileSync('./test.png', dataBuffer)
```

##  Attributes

|参数       |说明         |类型            |可选值      |是否必填      |默认值     |
| ---------|:----------:|:--------------:|:--------:|:--------:|:---------:|
|text|内容|String|-|是|'测试'|
|mode|模式|String|paragraph(段落模式)/ row(行模式)|否|paragraph|
|vertical|是否为竖排|Boolean|-|否|false|

## License

MIT
