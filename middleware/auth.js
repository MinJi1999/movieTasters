const { User } = require("../models/User")

let auth = (req, res, next) => {
    let token = req.cookies.x_auth
    User.findByToken(token, (err, user) => {
        if(err) throw err
        if(!user) {
            return res.json({
                isAuth: false,
                error: true
            })
        } else {
            req.token = token
            req.user = user //next로 넘어간 함수에서 req.user하면 user의 정보를 가져올 수 있음
            next()
        }
    })
}

module.exports = {auth}