import { Route, Switch } from "react-router-dom";
import Login from "./components/views/Login/Login";
import Register from "./components/views/Register/Register";
import Main from "./components/views/Main/Main";
import PostUpload from "./components/views/PostUpload/PostUpload";
import PostUpdate from "./components/views/PostUpdate/PostUpdate";
import Detail from "./components/views/Detail/Detail";
import MbtiRecommend from "./components/views/MbtiRecommend/MbtiRecommend";
import MyHome from "./components/views/aboutMember/myHome/myHome";
import GenreGraph from "./components/views/aboutMember/genreGraph/genreGraph";
import MyInfo from "./components/views/aboutMember/myInfo/MyInfo";
import Layout from "./components/layout/Layout";
import Auth from "./hoc/Auth";

function App() {
  return (
    <>
        <Layout>
          <Switch>
            <Route exact path="/" component={Auth(Main, null)} />
            <Route path="/login" component={Auth(Login, false)} />
            <Route path="/register" component={Auth(Register, false)} />
            <Route path="/post-upload" component={Auth(PostUpload, true)} />
            <Route
              path="/post-update/:postId"
              component={Auth(PostUpdate, true)}
            />
            <Route path="/post/:postId" component={Auth(Detail, null)} />
            <Route
              path="/mbti-recommend"
              component={Auth(MbtiRecommend, true)}
            />
            <Route path="/home/:id" component={Auth(MyHome, true)} />
            <Route path="/genre-graph" component={Auth(GenreGraph, true)} />
            <Route path="/my-info" component={Auth(MyInfo, true)} />
          </Switch>
        </Layout>
    </>
  );
}

export default App;
