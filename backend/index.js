const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// JSON support
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

let todos = {
    '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: [{content: 'First todo of first list!', done: false}]
    },
    '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: [{content: 'First todo of second list!', done: false}]
    }
};

app.get('/todos', (req, res) => res.status(200).send(todos));

app.put("/saveTodos", (req, res) => {
    const putResult = req.body;
    todos[putResult.id].todos = putResult.todos;
    res.status(200).send();
});



app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
