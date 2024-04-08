const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const filePath = path.join(__dirname, 'MOCK_DATA.json');

app.get('/books/average', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    try {
      const books = JSON.parse(data);
      
      const totalCost = books.reduce((acc, book) => acc + book.price, 0);
      const averageCost = totalCost / books.length;

      const response = { average: averageCost.toFixed(2) };
      return res.status(200).json(response);
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
http://localhost:3000/books/average

*/

