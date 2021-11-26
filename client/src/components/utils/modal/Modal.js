import React from "react";
import "./modal.scss";

export default function Modal({ open, close, handleClick, text }) {
  return (
    <>
      {open ? (
        <div className="modal-bg">
          <div className="modal-box">
            <div className="modal-text">{text}</div>
            <div className="button-box">
              <button className="no-button" onClick={close}>
                아니오
              </button>
              <button className="yes-button" onClick={() => handleClick()}>
                예
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
