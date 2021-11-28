const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  birthYear: {
    type: Number,
  },
  id: {
    type: String,
    minlength: 5,
    unique: 1,
    trim: true,
  },
  nickname: {
    type: String,
    maxlength: 7,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 4,
  },
  mbti: {
    type: String,
    maxlength: 4,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    //password가 변경될 때만 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
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
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

//statics와 methods의 차이는 바로 쓸 수 있느냐와 인스턴스를 만들어야만 사용할 수 있음의 차이.
userSchema.statics.findByToken = function (token, cb) {
  let user = this;
  jwt.verify(token, "secretToken", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
