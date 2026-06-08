const randomWord = "pearl"  // <-   have to use random word generator
let chances = 0

let boxes = document.getElementsByClassName('box')

const form = document.forms['form']
const feedback = document.getElementById('feedback')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let text = form.elements['text'].value
    if (text.length !== 5) {
        console.log(text)
        feedback.innerHTML = "Please guess a 5 character word"
        return
    }

    let row = chances * 5
    let matches = 0;
    for (let col = 0 ; col < 5; col++) {
        boxes[row+col].innerHTML = text[col]

        if (text[col] === randomWord[col]) {
            boxes[row+col].classList.add('green')
            matches++;
        } else if (randomWord.includes(text[col])) {
            boxes[row+col].classList.add('yellow')
        } else {
            boxes[row+col].classList.add('gray')
        }
    }

    chances++
    if(matches === 5) {
        feedback.innerHTML = "Congratulations! You guessed the word"
    } else if (chances === 6) {
        feedback.innerHTML = `Game over, the word was "${randomWord}"`
    }
    form.elements['text'].value = ""
})
