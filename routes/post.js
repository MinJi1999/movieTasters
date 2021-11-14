const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");
const { auth } = require("../middleware/auth");

router.post("/savePost", (req, res) => {
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
  let postId = req.query.id;

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

module.exports = router;
