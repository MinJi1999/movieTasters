import React from "react";
import { auth } from "../_actions/user_action";
import { useDispatch, useSelector } from "react-redux";
import Notify from "../components/utils/notify/Notify";

function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const user = useSelector((state) => state.user);
    const [visible, setVisible] = React.useState(false);
    const dispatch = useDispatch();
    React.useEffect(() => {
      dispatch(auth()).then((res) => {
        if (!res.payload.isAuth) {
          if (option) {
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
              props.history.push("/login");
            }, 2500);
          }
        } else {
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, [props, dispatch]);
    return (
      <>
        <Notify
          visible={visible}
          text={"로그인이 필요합니다. 로그인창으로 이동합니다."}
        />
        <SpecificComponent {...props} user={user} />
      </>
    );
  }
  return AuthenticationCheck;
}

export default Auth;
