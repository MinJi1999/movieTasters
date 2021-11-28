import React from "react";
import ReactHtmlParser from "html-react-parser";
import "./index.scss";
import { useDispatch } from "react-redux";
import { getPostById } from "../../../_actions/user_action";

function Detail(props) {
  const [resPost, setResPost] = React.useState([]);
  const [actor, setActor] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const postId = props.match.params.postId;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPostById(postId))
      .then((res) => {
        if (res.payload.success) {
          setResPost(res.payload.post);
          setActor(res.payload.post[0].actor);
        }
      })
      .catch((err) => console.log(err));
    return function cleanup() {
      setOpen(false);
    };
  }, [postId]);

  setTimeout(() => {
    setOpen(false);
  }, 7000);

  const renderPost = resPost.map((post, index) => {
    return (
      <div className="post-detail-wrap" key={index}>
        <div className="detail-left-section">
          <div className="post-detail-title">{post.postTitle}</div>
        </div>
        <div className="detail-right-section">
          <div className="detail-page-title">제목: {post.movieTitle}</div>
          <div className="detail-page-director">감독: {post.director}</div>
          <div className="detail-page-actor">배우: {post.actor.join(", ")}</div>
          <div className="detail-page-genre">장르: {post.genre}</div>
          <div className="detail-page-content">
            {ReactHtmlParser(post.content)}
          </div>
          <div style={{ marginTop: "100px" }}>
            <span className="detail-page-nickname">
              — {post.writer.nickname}
            </span>
            <span className="detail-page-posted-text">님의 포스팅</span>
          </div>
        </div>
      </div>
    );
  });

  const readerActor = actor.map((item) => {
    return (
      <div key={item._id} style={{ marginBottom: "10px" }}>
        배우&emsp;{item.trim()}
      </div>
    );
  });

  const renderCredit = resPost.map((item) => {
    return (
      <div className="credit-text-box" key={item._id}>
        <div className="credit-title-text center">{item.movieTitle}</div>
        <div className="credit-text">장르&emsp;{item.genre}</div>
        <div className="credit-text">감독&emsp;{item.director}</div>
        <div className="credit-text">{readerActor}</div>
      </div>
    );
  });

  if (!resPost) return null;
  return (
    <>
      {open ? (
        <div className="black-bg">{renderCredit}</div>
      ) : (
        <div className="post-detail-area">{renderPost}</div>
      )}
    </>
  );
}

export default Detail;
