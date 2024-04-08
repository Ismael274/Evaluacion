const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const filePath = path.join('C:', 'Users', 'jugonzalez', 'Desktop', 'Evaluacion', 'MOCK_DATA.json');

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



/*

-- llamada

Get
http://localhost:3000/books

*/
