class Note{
    title;
    body;
    color;
    isPinned = false;
    creationDate;
    tags;

    constructor(title, body, color, isPinned, creationDate, tags){
        this.title = title;
        this.body = body;
        this.color = color;
        this.isPinned = isPinned;
        this.creationDate = creationDate ? creationDate : new Date();
        this.tags = tags ? tags : [];
    }

}