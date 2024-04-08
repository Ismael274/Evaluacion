const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const filePath = path.join(__dirname, 'MOCK_DATA.json');

const isAlphabetical = (phrase) => /^[a-zA-Z]+$/.test(phrase);

app.get('/books', (req, res) => {
  const { phrase } = req.query;

  if (!isAlphabetical(phrase)) {
    return res.status(400).send('Bad Request: Phrase must contain only alphabetical letters');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    try {
      const books = JSON.parse(data);
      
      const matchingBooks = books.filter(book => book.author.toLowerCase().includes(phrase.toLowerCase()));

      if (matchingBooks.length === 0) {
        return res.status(404).send('Not Found: No books found with the specified phrase');
      }

      return res.status(200).json(matchingBooks);
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

Get
http://localhost:3000/books?phrase=z

*/
