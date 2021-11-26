import React from "react";
import "./notify.scss";

export default function Notify(props) {
  const visible = props.visible;
  return (
    <>
      {visible ? (
        <div className="notify-bg">
          <div className="notify-box">{props.text}</div>
        </div>
      ) : null}
    </>
  );
}
