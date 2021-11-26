import React from "react";
import "./index.scss";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import DeleteModal from "../../../utils/modal/Modal";
import { PieChart } from "react-minimal-pie-chart";
import { chartColor } from "../../../utils/genresArray";
import apiClient from "../../../../apiClient";

function MyHome(props) {
  const [resPost, setResPost] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [postId, setPostId] = React.useState("");
  const [chartValue, setChartValue] = React.useState([]);
  const userId = props.match.params.id;
  const chartGenreArray = [];

  React.useEffect(() => {
    apiClient
      .get(`/api/post/getMyPost?id=${userId}&type=single`)
      .then((res) => {
        if (res.data.success) {
          setResPost(res.data.post);
          res.data.post.map((post) => {
            return chartGenreArray.push(post.genre);
          });
          renderChartData(chartGenreArray);
        }
      });
  }, []);

  const closeModal = function () {
    setModalOpen(false);
  };

  const deletePost = function () {
    axios.delete(`/api/post/delete?postId=${postId}`).then((res) => {
      if (res.data.success) {
        closeModal();
        window.location.replace(`/home/${userId}`);
      } else {
        alert("삭제를 실패하였습니다.");
      }
    });
  };

  const renderChartData = (genreArray) => {
    const genreCount = genreArray.reduce((acc, cur) => {
      // 20line을 보면 제가 acc 기본값을 {}으로 지정해준 걸 확인할 수 있습니다.
      // 누산객체에 현재 language가 없으면 0, 있으면 기존 count value
      const genreCount = acc[cur];
      const count = genreCount || 0;

      return {
        ...acc,
        [cur]: count + 1,
      };
    }, {});
    const genreKeys = Object.keys(genreCount);
    const colorCount = chartColor.slice(0, genreKeys.length);
    const value = genreKeys.map((item, index) => ({
      title: item,
      value: genreCount[item],
      color: colorCount[index],
    }));
    setChartValue(value);
  };
  const resMyPost = resPost.map((post) => {
    return (
      <div className="my-post-container" key={post._id}>
        <div className="my-post-box">
          <div className="my-post-title-box">
            <span className="my-post-title">{post.postTitle}</span>
            <div
              className="my-post-edit-button"
              onClick={() => props.history.push(`/post-update/${post._id}`)}
            >
              수정
            </div>
            <div
              className="my-post-delete-button"
              onClick={() => {
                setPostId(post._id);
                setModalOpen(true);
              }}
            >
              삭제
            </div>
          </div>
          <div className="my-post-movie-title">제목: {post.movieTitle}</div>
          <div className="my-post-director">
            감독: {post.director.join(", ")}
          </div>
          <div className="my-post-actor">배우: {post.actor.join(", ")}</div>
          <div className="my-post-genre">장르: {post.genre}</div>
          <div className="my-post-content">{ReactHtmlParser(post.content)}</div>
        </div>
      </div>
    );
  });

  return (
    <>
      {resPost.length > 0 ? (
        <div className="my-post-wrap">
          <div className="genre-chart-area">
            <div className="genre-chart-pie-btn">
              <i className="fas fa-chart-pie"></i>
              <div className="chart-text">그래프</div>
            </div>
            <div className="genre-chart">
              <PieChart
                label={(props) => props.dataEntry.title}
                labelStyle={{ fontSize: "6px", fill: "#ffffff" }}
                data={chartValue}
              />
            </div>
          </div>
          {resMyPost}
          <DeleteModal
            open={modalOpen}
            close={closeModal}
            handleClick={deletePost}
            text={"삭제하시겠습니까?"}
          />
        </div>
      ) : (
        <div className="my-post-wrap">
          <div className="no-post-area">
            <div className="no-post-box">
              <div className="no-post-text">업로드된 포스트가 없습니다.</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyHome;
