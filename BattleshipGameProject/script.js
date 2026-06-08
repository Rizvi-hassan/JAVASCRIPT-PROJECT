const grid = document.querySelector('.grid')
const dialogBox = document.getElementById('dialog-box')
const dialogMsg = document.getElementById('dialog-message')


let chances = 0;
let shipsRevealed = 0;

const handleWin = () => {
    dialogMsg.innerHTML = "You Won !!"
    dialogBox.showModal()
}
const handleLoose = () => {
    dialogMsg.innerHTML = "You Loose !!"
    dialogBox.showModal()
}

grid.addEventListener('click', (e)=> {
    if (e.target.tagName === 'DIV') {
        let imgElement = e.target.children[0]
        imgElement.classList.remove('hidden')

        chances++;
        if (imgElement.alt === 'ship') shipsRevealed++;

        if (shipsRevealed === 5) handleWin();
        else if (chances === 8) handleLoose();

    }
})

const reset = ()=> {
    const imgs = document.getElementsByTagName('img')
    Array.from(imgs).forEach(img => {
        img.classList.add('hidden')
    })

    chances = 0;
    shipsRevealed = 0;
}

const resetBtn = document.getElementById('reset-btn')
const restartBtn = document.getElementById('restart-btn')

resetBtn.addEventListener('click', reset)
restartBtn.addEventListener('click', ()=> {
    dialogBox.close()
    reset()
})