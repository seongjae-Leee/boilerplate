// 배포된 상태와 배포되지 않고 개발중인 상태를 구분하여 환경변수 설정
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}