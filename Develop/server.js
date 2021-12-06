const { Console } = require('console');
const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();
const db = require("./db/db.json")
const PORT = process.env.PORT || 3001;

express.urlencoded({ extended: true })
app.use(express.static('public'));
app.use(express.json());
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
})

app.post('/api/notes', (req, res) => {
    req.body.id = db.length.toString();
    const dbInfo = createNewNote(req.body, db);
    res.json(dbInfo);
    //res.sendStatus(200)
});

app.delete('/api/notes/:id', (req, res) => {
    //const dbDelete = deleteNote();
    //res.json(dbDelete);
    deleteNote(req.params.id);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


function createNewNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return notes;
}

function deleteNote(id) {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        noteArr = JSON.parse(data)
        noteArr.stringify;
        updateArr = []
        for (let i = 0; i < noteArr.length; i++) {
            if (i == id) {
                console.log(`ignoring id ${id}`)
            } else {
                updateArr[i] = noteArr[i]
                console.log(noteArr[i])
                console.log(updateArr)
            }
        }
        fs.writeFile('./db/db.json', JSON.stringify(updateArr), (err) => {
        })
        //console.log(noteArr)
        //console.log(updateArr)
    })
}