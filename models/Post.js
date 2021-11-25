const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User", //이거는 writer를 통해 User정보를 보여주겠다는 것
    },
    movieTitle: {
      type: String,
    },
    postTitle: {
      type: String,
      maxlength: 25,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    modifiedAt: {
      type: Date,
    },
    genre: {
      type: String,
    },
    director: {
      type: Array,
    },
    actor: {
      type: Array,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
