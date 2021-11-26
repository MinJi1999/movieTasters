import React from "react";
import { loginUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import "./index.scss";

function Login(props) {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const idHandeler = function (e) {
    setId(e.currentTarget.value);
  };
  const passwordHandeler = function (e) {
    setPassword(e.currentTarget.value);
  };
  const submitHandler = function (e) {
    e.preventDefault();
    let body = {
      id,
      password,
    };
    dispatch(loginUser(body)).then((res) => {
      if (!res.payload.loginSuccess) {
        alert(res.payload.message);
      } else {
        props.history.push("/");
      }
    });
  };
  const moveToRegister = function () {
    props.history.push("/register");
  };
  return (
    <div className="login-area">
      <div className="login-box">
        <form onSubmit={submitHandler}>
          <div className="id-form-box">
            <label className="id-label" htmlFor="user_id">
              아이디 :
            </label>
            <input
              className="id-input"
              type="text"
              id="user_id"
              value={id  || ""}
              onChange={idHandeler}
            />
          </div>
          <div className="password-form-box">
            <label className="password-label" htmlFor="user_password">
              비밀번호 :
            </label>
            <input
              className="password-input"
              type="password"
              id="user_password"
              value={password  || ""}
              onChange={passwordHandeler}
            />
          </div>
          <div className="button-box">
            <button className="login-button" type="submit">
              로그인
            </button>
            <button className="register-button" onClick={moveToRegister}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
