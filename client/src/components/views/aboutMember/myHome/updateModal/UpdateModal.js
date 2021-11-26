import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

function UpdateModal({ postId, open }) {
  console.log(postId);
  return (
    <>
      {open ? (
        <div className="modal-box">
          <div className="modal-list">
            <Link to={`/post-update/${postId}`} className="link-to-update">
              수정
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UpdateModal;
