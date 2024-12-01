const Book = require('../models/Book');

module.exports = (app) => {
    app.get('/books', async (req, res) => {
        const books = await Book.find();
        res.json(books);
    });

    app.post('/books', async (req, res) => {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    });

    app.put('/books/:id', async (req, res) => {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    });

    app.delete('/books/:id', async (req, res) => {
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).send();
    });
};
