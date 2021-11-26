import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getPostById } from "../../../_actions/user_action";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Notify from "../../utils/notify/Notify";
import FileUpload from "../../utils/fileUpload/FileUpload";
import { genres } from "../../utils/genresArray";
import "./index.scss";

function PostUpdate(props) {
  const dispatch = useDispatch();
  const [notify, setNotify] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [content, setContent] = React.useState("");
  // const [genre, setGenre] = React.useState("");
  // const [genreCount, setGenreCount] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [postData, setPostData] = React.useState({
    movieTitle: "",
    postTitle: "",
    genre: "",
    actor: [],
    director: [],
    images: [],
  });
  const postId = props.match.params.postId;

  React.useEffect(() => {
    dispatch(getPostById(postId)).then((res) => {
      if (res.payload.success) {
        setPostData(res.payload.post[0]);
      }
    });
  }, [postId]);

  const updateImage = (newImage) => {
    postData.images = newImage;
  };

  const updatePosts = function () {
    const updatedPost = {
      postId,
      writer: props.user.userData._id,
      movieTitle: postData.movieTitle,
      postTitle: postData.postTitle,
      content: content,
      genre: postData.genre,
      director: postData.director,
      actor: postData.actor,
      images: postData.images,
    };

    if (postData.postTitle.length < 25) {
      // if (genreCount > 1) {
      //   setNotify("하나의 장르만 선택 가능합니다.");
      //   setVisible(true);
      //   setTimeout(() => {
      //     setVisible(false);
      //   }, 2500);
      // } else {
      axios({
        url: "/api/post/update",
        method: "put",
        data: updatedPost,
      })
        .then((res) => {
          if (res.status === 200) {
            setNotify("수정이 완료되었습니다.");
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
              props.history.push(`/home/${props.user.userData._id}`);
            }, 2500);
          }
        })
        .catch((err) => console.log(err));
      // }
    } else alert("포스트 제목의 최대 길이는 25글자입니다.");
  };

  //최종값 type이 array여야 하는 값들을 위한 handler
  const arrayValueHandler = (e) => {
    const { name, value } = e.currentTarget;
    const text = deleteSpace(value);
    setPostData({ ...postData, [name]: text });
  };

  const inputHandler = (e) => {
    const { name, value } = e.currentTarget;
    setPostData({ ...postData, [name]: value });
  };

  const contentHandler = (e) => {
    setContent(e);
  };

  // const genreHandler = (checked, id) => {
  //   if (checked) {
  //     postData.genre = id;
  //     // console.log("checked", genre);
  //     setGenreCount(genreCount + 1);
  //   } else {
  //     // console.log("unchecked" + genre);
  //     setGenreCount(genreCount - 1);
  //   }
  // };

  const genreRender = genres.map((item, index) => {
    return (
      <div key={index}>
        <input
          type="checkbox"
          id={item}
          checked={postData.genre === item ? true : false}
          readOnly
          // defaultChecked={ }
          // onChange={(e) => {
          //   genreHandler(e.currentTarget.checked, item);
          // }}
        />
        <label htmlFor={item}>{item}</label>
      </div>
    );
  });

  const deleteSpace = function (text) {
    // const deleteSpace = text.replace(/(\s*)/g, "");
    const array = text.split(",");
    return array;
  };

  return (
    <div className="upload-area">
      <Notify visible={visible} text={notify} />
      <div className="form-wrapper">
        <div className="upload-box">
          <table border="1" width="50%" className="movie-info-table">
            <tbody>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>포스트 제목</label>
                </td>
                <td>
                  <input
                    value={postData.postTitle || ""}
                    className="post-title-input"
                    type="text"
                    placeholder="포스트 제목(25자 이하)"
                    name="postTitle"
                    onChange={inputHandler}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>영화 제목</label>
                </td>
                <td>
                  <input
                    value={postData.movieTitle || ""}
                    className="movie-title-input"
                    type="text"
                    placeholder="영화 제목"
                    name="movieTitle"
                    onChange={inputHandler}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>감독</label>
                </td>
                <td>
                  <input
                    value={postData.director || ""}
                    className="director-input"
                    type="text"
                    placeholder="2명 이상일 경우 반점(,)으로 구분"
                    name="director"
                    onChange={arrayValueHandler}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>배우</label>
                </td>
                <td>
                  <input
                    value={postData.actor || ""}
                    className="actor-input"
                    type="text"
                    placeholder="2명 이상일 경우 반점(,)으로 구분"
                    name="actor"
                    onChange={arrayValueHandler}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>장르</label>
                </td>
                <td style={{ padding: "10px" }}>
                  <div className="genreCheckbox">{genreRender}</div>
                </td>
              </tr>
            </tbody>
          </table>
          <FileUpload
            refreshFunction={updateImage}
            prevImage={postData.images[0]}
          />
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={postData.content || ""}
          onChange={(event, editor) => {
            const data = editor.getData();
            contentHandler(data);
          }}
        />
      </div>
      <div className="button-container">
        <button className="submit-button" onClick={updatePosts}>
          수정하기
        </button>
      </div>
    </div>
  );
}

export default PostUpdate;
