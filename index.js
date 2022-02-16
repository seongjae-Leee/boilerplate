// "mongodb+srv://seongjae:1234@sjdb.eipk6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://seongjae:1234@sjdb.eipk6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.get('/', (req, res) => {
  res.send('Hello U&E~~~~~~~!!!!!!!!!!!');
});

app.listen(port, () => {
  console.log(`Example App listening on port ${port}!!!`);
});
