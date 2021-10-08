const { User } = require('../model/User');

let auth = (req, res, next) => {

    // 인증처리
    // 토큰 가져오기
    let token = req.cookies.x_auth;

    // 토큰 복호화, user 찾기
    // user가 있으면 인증, 없으면 미인증
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true });

        req.token = token;
        req.user = user;

        next();
    });

}

module.exports = { auth };