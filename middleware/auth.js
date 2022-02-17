const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰을 복호화한후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next(); // 이 next()가 없으면 이 미들웨어를 사용할 때 이 미들웨어에서 다음껏(보통 콜백함수)으로 넘어가지 못하고 갇혀버림
  });

  // 유저가 있으면 ok

  // 유저가 없으면 NO인정
};

module.exports = { auth };