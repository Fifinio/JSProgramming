const notesContainer = document.querySelector('#notes')

const showModalButton = document.querySelector('#show-modal');
const modal = document.querySelector('#modal');
const modalForm = document.querySelector('#note-form');
const addButton = document.querySelector('#add-button')
const closeButton = document.querySelector('#close-button')


const submitNote = () => {
    let title = document.querySelector('#title')
    let body = document.querySelector('#content')
    let tags = []
    let note = new Note (title.value, body.value, undefined, false, new Date(), tags)
    title.value = ''
    body.value = ''
    saveNote(note)
    renderNotes()
    modal.close();
}


// storage stuff
const saveNote = (note) => {
    let notes = getNotes()
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes))
}

const removeNote = (note) => {
    let notes = getNotes()
    notes = notes.filter(n => n.title != note.title)
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes()
}

const getNotes = () => {
    let notes = localStorage.getItem('notes')
    if (notes) {
        return JSON.parse(notes)
    } else {
        return []
    }
}

// ui stuff
const createRemoveButtonFor = (note) => {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button', "btn", "btn-danger")
    removeButton.innerHTML = 'Remove'
    removeButton.addEventListener('click', () => removeNote (note))
    return removeButton
}

const renderNotes = () => {
    let notes = getNotes()
    notesContainer.innerHTML = ''
    // sort so pinned notes are first
    notes.sort((a,b) => (a.isPinned < b.isPinned) ? 1 : -1)
    
    notes.forEach(note => {
        let noteEl = document.createElement('div')
        noteEl.classList.add('note')
        if(note.isPinned) noteEl.classList.add('pinned')
        
        noteEl.innerHTML = `
            <div class="note__title">${note.title}</div>
            <hr>
            <div class="note__body">${note.body}</div>
            <div class="note__date">${note.creationDate}</div>
            <div class="note__color" style="background-color: ${note.color}"></div>`;
        
        noteEl.appendChild(renderTags(note))
        const removeButton = createRemoveButtonFor(note)
        noteEl.appendChild(removeButton)
        
        notesContainer.appendChild(noteEl)
        })
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotes();
})
addButton.addEventListener('click', () => submitNote())


showModalButton.addEventListener('click', () =>{
    modal.showModal()
})
closeButton.addEventListener('click', () => {
    modal.classList.add('close'); // run animation here
    modal.addEventListener('animationend', () => {
        modal.classList.remove('close')
        modal.close(); // then run the default close method
    }, {once : true}); // add this to prevent bugs when reopening the modal
})

