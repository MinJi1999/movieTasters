const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");
const { auth } = require("../middleware/auth");

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

router.get("/get", (req, res) => {
  Post.find()
    .sort({ _id: -1 })
    .populate("writer")
    .exec((err, postInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, postInfo });
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
    .sort({ _id: -1 })
    .populate("writer")
    .exec((err, postInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, postInfo });
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
  // Post.find({_id: {$in: productIds }})
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

module.exports = router;
