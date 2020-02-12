// create player
// make player move left and right
// make player show up at bottom of Canvas

class Game {
  constructor () {
    const canvas = document.querySelector('#game')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }

    this.bodies = []
    this.bodies = this.bodies.concat(new Player(this, gameSize))
    this.bodies = this.bodies.concat(createEnemy(this))

    // this.gameImage is what is making things show up on the canvas
    // this.gameImage = this.draw(screen, gameSize)

    const tick = () => {
      this.update()
      this.draw(screen, gameSize)
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
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
}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 15, y: 15 }
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
    this.keyboarder = Keyboarder
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
    } if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
    }
  }
}

class Enemy {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 15, y: 15 }
  }

  update () {

  }
}

function createEnemy (game) {
  const enemy = []
  for (let i = 0; i < 29; i++) {
    const x = 30 + (i % 8) * 30
    const y = 30 + (i % 3) * 30
    enemy.push(new Enemy(game, { x: x, y: y }))
  }
  return enemy
}

// class Laser {
//   constructor (center, velocity) {
//     this.center = center
//     this
//   }
// }

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

window.addEventListener('load', function () {
  new Game()
})
