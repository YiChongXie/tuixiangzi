class SceneTitle extends Scene{
    constructor (game){
        super(game)
        this.paused = false
        this.keydown = (event) => {
            let k = event.key
            if (!this.paused){
                if (k == 's'){
                    let scene = this.game.sceneFactory.getSceneMainInstance()
                    this.loadScene(scene)
                }
                if (k == 'e'){
                    let scene = this.game.sceneFactory.getSceneEditorInstance()
                    this.loadScene(scene)
                }
            }
        }
    }
    // 场景初始化
    init (){
        // 加载场景
        log('sceneTitle init')
        this.load()
        // 添加监听事件
        window.addEventListener('keydown', this.keydown)
    }
    load (){
        let canvas = this.game.canvas
        this.game.context.clearRect(0, 0, canvas.width, canvas.height)
        this.drawMap ()
    }
    drawMap (){
        for (let i = 0; i < this.maps[0].length; i++){
            for (let j = 0; j < this.maps[0][i].length; j++){
                this.drawItem (j, i, 'block')
            }
        }
        let canvas = this.game.canvas
        let context = this.game.context
        context.font = '26px "Microsoft YaHei"'
        context.fillStyle = '#F44336'
        context.textAlign = 'center'
        context.fillText("按's'开始游戏！", canvas.width/2, 150)
        context.fillText("按'e'进入地图编辑模式！", canvas.width/2, 200)
    }
    drawItem (x, y, item){
        let w = CONFIG.blockWidth
        let img = this.game.images[item]
        let context = this.game.context
        context.drawImage(img, x * w, y * w, w, w)
    }
    loadScene (scene) {
        window.removeEventListener('keydown', this.keydown)

        scene.init()
    }
}