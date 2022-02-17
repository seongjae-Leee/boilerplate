// "mongodb+srv://seongjae:1234@sjdb.eipk6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
const express = require('express');
const app = express();
const port = 5000;
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

// 데이터를 분석해서 가져올 수 있게 해주는 것이고, 제이슨 타입의 데이터를 분석해서 쓸 수 있게 해준 것
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
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

// 로그인 라우터
app.post('/login', (req, res) => {
  // 요청된 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '이메일에 해당하는 유저 정보가 없습니다.'
      });
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json(
          {
            loginSuccess: false,
            message: '비밀번호를 확인해 주세요.'
          });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });

  // 비밀번호까지 맞다면 토큰 생성.
});






app.listen(port, () => {
  console.log(`Example App listening on port ${port}!!!`);
});
