// Establish Dom References
// Explicitly defining for my own sanity
let movementDisplay = document.getElementById('movement')
let game = document.getElementById('game')
let statusDisplay = document.getElementById('status')

// Getting context for drawing on canvas
let ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])

function Crawler(x, y, width, height, color, velocity) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.color = color
  this.velocity = velocity
  this.alive = true
  this.render = function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height, this.velocity)
  }
}

// function Worker(x, y, width, height, color, sprites) {
//   this.x = x
//   this.y = y
//   this.width = width
//   this.height = height
//   this.color = red
//   this.sprites = sprites
//   this.alive = true
//   this.render = function() {
//     ctx.fillStyle = this.color
//     ctx.fillRect(this.x, this.y, this.width, this.height, this.sprites)
//   }
// }

function Obstacle(x, y, width, height, color, velocity) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.velocity = velocity
    this.render = function() {
        console.log("I am rendered noob");
    }
}



let hero = new Crawler(50, 200, 50, 50, 'hotpink', 50)
let ogre = new Crawler(400, 150, 60, 100, '#bada55')
let obst = new Obstacle(200, 100, 50, 70, "red", 1)
let movement = 10

// We need to have a character that can move 
// Need to have objects that cannot be touched otherwise game is over (if touch - game over)
// Add a score! 
// Need to have the objects go from top to bottom of the screen (change their Y position)
// Randomly generate the obstacles (FIRST HARD CODE THEM WHERE THEY WILL APPEAR FIRST - adding a random X position after HARD CODE)
// Need to write collision logic 
// Move the Player (WSAD) - determine speed of the character --> make that my movement function 
// Then focus on having 1 square go from top to bottom of the screen


let gameLoop = () => {
  // clear canvas
  obst.render()
  ctx.clearRect(0, 0, game.width, game.height)
  // display gamestate on the DOM
  movementDisplay.innerText = `X: ${hero.x}\nY: ${hero.y}`
  // if ogre is alive
  if (ogre.alive) {
    // render the ogre
    ogre.render()
    // detect collision
    detectHit()
  }
  // render the hero
  hero.render()
}

let detectHit = () => {
  if (
    hero.x + hero.width >= ogre.x &&
    hero.x <= ogre.x + ogre.width &&
    hero.y <= ogre.y + ogre.height &&
    hero.y + hero.height >= ogre.y
    ) {
      endGame()
    }
  }
  
let endGame = () => {
  ogre.alive = false
  statusDisplay.innerText = 'You murdered Shrek!'
  setTimeout(() => {
    clearInterval(gameInterval)
  }, 200)
}

let movementHandler = (e) => {  
  switch(e.key) {
    case 'w':
      hero.y -= movement// move up
      break
    case 'a':
      hero.x -= movement // move left
      break
    case 's':
      hero.y += movement // move down
      break
    case 'd':
      hero.x += movement// move right
  }
}

// set event listener for keydown
document.addEventListener('keydown', movementHandler)

// initializes the game
let gameInterval = setInterval(gameLoop, 100)


// Helper function so my computer doesn't explode
document.querySelector('#btm-left').addEventListener('click', () => {
  clearInterval(gameInterval)
})