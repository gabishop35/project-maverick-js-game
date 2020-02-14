// create player
// make player move left and right
// make player show up at bottom of Canvas
// let myMusic
const jetPng = 'jet.png'
class Game {
  constructor () {
    const canvas = document.querySelector('#game')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }

    this.bodies = []
    this.bodies = this.bodies.concat(new Player(this, gameSize))
    this.bodies = this.bodies.concat(createEnemy(this))

    const tick = () => {
      if (this.bodies.length < 20) {
        console.log('works')
        this.bodies = this.bodies.concat(createEnemy(this))
      }
      this.update()
      this.draw(screen, gameSize)
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    const noHit = (b1) => {
      return this.bodies.filter(function (b2) { return hit(b1, b2) }).length === 0
    }
    this.bodies = this.bodies.filter(noHit)

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update()
    }
  }

  draw (screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i])
    }
  }

  addBody (body) {
    const isHit = this.bodies.some(otherBody => hit(body, otherBody) && body.prototype === otherBody.prototype)
    if (!isHit) {
      this.bodies.push(body)
    }
  }
}

class Player {
  constructor (game, gameSize) {
    // this.image = new Image()
    // this.image.src = imageSrc
    this.game = game
    this.size = { x: 20, y: 20 }
    this.center = { x: gameSize.x / 2, y: gameSize.y / 1.5 }
    this.keyboarder = Keyboarder
    // Player.src = '/Users/geoffbishop/Momentum/build-a-game-gabishop35/jet.png'

    // this.gameImage = this.draw(screen, gameSize)

    // screen.drawImage(image, this.size.x, this.size.y)
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
      this.center.y -= 2
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
      this.center.y += 2
    }
    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
      const rocket = new Rocket({ x: this.center.x, y: this.center.y - this.size.y - 10 },
        { x: 0, y: -5 })

      this.game.addBody(rocket)
    }
    if (this.center.x < 0) {
      this.center.x = 0
    }
    if (this.center.x > 580) {
      this.center.x = 580
    }
    if (this.center.y > 580) {
      this.center.y = 580
    }
    if (this.center.y < 0) {
      this.center.y = 0
    }
  }
}

class Enemy {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 10, y: 10 }
    this.patrolY = 0
    this.speedY = 1
  }

  update () {
    if (this.patrolY < -10 || this.patrolY > 560) {
      this.speedY = -this.speedY
    }
    this.center.y += this.speedY
    this.patrolY += this.speedY
  }
}

function createEnemy (game) {
  const enemy = []
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * 580
    // const y =
    const y = Math.random() * 200

    // const x = 30 + (i % 8) * 30
    // const y = 30 + (i % 3) * 30
    enemy.push(new Enemy(game, { x: x, y: y }))
  }
  return enemy
}

class Rocket {
  constructor (center, velocity) {
    this.center = center
    this.size = { x: 5, y: 2 }
    this.velocity = velocity
  }

  update () {
    this.center.x += this.velocity.x
    this.center.y += this.velocity.y
  }
}

// class Keyboarder {
//   constructor () {
//     const keyStroke = {}
//     window.addEventListener('keydown', function (e) {
//       keyStroke[e.keyCode] = 'true'
//     })

//     window.addEventListener('keyup', function (e) {
//       keyStroke[e.keyCode] = 'false'
//     })

//     this.KEYS = { SPACE: 32, LEFT: 37, RIGHT: 39 }
//   }
// }

function drawRect (screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2, body.size.x, body.size.y)
}

function hit (b1, b2) {
  return !(
    b1 === b2 ||
    b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
    b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
    b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
    b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
  )
}
const music = document.querySelector('#music')
music.autoplay = true
music.load

window.addEventListener('load', function () {
  new Game()
})
