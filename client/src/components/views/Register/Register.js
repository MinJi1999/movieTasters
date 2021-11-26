import React from "react";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import Notify from "../../utils/notify/Notify";
import "./index.scss";

function Register(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [birthYear, setBirthYear] = React.useState();
  const [mbti, setMbti] = React.useState("");

  const idHandeler = function (e) {
    setId(e.currentTarget.value);
  };
  const passwordHandeler = function (e) {
    setPassword(e.currentTarget.value);
  };
  const nameHandeler = function (e) {
    setName(e.currentTarget.value);
  };
  const nicknameHandeler = function (e) {
    setNickname(e.currentTarget.value);
  };
  const birthHandeler = function (e) {
    setBirthYear(e.currentTarget.value);
  };
  const mbtiHandeler = function (e) {
    setMbti(e.currentTarget.value);
  };
  const submitHandler = function (e) {
    e.preventDefault();
    let body = {
      id,
      password,
      name,
      nickname,
      birthYear,
      mbti,
    };
    dispatch(registerUser(body))
      .then((res) => {
        if (res.payload.success) {
          setModalText("회원가입이 완료되었습니다.");
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
            props.history.push("/login");
          }, 2500);
        } else {
          if (res.payload.err.keyPattern.id === 1) {
            setModalText("중복된 아이디입니다.");
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
            }, 2500);
            setId("");
          }
          if (res.payload.err.keyPattern.nickname === 1) {
            setModalText("중복된 닉네임입니다.");
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
            }, 2500);
            setNickname("");
          }
        }
      })
      .catch((err) => {
        alert(err, "회원가입에 실패하였습니다. 관리자에게 문의하세요.");
      });
  };
  return (
    <div className="register-area">
      <div className="register-box">
        <form onSubmit={submitHandler}>
          <div className="input-wrap">
            <label className="id-label" htmlFor="user_name">
              이름 :
            </label>
            <input
              className="id-input"
              type="text"
              id="user_name"
              value={name || ""}
              onChange={nameHandeler}
            />
          </div>
          <div className="input-wrap">
            <label className="id-label" htmlFor="user_id">
              아이디 :
            </label>
            <input
              className="id-input"
              type="text"
              id="user_id"
              value={id || ""}
              onChange={idHandeler}
              placeholder="5글자 이상"
            />
          </div>
          <div className="input-wrap">
            <label className="id-label" htmlFor="user_password">
              비밀번호 :
            </label>
            <input
              className="id-input"
              type="password"
              id="user_password"
              value={password || ""}
              onChange={passwordHandeler}
            />
          </div>
          <div className="input-wrap">
            <label className="id-label" htmlFor="user_nickname">
              닉네임 :
            </label>
            <input
              className="id-input"
              type="text"
              id="user_nickname"
              value={nickname || ""}
              onChange={nicknameHandeler}
              placeholder="7글자 이하"
            />
          </div>
          <div className="input-wrap">
            <label className="id-label" htmlFor="user_birth">
              생년 :
            </label>
            <input
              className="id-input"
              placeholder="네자리의 숫자만 입력(예: 1999)"
              type="text"
              id="user_birth"
              value={birthYear || ""}
              onChange={birthHandeler}
            />
          </div>
          <div className="input-wrap mb-50">
            <label className="id-label" htmlFor="user_mbti">
              MBTI :
            </label>
            <input
              className="id-input"
              placeholder="네자리의 소문자 입력(예: intp)"
              type="text"
              id="user_mbti"
              value={mbti || ""}
              onChange={mbtiHandeler}
            />
          </div>
          <div className="button-box">
            <button className="register-button" type="submit">
              회원가입
            </button>
          </div>
        </form>
      </div>
      <Notify visible={visible} text={modalText} />
    </div>
  );
}

export default Register;
