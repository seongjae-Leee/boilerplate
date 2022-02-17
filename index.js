// "mongodb+srv://seongjae:1234@sjdb.eipk6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
const express = require('express');
const app = express();
const port = 5000;
const { User } = require('./models/User');
const bodyParser = require('body-parser');

// 데이터를 분석해서 가져올 수 있게 해주는 것이고, 제이슨 타입의 데이터를 분석해서 쓸 수 있게 해준 것
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://seongjae:1234@sjdb.eipk6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB is Connected successfully~'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Lets get it!!!!!!!!');
});

// 회원가입을 위한 라우터(POST)
app.post('/register', (req, res) => {
  // 회원가입 정보 client에서 가져오면 데이터베이스로 넣어준다.
  const user = new User(req.body); //json 형식으로 유저 스키마의 내용이 담겨있다.
  // 몽고DB 내장함수 save
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });

});






app.listen(port, () => {
  console.log(`Example App listening on port ${port}!!!`);
});
