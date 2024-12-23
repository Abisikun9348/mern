const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

app.use(express.json());

let books = [];


fs.readFile('books.json', 'utf8', (err, data) => {
    if (!err) {
        books = JSON.parse(data);
    }
});

app.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    fs.writeFile('books.json', JSON.stringify(books, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save book' });
        }
        res.status(201).json({ message: 'Book added successfully', book });
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
