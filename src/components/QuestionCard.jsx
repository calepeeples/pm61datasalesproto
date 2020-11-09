import React, { useContext } from "react";
import { UserContext } from "./providers/UserProvider";
//import { auth } from "../firebase";
import AddQuestion from "./Addquestion";
import { Switch, Route, Link } from "react-router-dom";
//import QuestionDataService from "../services/pm61proto.service";
import { Card, Typography } from "antd";

const { Title } = Typography;
const { Meta } = Card;

const QuestionCard = () => {
  const user = useContext(UserContext);
  //const { displayName } = user;
  console.log(user);
  const { photoURL, displayName, email } = user;

  return (
    <Card
      // title="Hi, Cale. Welcome back."
      // description="This is the description"
      bordered={false}
    >
      <Meta
        //avatar={<Avatar src={avatarImage} />}
        title={"Hi, " + displayName + " . Welcome back!"}
      />
      <div className="whats-your-question-askdiv">
        <Switch>
          <Route exact path="/pages/Questions" component={AddQuestion} />
          <Link to="/">
            <Title level={2} className="question-card-prompt">
              What's your question?
            </Title>
          </Link>
        </Switch>
      </div>
    </Card>
  );
};

export default QuestionCard;
