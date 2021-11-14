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
      type: Array,
    },
    director: {
      type: Array,
    },
    actor: {
      type: Array,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
