function _main(canvasDom, width, height){
	let canvas = document.querySelector(canvasDom)
	let context = canvas.getContext('2d')
	
	let images = {
		ball: 'images/ball.png',
        block: 'images/block.png',
        box: 'images/box.png',
        down: 'images/down.png',
        left: 'images/left.png',
        right: 'images/right.png',
        up: 'images/up.png',
        wall: 'images/wall.png',
        boxBall: 'images/boxBall.png',
	}
	let game = new Game(canvas)
	initImages(images, game)
}

function initImages(images,game){
	// 预加载所有图片
	let loads = [];
	let imgNames = Object.keys(images)
	for(let i = 0;i<imgNames.length;i++){
		let name = imgNames[i]
		let path = images[name]
		let img = new Image()
		img.src = path
		img.onload = function(){
			images[name] = img 
			loads.push(1)
			if(loads.length == imgNames.length){
				game.images = images
				game.init()
			}
		}
	}
}