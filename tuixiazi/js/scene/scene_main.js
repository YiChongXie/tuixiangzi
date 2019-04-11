class SceneMain extends Scene{
    constructor (game){
        super(game)
        this.level = 1
        this.man = new Man('down')
        this.paused = false
        this.keydown = (event) => {
            let k = event.key
            if (!this.paused){
                if (k == 'ArrowUp'){
                    this.man.moveUp(this.map)
                    this.refresh(this.map)
                }
                if (k == 'ArrowDown'){
                    this.man.moveDown(this.map)
                    this.refresh(this.map)
                }
                if (k == 'ArrowLeft'){
                    this.man.moveLeft(this.map)
                    this.refresh(this.map)
                }
                if (k == 'ArrowRight'){
                    this.man.moveRight(this.map)
                    this.refresh(this.map)
                }
                if (k == 'r'){
                    this.loadLevel (this.level)
                }
            }
        }
    }
    // 场景初始化
    init (){
        // 加载地图
        log('scene init')
        this.loadLevel(this.level)
        // 添加监听事件
        window.addEventListener('keydown', this.keydown)
    }
    loadLevel (level){
        let canvas = this.game.canvas
        this.game.context.clearRect(0, 0, canvas.width, canvas.height)
        level--
        // this.map = this.maps[level]
        this.map = new Array()
        for (let i = 0; i < this.maps[level].length; i++){
            this.map[i] = new Array()
            for (let j = 0; j < this.maps[level][i].length; j++){
                this.map[i][j] = this.maps[level][i][j]
            }
        }
        log(this.map)
        this.drawMap (this.map)
    }
    drawMap (map){
        for (let i = 0; i < map.length; i++){
            for (let j = 0; j < map[i].length; j++){
                this.drawItem(j, i, 'block')
                if (map[i][j] == MAP_CODE.wall){
                    // wall
                    this.drawItem(j, i, 'wall')
                }
                if (map[i][j] == MAP_CODE.box){
                    // box
                    this.drawItem(j, i, 'box')
                }
                if (map[i][j] == MAP_CODE.ball){
                    // ball
                    this.drawItem(j, i, 'ball')
                }
                if (map[i][j] == MAP_CODE.man){
                    // man
                    this.man.x = i
                    this.man.y = j
                    this.drawItem(j, i, this.man.direction)
                }
                if (map[i][j] == MAP_CODE.boxBall){
                    this.drawItem(j, i, 'boxBall')
                }
                if (map[i][j] == MAP_CODE.manBall){
                    this.man.x = i
                    this.man.y = j
                    this.drawItem(j, i, 'ball')
                    this.drawItem(j, i, this.man.direction)
                }
            }
        }
    }
    drawItem (x, y, item){
        let w = CONFIG.blockWidth
        let img = this.game.images[item]
        let context = this.game.context
        context.drawImage(img, x * w, y * w, w, w)
    }

    refresh (map){
        let canvas = this.game.canvas
        let ctx = this.game.context
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawMap(map)
        // 判断是否胜利
        if (this.isWin(map)){
            // 跳下一关
            this.paused = true
            setTimeout(() => {
                this.nextLevel()
                this.paused = false
            }, 500);
        }
    }
    isWin (map){
        for (let i = 0; i < map.length; i++){
            for (let j = 0; j < map[i].length; j++){
                if (map[i][j] == MAP_CODE.ball || map[i][j] == MAP_CODE.manBall){
                    return false
                }
            }
        }
        return true
    }
    nextLevel (){
        this.level++
        if (this.level > this.maps.length){
            alert('恭喜通关！')
            this.level = 1
            let scene = this.game.sceneFactory.getSceneTitleInstance()
            this.loadScene(scene)
            return
        }
        this.loadLevel(this.level)
    }
    loadScene (scene){
        window.removeEventListener('keydown', this.keydown)
        scene.init()
    }
}