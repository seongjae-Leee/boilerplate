const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 100
  },
  email: {
    type: String,
    trim: true, // 공백 지워주기
    unique: 1 // 이메일 중복가입 안되게
  },
  password: {
    type: String,
    maxlength: 500
  },
  role: { // 관리자와 일반 유저 구분
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {

    // 저장하기 전에 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 평문화 상태의 비밀번호와 암호화된 비밀번호가 동일한지 확인해야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // json 웹토큰으로 토큰 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secreteToken');
  // user._id + 'secreteToken' = token;
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model('User', userSchema);
module.exports = { User };