const { createCanvas } = require('canvas')
const fs = require('fs')

// paragraph 段落模式， row 行模式
/*
* vertical 是否为竖排
* */
const main = (
	{
		text = '',
		fontSize = 24,
		mode = 'paragraph',
		vertical = false,
		width = 200,
		height = 200
	}
) => {
	const lineHeight = fontSize * 1.2
	const checkCanvas = createCanvas(width, height)
	const checkCtx = checkCanvas.getContext('2d')
	checkCtx.font = fontSize + 'px Arial'
	let canvas = {}

	// 段落模式
	if (mode === 'paragraph') {
		canvas = createCanvas(width, height)
		const ctx = canvas.getContext('2d')
		// ctx.fillStyle = 'rgba(255, 255, 255, 1)'
		// ctx.fillRect(0, 0, width, height)

		// const imgData = ctx.getImageData(0, 0, 200, 200)

		const textToPng = (text = '测试', width = 200, height = 200) => {
			const getRowText = (text, width = 200, rowText = '') => {
				const rowLength = Math.floor(text.length / 2)
				const _text = text.substring(0, rowLength)
				const thisRowWidth = checkCtx.measureText(rowText + _text).width
				const beyondRowWidth = checkCtx.measureText(rowText + text.substring(0, rowLength + 1)).width
				if ((thisRowWidth <= width && beyondRowWidth > width) || text.length <= 1) {
					return rowText + _text
				} else {
					let _rowText = rowText
					if (thisRowWidth <= width) {
						_rowText += _text
						return getRowText(text.substring(rowLength), width, _rowText)
					} else {
						return getRowText(_text, width, _rowText)
					}
				}
			}

			ctx.font = fontSize + 'px Arial'
			ctx.fillStyle = 'rgba(0, 0, 0, 1)'
			let buoy = 0
			for (let i = 0; i < Math.floor(height / lineHeight); i++) {
				const _text = getRowText(text.substring(buoy), 200 - 20)
				buoy += _text.length
				ctx.fillText(_text, 0, (i + 1) * lineHeight - 5)
				if (buoy === text.length - 1) i = Math.floor(height / lineHeight)
			}
		}

		textToPng(text, width)
	}

	// 行模式
	if (mode === 'row' && !vertical) {
		const _width = checkCtx.measureText(text).width
		canvas = createCanvas(_width, lineHeight)
		const ctx = canvas.getContext('2d')
		ctx.font = fontSize + 'px Arial'
		ctx.fillStyle = 'rgba(0, 0, 0, 1)'
		ctx.fillText(text, 0, lineHeight - 5)
	}
	if (mode === 'row' && vertical) {
		canvas = createCanvas(fontSize, lineHeight * text.length)
		const ctx = canvas.getContext('2d')
		// ctx.fillStyle = 'rgba(255, 255, 255, 1)'
		// ctx.fillRect(0, 0, fontSize, lineHeight * text.length)
		ctx.font = fontSize + 'px Arial'
		ctx.fillStyle = 'rgba(0, 0, 0, 1)'
		text.split('').forEach((font, index) => {
			ctx.fillText(font, 0, (index + 1) * lineHeight - 5)
		})
	}

	const data = canvas.toDataURL('image/png', 1)
	const path = './test.png'
	const base64 = data.replace(/^data:image\/\w+;base64,/, '')
	const dataBuffer = new Buffer(base64, 'base64')
	// fs.writeFileSync(path, dataBuffer)
	return dataBuffer
}

module.exports = main
