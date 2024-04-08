const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let books = [];

app.post('/books', (req, res) => {
  const { title, author, price, availability, num_reviews, stars, description } = req.body;

  if (!title || !author || !price || !availability || !num_reviews || !stars || !description) {
    return res.status(400).json({ error: 'Bad Request: Missing required fields' });
  }

  if (isNaN(price)) {
    return res.status(400).json({ error: 'Bad Request: Price must be a number' });
  }

  const newBook = {
    id: generateId(),
    title,
    author,
    price,
    availability,
    num_reviews,
    stars,
    description
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*

Post
POST http://localhost:3000/books

{
  "title": "The king",
  "author": " Julio Gonzalez ",
  "price": 10,000,
  "availability": 10,
  "num_reviews": 100,
  "stars": 10,
  "description": "The King"
}

*/
