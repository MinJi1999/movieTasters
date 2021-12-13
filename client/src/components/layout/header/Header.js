import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Notify from "../../utils/notify/Notify";
import "./index.scss";

function Header(props) {
  const [userId, setUserId] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const user = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user.userData) {
      setUserId(user.userData._id);
    }
  }, [user]);

  const handleLogout = function () {
    axios
      .get("/api/user/logout")
      .then(() => {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          props.history.push("/");
        }, 2500);
      })
      .catch((err) => {
        alert(err, "로그아웃에 실패했습니다. 관리자에게 문의하세요");
      });
  };

  const urlToHome = function () {
    props.history.push("/");
  };

  return (
    <>
      <div className="nav-bar-container">
        <div className="test" onClick={urlToHome}>
          <div className="title-container">
            <h1 className="main-title" style={{ marginBottom: "5px" }}>
              :영화 미식가들
            </h1>
            <h1 className="main-title">:Movie Tasters</h1>
          </div>
        </div>
        <div className="nav-bar">
          {user.userData && !user.userData.isAuth ? (
            <>
              <Link to="/login" className="nav-link">
                로그인
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to={`/home/${userId}`} className="nav-link">
                나의 페이지
              </Link>
              {/* <Link to="/post-upload">Post Upload</Link> */}
              <div onClick={handleLogout} className="nav-link">
                로그아웃
              </div>
            </>
          )}
        </div>
      </div>
      <Notify visible={visible} text={"로그아웃됐습니다."} />
    </>
  );
}

export default withRouter(Header);
