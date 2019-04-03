const fs = require('fs');
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) =>  note.title === title)

    if(!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green("New note added"));
    } else {
        console.log(chalk.red('Note title taken!'));
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

     if (notes.length !== notesToKeep.length) {
         console.log(chalk.green('Note was removed'))
         saveNotes(notesToKeep)
     } else {
         console.log(chalk.red('No note was removed'))
     }   
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your notes'));
    notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => {
        return note.title === title
    })
    if (findNote === title) {
        console.log(chalk.blue(findNote))
    } else {
        console.log(chalk.red('No note found!'))
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}