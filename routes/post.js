const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");
const { auth } = require("../middleware/auth");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/save", (req, res) => {
  const post = new Post(req.body);
  post.save((err) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

router.get("/getPost", (req, res) => {
  Post.find()
    .sort({ updatedAt: -1 })
    .populate("writer")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, post });
      }
    });
});

router.get("/getMyPost", (req, res) => {
  const type = req.query.type;
  const userId = req.query.id;
  if (type === "array") {
    const ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }
  Post.find({ writer: { $in: userId } })
    .sort({ updatedAt: -1 })
    .populate("writer")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, post });
      }
    });
});

router.get("/post_by_id", (req, res) => {
  const type = req.query.type;
  const postId = req.query.id;
  if (type === "array") {
    const ids = req.query.id.split(",");
    postId = ids.map((i) => {
      return item;
    });
  }
  Post.find({ _id: postId })
    .populate("writer")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, post });
      }
    });
});

router.put("/update", (req, res) => {
  const postId = req.body.postId;
  const post = req.body;
  Post.findOneAndUpdate(
    { _id: postId },
    post,
    { upsert: true },
    function (err, post) {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, post });
      }
    }
  );
});

router.delete("/delete", (req, res) => {
  const postId = req.query.postId;
  Post.deleteOne({ _id: postId }, function (err, post) {
    if (err) {
      return res.status(400).json({ success: false, err });
    } else {
      return res.status(200).json({ success: true, post });
    }
  });
});

router.post("/findByGenre", (req, res) => {
  let findArgs = {};
  for (let key in req.body) {
    if (req.body[key].length > 0) {
      findArgs[key] = req.body[key];
    }
  }
  Post.find(findArgs)
    .populate("writer")
    .sort({ updatedAt: -1 })
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, post });
      }
    });
});

module.exports = router;
