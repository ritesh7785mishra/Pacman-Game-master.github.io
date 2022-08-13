const width = 28
const grid = document.querySelector(".grid")
const displayScore = document.getElementById("score")
const restartBtn = document.getElementById("rebtn")
const startBtn = document.getElementById("btn")
let squares =[]
let score = 0

//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function creatBoard(){
    for(let i = 0 ; i < layout.length; i++){
        const square = document.createElement("div")
        grid.appendChild(square)
        squares.push(square)
         if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        }else if(layout[i] === 1){
            squares[i].classList.add("wall")
        }else if(layout[i] === 2){
            squares[i].classList.add("ghost-lair")
        }
        else if(layout[i] === 3){
            squares[i].classList.add("power-pellet")
        }
    } 
}
creatBoard()

let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add("pacman")



function control(e){
    squares[pacmanCurrentIndex].classList.remove("pacman")
    switch(e.keyCode) {
        case 40:
    
        if( !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            pacmanCurrentIndex + 28 < 28*28)
             pacmanCurrentIndex += 28
        break
        case 38:
        
        if( !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - 28 >= 0)
             pacmanCurrentIndex -= 28
        break
        case 37: 
        if( !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !== 0)
            pacmanCurrentIndex -= 1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
    
        break
        case 39:
        if( !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
            pacmanCurrentIndex % width< width-1) 
            pacmanCurrentIndex += 1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
        
        break
    }
    squares[pacmanCurrentIndex].classList.add("pacman")
    pacEaten()
    powerpalletEaten()
    victory()
    gameOver()
}


startBtn.addEventListener("click" , function(){
    document.addEventListener("keyup", control)
    ghosts.forEach(ghost => moveGhost(ghost))
    ghosts.forEach(ghost => {
    
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add("ghost")
    })
    
})








function pacEaten(){
    if(squares[pacmanCurrentIndex].classList.contains("pac-dot")){
    squares[pacmanCurrentIndex].classList.remove("pac-dot")
    score++
    displayScore.innerHTML = score
    }
}

function powerpalletEaten(){
    if(squares[pacmanCurrentIndex].classList.contains("power-pellet")){
        squares[pacmanCurrentIndex].classList.remove("power-pellet")
        score += 10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhost , 10000)
    }
}

function unScareGhost(){
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost{
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)

]




function moveGhost(ghost){
    const directions = [+1,-1,+width,-width]
    let direction = directions[(Math.floor(Math.random()*directions.length))]

    ghost.timerId = setInterval(function(){
        if(
        !squares[ghost.currentIndex + direction].classList.contains("wall")&&
        !squares[ghost.currentIndex + direction].classList.contains("ghost")
        ){
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost','scared-ghost')
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
        }

        else{
            direction = directions[(Math.floor(Math.random()*directions.length))]
        }


        if(ghost.isScared){
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }


        if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")){
            squares[ghost.currentIndex].classList.remove(ghost.className ,"ghost","scared-ghost")
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
        }
        gameOver()
    }, ghost.speed)
}


function gameOver(){
    if(squares[pacmanCurrentIndex].classList.contains("ghost") &&
     !squares[pacmanCurrentIndex].classList.contains("scared-ghost")){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup",control)
        displayScore.innerHTML = "You LOSE"
        restartBtn.style.display = "block"
        startBtn.style.display = "none"
     }
}

function victory(){
    if(score === 274){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup",control)
        displayScore.innerHTML = "YOU WON"
        restartBtn.style.display = "block"
        startBtn.style.display = "none"
        
    }
}
restartBtn.addEventListener("click" , function(){
    score = 0
    displayScore.innerHTML = ""
    document.addEventListener("keyup", control)

    squares[pacmanCurrentIndex].classList.remove("pacman")
    pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add("pacman")
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove("ghost")
        squares[ghost.currentIndex] = squares[ghost.startIndex]
        ghost.currentIndex = ghost.startIndex
        squares[ghost.startIndex].classList.add(ghost.className)
        squares[ghost.startIndex].classList.add("ghost")
    })
    
    creatBoard()
    ghosts.forEach(ghost => moveGhost(ghost))
})
// restartBtn.addEventListener("click" , function(){
//     score = 0
//     displayScore.innerHTML = ""
//     document.addEventListener("keyup", control)
//     // ghosts.forEach(ghost => moveGhost(ghost))
//     squares[pacmanCurrentIndex].classList.remove("pacman")
//     pacmanCurrentIndex = 490
//     squares[pacmanCurrentIndex].classList.add("pacman")
//     ghosts.forEach(ghost => {
//     squares[ghost.currentIndex].classList.remove(ghost.className)
//     squares[ghost.currentIndex].classList.remove("ghost")
//     squares[ghost.currentIndex] = squares[ghost.startIndex]
//     squares[ghost.startIndex].classList.add(ghost.className)
//     squares[ghost.startIndex].classList.add("ghost")
//     ghost.currentIndex = ghost.startIndex
//     })
    
//   creatBoard()
//   ghosts.forEach(ghost => moveGhost(ghost))
// })

