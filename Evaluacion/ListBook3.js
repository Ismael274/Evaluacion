const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const filePath = path.join(__dirname, 'MOCK_DATA.json');

app.get('/books', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    try {
      const books = JSON.parse(data);
      res.status(200).json(books);
    } catch (err) {
      console.error('Error parsing JSON:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    try {
      const books = JSON.parse(data);
      const book = books.find(book => book.id === id);
      
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(400).send('Book not found');
      }
    } catch (err) {
      console.error('Error parsing JSON:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*
-- llamada

Get
http://localhost:3000/books/9dcf4c0b-791e-48da-bf13-f98ad45de9a9

*/
