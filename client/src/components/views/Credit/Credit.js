import React from "react";
import axios from "axios";
import "./index.scss";
import apiClient from "../../../apiClient";

function Credit({ postId, open }) {
  // console.log(actor);
  const [post, setPost] = React.useState({});

  React.useEffect(() => {
    if (postId) {
      apiClient
        .get(`/api/post/post_by_id?id=${postId}&type=single`)
        .then((res) => {
          setPost(res.data.post[0]);
          console.log(post);
        });
    }
  }, []);

  const readerActor = post.actor.map((item) => {
    return <div key={item._id}>{item}</div>;
  });
  if (!post) return null;
  return (
    <>
      {open ? (
        <div className="black-bg">
          <div className="credit-text-box">
            <div className="credit-text">{post.movieTitle}</div>
            <div className="credit-text">장르&emsp;{post.genre}</div>
            <div className="credit-text">감독&emsp;{post.director}</div>
            <div className="credit-text">배우&emsp;{readerActor}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Credit;
