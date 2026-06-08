const notesGrid = document.querySelector('.notesGrid')
const newNoteSection = document.querySelector('#newNote')
const noteContent = document.querySelector('#note-content')
const closeBtns = document.getElementsByClassName('close-btn')
console.log(closeBtns)

const createNote = (noteText) => {
    const box = document.createElement('div')
    box.classList.add('note')
    const textArea = document.createElement('p')
    textArea.classList.add("note-text")
    textArea.innerHTML = noteText
    const closeBtn = document.createElement('button')
    closeBtn.classList.add("close-btn")
    closeBtn.innerHTML = "X"

    box.append(closeBtn, textArea)
    return box
}

const addNoteBtn = document.querySelector('#new-note-btn')
addNoteBtn.addEventListener('click', () => {
    let text = noteContent.value

    let box = createNote(text)
    notesGrid.insertBefore(box, newNoteSection)

    noteContent.value = ""
})

notesGrid.addEventListener('click', (event)=> {
    if( event.target.classList.contains('close-btn')) {
        event.target.parentElement.remove();
    }
})