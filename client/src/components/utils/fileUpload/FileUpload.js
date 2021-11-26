import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function FileUpload(props) {
  const [loading, setLoading] = React.useState(false);
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
    console.log(formData);
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
        justifyContent: "space-between",
      }}
    >
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      {loading ? (
        <h2
          style={{
            color: "rgba(83, 83, 83, 0.5)",
            margin: "100px auto",
            width: "150px",
            height: "50px",
            textAlign: "center",
            backgroundColor: "rgb(200, 200, 200, 0.4)",
          }}
        >
          . . .
        </h2>
      ) : (
        <div
          onClick={() => deleteHandler}
          style={{
            display: "flex",
            width: "350px",
            height: "240px",
            overflowX: "scroll",
          }}
        >
          <img
            style={{
              minWidth: "320px",
              width: "320px",
              height: "220px",
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
