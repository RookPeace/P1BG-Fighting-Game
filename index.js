const canvas = document.querySelector('canvas');
const cc = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

cc.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.3
class soul {
    constructor({position, velocity, color = 'red', offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.hitbox ={
            position: {
                x:this.position.x,
                y:this.position.y
            } ,
            offset,
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
        if(this.attacking) {

        
        cc.fillStyle = 'green'
        cc.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        }
    }

    update() {
        this.draw()
        this.hitbox.position.x = this.position.x + this.hitbox.offset.x
        this.hitbox.position.y = this.position.y
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
},
offset:{
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
color: 'blue',
offset:{
    x:-50,
    y:0
}
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
    function rectangularCollision({ rectangle1, rectangle2 }){
        return (
            rectangle1.hitbox.position.x + rectangle1.hitbox.width >= rectangle2.position.x &&
            rectangle1.hitbox.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.hitbox.position.y + rectangle1.hitbox.height >= rectangle2.position.y &&
            rectangle1.hitbox.position.y <= rectangle2.position.y + rectangle2.height
        )
        
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
if(
    rectangularCollision({
        rectangle1:player,
        rectangle2: enemy
    })
        &&
     player.attacking
     )  {
        player.attacking = false
    document.querySelector('#enemyHealth').style.width='20%'
}


if(
    rectangularCollision({
        rectangle1:enemy,
        rectangle2: player
    })
        &&
     enemy.attacking
     )  {
        enemy.attacking = false
    console.log('player 2 is attacking');
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
        case 'ArrowDown':
            enemy.attacking = true
            break
   }
    
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
     
 })

 