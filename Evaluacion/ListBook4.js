const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const filePath = path.join(__dirname, 'MOCK_DATA.json');

app.get('/books', (req, res) => {
  const { price } = req.query;

  if (!/^\d+$/.test(price)) {
    return res.status(400).send('Bad Request: Price must be a number');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    try {
      const books = JSON.parse(data);
      
      const expensiveBooks = books.filter(book => book.price > parseInt(price));

      if (expensiveBooks.length === 0) {
        return res.status(404).send('Not Found: No books found with the specified price');
      }

      return res.status(200).json(expensiveBooks);
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*
-- llamada

Get = 900
http://localhost:3000/books?price=900

Get = 450
http://localhost:3000/books?price=450

*/