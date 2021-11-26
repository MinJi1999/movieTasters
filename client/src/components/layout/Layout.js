import React from "react";
import { withRouter } from "react-router-dom";
import Header from "./header/Header";
import HeaderForHome from "./header/HeaderForHome";
import Footer from "./footer/Footer";

function Layout(props) {
  const [pathName, setPathName] = React.useState("");
  React.useEffect(() => {
    setPathName(props.location.pathname);
  }, [props]);
  return (
    <>
      {pathName.includes("home") ? <HeaderForHome /> : <Header />}
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default withRouter(Layout);
