import React from "react";
import { updateUser } from "../../../../_actions/user_action";
import { useDispatch } from "react-redux";
import Notify from "../../../utils/notify/Notify";
import "./index.scss";

function MyInfo(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});
  const [newUserInfo, setNewUserInfo] = React.useState({});

  React.useEffect(() => {
    if (props.user.userData) {
      setUserInfo(props.user.userData);
    }
  }, [props]);

  const inputHandler = (e) => {
    const { name, value } = e.currentTarget;
    setUserInfo({ ...userInfo, [name]: value });
    setNewUserInfo({ ...newUserInfo, [name]: value });
  };

  const submitHandler = function (e) {
    e.preventDefault();
    newUserInfo["_id"] = userInfo._id;
    dispatch(updateUser(newUserInfo))
      .then((res) => {
        if (res.payload.success) {
          setModalText("회원 수정이 완료되었습니다.");
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
            window.location.replace("/my-info");
          }, 2500);
        } else {
          if (res.payload.err.keyPattern.id === 1) {
            setModalText("중복된 아이디입니다.");
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
            }, 2500);
            userInfo.id = "";
          }
          if (res.payload.err.keyPattern.nickname === 1) {
            setModalText("중복된 닉네임입니다.");
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
            }, 2500);
            userInfo.nickname = "";
          }
        }
      })
      .catch((err) => {
        alert(err, "회원 수정에 실패하였습니다. 관리자에게 문의하세요.");
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
              name="name"
              value={userInfo.name || ""}
              onChange={inputHandler}
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
              name="id"
              value={userInfo.id || ""}
              onChange={inputHandler}
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
              name="password"
              value={userInfo.password || ""}
              onChange={inputHandler}
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
              name="nickname"
              value={userInfo.nickname || ""}
              onChange={inputHandler}
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
              name="birthYear"
              value={userInfo.birthYear || ""}
              onChange={inputHandler}
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
              name="mbti"
              value={userInfo.mbti || ""}
              onChange={inputHandler}
            />
          </div>
          <div className="button-box">
            <button className="register-button" type="submit">
              수정
            </button>
          </div>
        </form>
      </div>
      <Notify visible={visible} text={modalText} />
    </div>
  );
}

export default MyInfo;
