const canvas = document.querySelector('canvas');
const cc = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

cc.fillRect(0,0,canvas.width,canvas.height)

class soul {
    constructor(position){
        this.position = position
    }
    draw(){
        cc.fillStyle = 'red'
        cc.fillRect(this.position.x, this.position.y, 50, 150)
    }
}

const player = new soul({
    x:0,
    y:0
})
player.draw()
console.log(player);

