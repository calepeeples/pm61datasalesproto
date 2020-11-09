import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
// import { UserContext } from "./providers/UserProvider";
// import { auth } from "../firebase";
import QuestionDataService from "../services/pm61proto.service";
import { Drawer, Table, Tag, Button, Input, PageHeader } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar/PM61Sidebar";
import Question from "./question";

import QuestionCard from "./QuestionCard";
import QuestionDetails from "../pages/QuestionDetails";

const { Column } = Table;
const { Search } = Input;

export default class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
    this.removeAllQuestions = this.removeAllQuestions.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      questions: [],
      currentQuestion: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    QuestionDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    QuestionDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let questions = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      questions.push({
        key: key,
        title: data.title,
        createddate: data.createddate,
        createdby: data.createdby,
        questiontags: data.questiontags,
        rating: data.rating,
        answers: data.answers,
        updated: data.updated,
        published: data.published,
      });
    });

    this.setState({
      questions: questions,
    });
  }

  refreshList() {
    this.setState({
      currentQuestion: null,
      currentIndex: -1,
    });
  }

  setActiveQuestion(question, index) {
    this.setState({
      currentQuestion: question,
      currentIndex: index,
    });
  }

  removeAllQuestions() {
    QuestionDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  state = { visible: false };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { questions, currentQuestion, currentIndex } = this.state;

    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Questions"
          //breadcrumb={{ routes }}
          subTitle=""
        />
        <div className="list row">
          <div class="whats-your-question">
            <QuestionCard />
          </div>
          <div className="col-md-6">
            <Table
              dataSource={questions}
              onChange={this.handleChange}
              title={() => (
                <div style={{ display: "flex", margin: "8px" }}>
                  <Search
                    placeholder="Find a question..."
                    //onSearch={onSearch}
                    style={{ width: "40%" }}
                  />
                  <Button
                    type="primary"
                    onClick={this.showDrawer}
                    icon={<FontAwesomeIcon icon={["fal", "filter"]} />}
                    style={{ marginLeft: "8px" }}
                  >
                    Advanced Filter
                  </Button>
                </div>
              )}
              footer={() => "Total Questions:" + questions.length}
              scroll={{ x: 1300 }}
            >
              <Column
                title=""
                dataIndex=""
                key=""
                render={() => <FontAwesomeIcon icon={["fal", "star"]} />}
              />
              <Column
                title="Question"
                dataIndex="title"
                key="title"
                render={(title) => (
                  <Button
                    onClick={() => console.log("question: " + title)}
                    type="link"
                  >
                    <Link
                      to={{
                        pathname: "/pages/Questions/" + title,
                      }}
                    >
                      {title}
                    </Link>
                  </Button>
                )}
                sorter={(a, b) => a.title.length - b.title.length}
              />
              <Column
                title="Asked By"
                dataIndex="createdby"
                key="createdby"
                filters={[
                  {
                    text: "cale@pm61data.com",
                    value: "cale@pm61data.com",
                  },
                  {
                    text: "puneet@pm61data.com",
                    value: "puneet@pm61data.com",
                  },
                  {
                    text: "kaycee@pm61data.com",
                    value: "kaycee@pm61data.com",
                  },
                  {
                    text: "shuo@pm61data.com",
                    value: "shuo@pm61data.com",
                  },
                ]}
                onFilter={(value, record) =>
                  record.createdby.indexOf(value) === 0
                }
                sorter={(a, b) => a.createdby.length - b.createdby.length}
              />
              <Column
                title="Rating"
                dataIndex="rating"
                key="rating"
                render={(rating) => {
                  let stars = [];
                  let starnum = parseInt(rating, 10);
                  for (let i = 0; i < starnum; i++) {
                    stars.push(
                      <FontAwesomeIcon
                        icon={["fas", "star"]}
                        className="star-color"
                      />
                    );
                  }
                  return stars;
                }}
                sorter={(a, b) => a.rating - b.rating}
              />
              <Column
                title="Answers"
                dataIndex="answers"
                key="answers"
                sorter={(a, b) => a.answers - b.answers}
              />
              <Column
                title="Tags"
                dataIndex="questiontags"
                key="questiontags"
                render={(questiontags) => {
                  let qArr = questiontags.split(",");
                  let t = qArr.map((x) => <Tag color="blue">{x}</Tag>);
                  return t;
                }}
              />
              <Column
                title="Created"
                dataIndex="createddate"
                key="createddate"
                sorter={(a, b) => a.createddate - b.createddate}
              />
              <Column
                title="Updated"
                dataIndex="updated"
                key="updated"
                sorter={(a, b) => a.updated - b.title}
              />
            </Table>
            <Drawer
              title="Basic Drawer"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <Sidebar />
            </Drawer>
            <ul className="list-group">
              {questions &&
                questions.map((question, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveQuestion(question, index)}
                    key={index}
                  >
                    {question.title}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllQuestions}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentQuestion ? (
              <Question
                question={currentQuestion}
                refreshList={this.refreshList}
              />
            ) : (
              <div>
                <br />
                <p>Please click on a Question...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
