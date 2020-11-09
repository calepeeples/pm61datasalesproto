import React, { useContext } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import Application from "./components/Application";
//import Header from "./components/Header/PM61Header";
// import Footer from "./components/Footer/PM61Footer";
// import { Layout } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import "./App.less";
import "animate.css";

import UserProvider from "./components/providers/UserProvider";
// import { UserContext } from "./components/providers/UserProvider";
// import SignIn from "./components/SignIn";
// import QuestionsList from "./components/Listquestions";
// import AddQuestion from "./components/Addquestion";
//import QuestionCard from "./components/QuestionCard";

library.add(fal, fas);

// const { Content } = Layout;

function App() {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;
