const canvas = document.querySelector('canvas');
const cc = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

cc.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.3
class soul {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150
    }
    draw(){
        cc.fillStyle = 'green'
        cc.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()
        
        this.position.y += this.velocity.y
       if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0
       } else this.velocity.y += gravity
    }
}

const player = new soul({
    position: {
    x:0,
    y:0
},
velocity: {
    x:0,
    y:0
}
})


const enemy = new soul({
    position: {
    x:350,
    y:0
},
velocity: {
    x:0,
    y:0
}
})


console.log(player);

function animate() {
    window.requestAnimationFrame(animate)
    cc.fillStyle ='black'
    cc.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate()