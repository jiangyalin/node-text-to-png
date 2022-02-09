const nodeTextToPng = require('./main')

const png = nodeTextToPng({
	text: '1测试测试测试测试2测试测试测试测试测试测试3测试测试测试4测试测试测试测试测试测试测试5测试测试测试测试6',
	mode: 'row',
	vertical: true
})

console.log('png', png)
