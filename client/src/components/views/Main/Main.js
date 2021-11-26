import React from "react";
import axios from "axios";
import "./index.scss";
import GenreCheckbox from "../../utils/genreCheckbox/GenreCheckbox";

function Main(props) {
  const [postDatas, setPostDatas] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/api/post/getPost")
      .then((res) => {
        if (res.data.success) {
          setPostDatas(res.data.post);
        }
      })
      .catch((err) => alert(err, "포스트를 불러오는데 실패했소."));
  }, []);

  const filteredPost = function (body) {
    const filteredGenre = {
      genre: body,
    };
    axios
      .post("/api/post/findByGenre", filteredGenre)
      .then((res) => {
        if (res.data.success) {
          // console.log(res);
          setPostDatas(res.data.post);
        }
      })
      .catch((err) => alert(err, "포스트를 불러오는데 실패했소."));
  };

  const renderPost = postDatas.map((post, index) => {
    return (
      <div className="post-container" key={post._id}>
        <div className="post-index" key={post._id}>
          No.{index + 1}
        </div>
        <div
          className="post-box"
          key={index}
          onClick={() => props.history.push(`/post/${post._id}`)}
        >
          <div className="content-container">
            <div className="movie-post-title">
              "
              {post.postTitle.length > 14
                ? `${post.postTitle.slice(0, 14)}···`
                : post.postTitle}
              "
            </div>
            <div className="post-info">
              <span className="writer-nickname">
                ☞ {post.writer.nickname}님의
              </span>
              <span className="movie-movie-title"> ⌜{post.movieTitle}⌟ </span>
              <span className="writer-nickname"> 포스팅</span>
            </div>
            <table
              border="1"
              width="90%"
              height="auto"
              className="movie-info-table"
            >
              <tbody>
                <tr>
                  <td
                    align="center"
                    className="movie-director"
                    style={{ padding: "5px", width: "90px" }}
                  >
                    감독
                  </td>
                  <td className="movie-director">{post.director.join(", ")}</td>
                </tr>
                <tr>
                  <td
                    align="center"
                    className="movie-actor"
                    style={{ padding: "5px", width: "90px" }}
                  >
                    배우
                  </td>
                  <td className="movie-actor">
                    {post.actor.length > 15
                      ? `${post.actor.slice(0, 15)}···`
                      : post.actor.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    className="movie-genre"
                    style={{ padding: "5px", width: "90px" }}
                  >
                    장르
                  </td>
                  <td className="movie-genre">{post.genre}</td>
                </tr>
              </tbody>
            </table>
            {/* <div className="movie-content">{ReactHtmlParser(post.content)}</div> */}
          </div>
          <div className="img-container">
            <div className="grey-noise"></div>
            <div className="grey-noise"></div>
            <div className="grey-noise"></div>
            <img
              src={post.images[0]}
              alt="movie-still-cut"
              className="movie-image"
            ></img>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="main-area">
      <GenreCheckbox handleFilter={(genre) => filteredPost(genre)} />
      {postDatas.length > 0 ? (
        <>{renderPost}</>
      ) : (
        <div className="no-post-area">
          <div className="no-post-box">
            <div className="no-post-text">업로드된 포스트가 없습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;