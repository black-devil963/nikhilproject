const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = 3010;
const path = require('path');
const EXPRESSION = /^\d$/;
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send(
    `<form method="post" action="/bfhl"><input type="text" name="data" id="data"><input type="submit"></form>`
  );
});
app.post('/bfhl', (req, res) => {
  var digitcount, alphabetcount;
  var odd_numbers = [];
  var even_numbers = [];
  var alphabets = [];
  //res.send(JSON.parse(req.body.data)[1].toUpperCase());
  var data = JSON.parse(req.body.data);
  data.forEach((item, index) => {
    digitcount = 0;
    alphabetcount = 0;
    for (i = 0; i < data[index].length; ++i) {
      if (EXPRESSION.test(data[index][i])) ++digitcount;
      else ++alphabetcount;
    }
    if (alphabetcount != 0 && digitcount != 0)
      res.send({
        is_success: false,
        error: data[index] + ' is invalid combination',
      });
    if (!digitcount) alphabets.push(data[index].toUpperCase());
    else {
      digitcount = parseInt(data[index]);
      if (digitcount % 2 == 0) even_numbers.push(data[index]);
      else odd_numbers.push(data[index]);
    }
  });
  res.send({
    is_success: true,
    user_id: 'Nikhil_Kumar_Aman_26072001',
    email: 'nikhilkumaraman26@gmail.com',
    roll_number: '12008283',
    alphabets: alphabets,
    odd_numbers: odd_numbers,
    even_numbers: even_numbers,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});