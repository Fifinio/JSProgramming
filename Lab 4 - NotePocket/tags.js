saveTags = (note) => {
    let tags = new Set(getTags())
    note.tags.forEach(tag => tags.add(tag))
    localStorage.setItem('tags', JSON.stringify(Array.from(tags)))
}

const getTags = () => {
    let tags = localStorage.getItem('tags')
    if (tags) {
        return JSON.parse(tags)
    } else {
        return []
    }
}

const renderTags = (note) => {
    const tagsContainer = document.createElement('div')
    tagsContainer.classList.add('tags-container')
    note.tags.forEach(tag => {
        let tagEl = document.createElement('div')
        tagEl.classList.add('tag')
        tagEl.innerHTML = `<div class="tag">#${tag}</div>`;
        tagsContainer.appendChild(tagEl)
    });
    return tagsContainer;
}

// remove unused tags
const removeUnusedTags = () => {
    let tags = getTags()
    let notes = getNotes()
    let usedTags = new Set()
    notes.forEach(note => note.tags.forEach(tag => usedTags.add(tag)))
    tags = tags.filter(tag => usedTags.has(tag))
    localStorage.setItem('tags', JSON.stringify(tags))
}