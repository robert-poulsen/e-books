import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({ title: '', author: '', year: '' });
    const [editId, setEditId] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleSubmit = async () => {
        if (editId) {
            await axios.put(`http://localhost:5000/books/${editId}`, formData);
            setEditId(null);
        } else {
            await axios.post('http://localhost:5000/books', formData);
        }
        setFormData({ title: '', author: '', year: '' });
        fetchBooks();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/books/${id}`);
        fetchBooks();
    };

    const handleEdit = (book) => {
        setFormData(book);
        setEditId(book._id);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            {/* Заголовок */}
            <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}
            >
                Manage E-books
            </Typography>

            {/* Поля вводу */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3, maxWidth: '500px', mx: 'auto' }}>
                <TextField
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    fullWidth
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ alignSelf: 'center', width: '50%' }}
                >
                    {editId ? 'Update' : 'Add'}
                </Button>
            </Box>

            {/* Список книг */}
            <List sx={{ maxWidth: '600px', mx: 'auto', bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 2 }}>
                {books.map((book) => (
                    <ListItem
                        key={book._id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #ddd',
                            padding: 2,
                        }}
                    >
                        <ListItemText
                            primary={`${book.title} by ${book.author} (${book.year})`}
                            primaryTypographyProps={{ fontSize: '1rem', fontWeight: '500', color: '#333' }}
                        />
                        <Box>
                            <IconButton
                                color="primary"
                                onClick={() => handleEdit(book)}
                                sx={{ mr: 1 }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => handleDelete(book._id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default App;
