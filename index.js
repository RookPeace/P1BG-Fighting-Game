const canvas = document.querySelector('canvas');
const cc = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

cc.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.3
class soul {
    constructor({position, velocity, color = 'red'}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.hitbox ={
            position: this.position ,
            width: 100,
            height: 50
        }
        this.color = color
        this.attacking
    }
    draw(){
        cc.fillStyle = this.color
        cc.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        //hitbox
        //if(this.attacking) {

        
        cc.fillStyle = 'green'
        cc.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
       // }
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
       if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0
       } else this.velocity.y += gravity      
    }
    attack() {
        this.attacking = true
        setTimeout(() =>{
            this.attacking = false

        },100)
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
},
color: 'blue'
})


console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


function animate() {
    window.requestAnimationFrame(animate)
    cc.fillStyle ='black'
    cc.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    player.velocity.x = 0
    enemy.velocity.x = 0
    //Player 1 movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x =-1
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 1
    }

     //Player 2 movement
     
     if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x =-1
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 1
    }
    // detect for collision
if(player.hitbox.position.x + player.hitbox.width >= enemy.position.x &&
     player.hitbox.position.x <= enemy.position.x + enemy.width &&
     player.hitbox.position.y + player.hitbox.height >= enemy.position.y &&
     player.hitbox.position.y <= enemy.position.y + enemy.height &&
     player.attacking
     )  {
        player.attacking = false
    console.log('go');
}

}

animate()

window.addEventListener('keydown', (event) => {
   switch (event.key){
    //Player 1 Keys
    case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
    case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
    case 'w':
        player.velocity.y= -10
        break
        case ' ':
           player.attack()
           break
        //Player 2 Keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -10
            break
   }
    console.log(event.key);
})
window.addEventListener('keyup', (event) => {
     //Player 1 Keys
    switch (event.key){
       
     case 'd':
        keys.d.pressed = false
         break
         case 'a':
         keys.a.pressed = false
         break
        
    }
    //Player 2 Keys
    switch (event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
     console.log(event.key);
 })

 