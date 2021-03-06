import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./index.scss";
import { genres } from "../../utils/genresArray";
import Notify from "../../utils/notify/Notify";
import FileUpload from "../../utils/fileUpload/FileUpload";
import apiClient from "../../../apiClient";

function PostUpload(props) {
  const [notify, setNotify] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [movieTitle, setMovieTitle] = React.useState("");
  const [postTitle, setPostTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [genreCount, setGenreCount] = React.useState(0);
  const [director, setDirector] = React.useState([]);
  const [actor, setActor] = React.useState([]);
  const [images, setImages] = React.useState([]);

  const movieTitleHandler = (e) => {
    const currentValue = e.target.value;
    setMovieTitle(currentValue);
  };

  const postTitleHandler = (e) => {
    const currentValue = e.target.value;
    setPostTitle(currentValue);
  };

  const directorHandler = (e) => {
    const currentValue = e.target.value;
    const directors = deleteSpace(currentValue);
    setDirector(directors);
  };

  const actorHandler = (e) => {
    const currentValue = e.target.value;
    const actors = deleteSpace(currentValue);
    setActor(actors);
  };

  const contentHandler = (e) => {
    setContent(e);
  };

  const genreHandler = (checked, id) => {
    if (checked) {
      setGenre(id);
      setGenreCount(genreCount + 1);
    } else {
      setGenreCount(genreCount - 1);
    }
  };

  const genreRender = genres.map((item, index) => {
    return (
      <div key={index}>
        <input
          type="checkbox"
          id={item}
          onChange={(e) => {
            genreHandler(e.currentTarget.checked, item);
          }}
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

  const updateImage = (newImage) => {
    setImages(newImage);
  };

  const savePosts = function () {
    const post = {
      writer: props.user.userData._id,
      movieTitle,
      postTitle,
      content,
      genre,
      director,
      actor,
      images,
    };
    if (postTitle.length < 25) {
      if (genreCount > 1) {
        setNotify("????????? ????????? ?????? ???????????????.");
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 2500);
      } else {
        apiClient({
          url: "/api/post/save",
          method: "post",
          data: post,
        })
          .then((res) => {
            if (res.status === 200) {
              setNotify("???????????? ?????????????????????.");
              setVisible(true);
              setTimeout(() => {
                setVisible(false);
                props.history.push(`/home/${props.user.userData._id}`);
              }, 2500);
            }
          })
          .catch((err) => console.log(err));
      }
    } else alert("????????? ????????? ?????? ????????? 25???????????????.");
  };

  return (
    <div className="upload-area">
      <Notify visible={visible} text={notify} />
      <div className="form-wrapper">
        <div className="upload-box">
          <table border="1" width="55%" className="movie-info-table">
            <tbody>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>????????? ??????</label>
                </td>
                <td>
                  <input
                    className="post-title-input"
                    type="text"
                    placeholder="????????? ??????(25??? ??????)"
                    name="post-title"
                    onChange={postTitleHandler}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>?????? ??????</label>
                </td>
                <td>
                  <input
                    className="movie-title-input"
                    type="text"
                    placeholder="?????? ??????"
                    name="movie-title"
                    onChange={movieTitleHandler}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>??????</label>
                </td>
                <td>
                  <input
                    className="director-input"
                    type="text"
                    placeholder="2??? ????????? ?????? ??????(,)?????? ??????"
                    name="director"
                    onChange={directorHandler}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>??????</label>
                </td>
                <td>
                  <input
                    className="actor-input"
                    type="text"
                    placeholder="2??? ????????? ?????? ??????(,)?????? ??????"
                    name="actor"
                    onChange={actorHandler}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "5px", width: "90px" }}>
                  <label>??????</label>
                </td>
                <td style={{ padding: "10px" }}>
                  <div className="genre-checkbox">{genreRender}</div>
                </td>
              </tr>
            </tbody>
          </table>
          <FileUpload refreshFunction={updateImage} />
        </div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            contentHandler(data);
          }}
        />
      </div>
      <div className="button-container">
        <button className="submit-button" onClick={savePosts}>
          ????????????
        </button>
      </div>
    </div>
  );
}

export default PostUpload;
