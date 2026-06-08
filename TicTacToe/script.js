let gridMatrix = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]

let turn = 0;    // 0 -> O  and 1 -> X

let circle = `<i class="fa-regular fa-circle"></i>`
let cross = `<i class="fa-solid fa-x"></i>`

const grid = document.querySelector('.grid')
const cells = document.getElementsByClassName('cells')
const resetBtn = document.getElementById('reset')
const msg = document.getElementById('msg')

const checkWin = () => {
    // check rows 
    for (let i = 0; i<3; i++) {
        if (gridMatrix[i][0] === gridMatrix[i][1] && gridMatrix[i][0] === gridMatrix[i][2] && gridMatrix[i][0] !== -1) {
            return [[i,0], [i,1], [i,2]]
        }
    }

    // check cols 
    for(let j=0; j<3; j++) {
        if (gridMatrix[0][j] === gridMatrix[1][j] && gridMatrix[0][j] === gridMatrix[2][j] && gridMatrix[0][j] !== -1) {
            return [[0, j], [1, j], [2, j]]
        }
    }

    // check primary diagonal 
    if (gridMatrix[0][0] === gridMatrix[1][1] && gridMatrix[0][0] === gridMatrix[2][2] && gridMatrix[0][0] !== -1) {
        return [[0, 0], [1, 1], [2, 2]]
    }

    // checl secondary diagonal
    if (gridMatrix[0][2] === gridMatrix[1][1] && gridMatrix[0][2] === gridMatrix[2][0] && gridMatrix[0][2] !== -1) {
        return [[0, 2], [1, 1], [2, 0]]
    }

    return false
}

const handleWin = (cells) => {
    let whoWon = gridMatrix[cells[0][0]][cells[0][1]]

    //change bg to green
    for(let cell of cells) {
        document.getElementById(`${cell[0]}${cell[1]}`).style.backgroundColor = "#a0eda1"
    }

    msg.innerHTML = `${whoWon === 0? circle : cross} won!! <br>Reset the board`

}

grid.addEventListener('click', (e)=> {
    if (e.target.classList.contains('cells')) {
        let [r, c] = e.target.id.split("").map(x => Number(x))
        if (gridMatrix[r][c] === -1){
            e.target.innerHTML = turn === 0 ? circle : cross
            gridMatrix[r][c] = turn 
        }
        turn = (turn + 1) % 2

        let isWin = checkWin()
        if(isWin) {
            handleWin(isWin)
        }
    }
})

const reset = ()=> {
    Array.from(cells).forEach(element => {
        element.innerHTML = "";
        element.style.backgroundColor = 'white';
        msg.innerHTML = ""
        gridMatrix = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
    });

}

resetBtn.addEventListener('click', reset)