import React, { useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import { UserContext } from "./providers/UserProvider";
import Header from "./Header/PM61Header";
import Footer from "./Footer/PM61Footer";
import { Layout } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import "../App.less";

import SignIn from "./SignIn";
import QuestionsList from "./Listquestions";
import AddQuestion from "./Addquestion";
import QuestionDetails from "../pages/QuestionDetails";

library.add(fal, fas);

const { Content } = Layout;

function Application() {
  const user = useContext(UserContext);
  //console.log(user);
  return user ? (
    <UserProvider>
      <Layout className="pm61-layout">
        <Header />
        <Content style={{ padding: "0 50px", paddingTop: "65px" }}>
          <Layout>
            <Content className="site-layout-content">
              <Switch>
                <Route
                  exact
                  path={["/", "/pages/Questions/:id"]}
                  component={QuestionDetails}
                />
                <Route
                  exact
                  path={["/", "/pages/Questions"]}
                  component={QuestionsList}
                />
                // <Route exact path="/pages/Answers" component={AddQuestion} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer />
      </Layout>
    </UserProvider>
  ) : (
    <SignIn />
  );
}

export default Application;
