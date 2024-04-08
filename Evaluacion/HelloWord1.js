const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.status(200).type('text/plain').send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*

-- llamada

Get
http://localhost:3000/hello

*/