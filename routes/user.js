const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
// const { Post } = require('../models/Post')

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    id: req.user.id,
    name: req.user.name,
    nickname: req.user.nickname,
    birthYear: req.user.birthYear,
    mbti: req.user.mbti,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/login", (req, res) => {
  User.findOne(
    {
      id: req.body.id,
    },
    (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "존재하지 않는 아이디입니다.",
        });
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch) {
            return res.json({
              loginSuccess: false,
              message: "비밀번호가 틀렸습니다.",
            });
          } else {
            user.generateToken((err, user) => {
              if (err) {
                return res.status(400).send(err);
              } else {
                //     res.cookie("W_authExp", user.tokenExp)
                res.cookie("x_auth", user.token).status(200).json({
                  loginSuccess: true,
                  userId: user._id,
                });
              }
            });
          }
        });
      }
    }
  );
});

router.get("/logout", auth, (req, res) => {
  User.findByIdAndUpdate(
    {
      _id: req.user._id, //이 부분에서 user의 _id를 가져와야하기 때문에 auth를 거침
    },
    {
      token: "",
      // tokenExp: ""
    },
    (err, user) => {
      if (err) return res.json({ logoutSuccess: false, err });
      return res.status(200).json({ logoutSuccess: true });
    }
  );
});

module.exports = router;
