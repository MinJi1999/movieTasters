import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function FileUpload(props) {
  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState([]);

  React.useEffect(() => {
    if (props.prevImage) {
      setImage(props.prevImage);
    } else {
      setImage([]);
    }
  }, [props.prevImage]);

  const dropHandler = (files) => {
    const formData = new FormData();
    formData.append("upload_preset", "movieTasters");
    formData.append("file", files[0]);
    axios
      .post(
        "https://api.cloudinary.com/v1_1/inthefuture/image/upload",
        formData
      )
      .then((res) => {
        setLoading(false);
        setImage(res.data.secure_url);
        props.refreshFunction(res.data.secure_url);
      })
      .catch((err) => alert(err, "파일을 저장하는데 실패했습니다."));
  };
  const deleteHandler = (image) => {
    const currentIndex = image.indexOf(image);
    let newImage = [...image];
    newImage.splice(currentIndex, 1);
    setImage(newImage);
    setLoading(true);
    props.refreshFunction(newImage);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
      }}
    >
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              height: 200,
              border: "1px solid #8c8c8c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <i
              class="fas fa-plus"
              style={{
                fontSize: "50px",
                color: "rgb(114 114 114)",
              }}
            ></i>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      {loading ? (
        <div style={{ border: "1px solid #8c8c8c" }}>
          <h2
            style={{
              color: "rgba(83, 83, 83, 0.5)",
              margin: "80px auto",
              width: "100px",
              height: "40px",
              textAlign: "center",
              backgroundColor: "rgb(200, 200, 200, 0.4)",
            }}
          >
            . . .
          </h2>
        </div>
      ) : (
        <div
          onClick={() => deleteHandler}
          style={{
            display: "flex",
            height: "100%",
            overflowX: "scroll",
          }}
        >
          <img
            style={{
              minWidth: "320px",
              height: "100%",
            }}
            src={image}
            alt="movie stillcut"
          />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
