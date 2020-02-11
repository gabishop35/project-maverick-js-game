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

    const tick = () => {
      this.update()
      this.draw(screen, gameSize)
    }
  }

  draw (screen, gameSize) {
    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i])
    }
  }
}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 15, y: 15 }
  }
}
class Enemy {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 15, y: 15 }
  }
}


function createEnemy (game) {
  const enemy = []
  for (let i = 0; i < 10; i++) {
      let x = 30 + (i % 8) * 30
      let y = 30 + (i % 3) * 30
    enemy.push(new Enemy(game, { x: x, y: y }))
  }
  return enemy
}

// class Laser


function drawRect (screen, body) {
    screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y/2, body.size.x, body.size.y)
}

new Game()
new Player()
new Enemy ()
