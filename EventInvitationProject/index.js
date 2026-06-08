const formContainer = document.querySelector('#form-container')
const invitationContainer = document.querySelector('#invitation-container')
const form = document.forms['event-form']
const dialogBox = document.querySelector('#dialog-box')
const closeDialogBox = document.querySelector('#dialog-close')



const isEmptyField = ()=> {
    if (form.elements['name'].value === "") return true;
    if (form.elements['date'].value === "") return true;
    if (form.elements['start-time'].value === "") return true;
    if (form.elements['end-time'].value === "") return true;
    if (form.elements['description'].value === "") return true;
    if (form.elements['location'].value === "") return true;
    
    return false;
}

const showInvitation = (event) => {
    formContainer.style.display = "none";
    invitationContainer.style.display = "block"
    // console.log(event)

    document.getElementById('invite-name').innerHTML = event.name
    
    let formatedDate = new Date(event.date)
    formatedDate = formatedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric' 
    })
    // console.log("Date: ", formatedDate)
    document.getElementById('invite-date').innerHTML = formatedDate
    
    let startTime = new Date(`${event.date}T${event.startTime}`)
    startTime = startTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
    let endTime = new Date(`${event.date}T${event.endTime}`)
    endTime = endTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
    // console.log("time - ", startTime, endTime)
    document.getElementById('invite-time').innerHTML = `${startTime} - ${endTime}`
    
    document.getElementById('invite-location').innerHTML = event.location
    document.getElementById('invite-description').innerHTML = event.description
}

const handleFormSubmit = (e) => {
    e.preventDefault()
    // console.log("submit form")

    if (isEmptyField() === true ) {
        dialogBox.showModal();
        // console.log("empty field")
    }

    let event = {}
    event.name = form.elements['name'].value;
    event.date = form.elements['date'].value;
    event.startTime = form.elements['start-time'].value;
    event.endTime = form.elements['end-time'].value;
    event.description = form.elements['description'].value;
    event.location = form.elements['location'].value;

    showInvitation(event)
}

closeDialogBox.addEventListener('click', ()=> dialogBox.close())

form.addEventListener('submit', handleFormSubmit)

