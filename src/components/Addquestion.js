import React, { Component } from "react";
import { Link } from "react-router-dom";
import QuestionDataService from "../services/pm61proto.service";
import {
  Alert,
  Input,
  List,
  Collapse,
  Button,
  Space,
  Tag,
  Typography,
} from "antd";

const { Panel } = Collapse;

export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCreateddate = this.onChangeCreateddate.bind(this);
    this.onChangeCreatedby = this.onChangeCreatedby.bind(this);
    this.onChangeQuestiontags = this.onChangeQuestiontags.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeAnswers = this.onChangeAnswers.bind(this);
    this.onChangeUpdated = this.onChangeUpdated.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.newQuestion = this.newQuestion.bind(this);

    this.state = {
      title: "",
      createddate: "",
      createdby: "",
      questiontags: "",
      rating: "",
      answers: "",
      updated: "",
      published: false,
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeCreateddate(e) {
    this.setState({
      createddate: e.target.value,
    });
  }

  onChangeCreatedby(e) {
    this.setState({
      createdby: e.target.value,
    });
  }

  onChangeQuestiontags(e) {
    this.setState({
      questiontags: e.target.value,
    });
  }
  onChangeRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }
  onChangeAnswers(e) {
    this.setState({
      answers: e.target.value,
    });
  }
  onChangeUpdated(e) {
    this.setState({
      updated: e.target.value,
    });
  }

  saveQuestion() {
    let data = {
      title: this.state.title,
      createddate: this.state.createddate,
      createdby: this.state.createdby,
      questiontags: this.state.questiontags,
      rating: this.state.rating,
      answers: this.state.answers,
      updated: this.state.updated,
      published: false,
    };

    QuestionDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newQuestion() {
    this.setState({
      title: "",
      createddate: "",
      createdby: "",
      questiontags: "",
      rating: "",
      answers: "",
      updated: "",
      published: false,

      submitted: false,
    });
  }

  questionSplit(q) {
    //Original string
    var str = q;
    var array = str.split(" ");
    var qarray = array.map((item) => <Tag color="blue">{item}</Tag>);
    //return array.length;
    // use this to show the tags
    //"tags:" + this.questionSplit(this.state.title)

    return (
      <List split={false}>
        <List.Item>
          <Typography level={5}>
            "{str}" was added to the questions list.
          </Typography>
        </List.Item>
        <List.Item>Autotagged: {qarray}</List.Item>
        <List.Item>
          <Typography type="secondary">
            <b>xicheng@pm61data.com</b> has been added automatically.
          </Typography>
        </List.Item>
      </List>
    );
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <div>
              <Alert
                message="Question Created!"
                description={this.questionSplit(this.state.title)}
                type="success"
                showIcon
                style={{ marginBottom: "8px" }}
                className="animate__animated animate__bounceIn"
              />
            </div>
            <Space>
              <Button type="secondary">
                <Link to="/pages/Questions">I'm Done</Link>
              </Button>
              <Button
                className="btn btn-success"
                onClick={this.newQuestion}
                type="primary"
              >
                Add Another
              </Button>
            </Space>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <Input
                placeholder="What's your question..."
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
                bordered={false}
                size="large"
                style={{ fontSize: "30px", fontWeight: "600", padding: "0px" }}
              />
            </div>
            <Collapse ghost>
              <Panel header="Super-secret question info" key="1">
                <div className="form-group">
                  <label htmlFor="description">Created Date</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="createddate"
                    required
                    value={this.state.createddate}
                    onChange={this.onChangeCreateddate}
                    name="createddate"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Created by</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="createdby"
                    required
                    value={this.state.createdby}
                    onChange={this.onChangeCreatedby}
                    name="createdby"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Question tags</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="questiontags"
                    required
                    value={this.state.questiontags}
                    onChange={this.onChangeQuestiontags}
                    name="questiontags"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Rating</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="questiontags"
                    required
                    value={this.state.rating}
                    onChange={this.onChangeRating}
                    name="rating"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Answers</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="questiontags"
                    required
                    value={this.state.answers}
                    onChange={this.onChangeAnswers}
                    name="answers"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Updated</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="questiontags"
                    required
                    value={this.state.updated}
                    onChange={this.onChangeUpdated}
                    name="updated"
                  />
                </div>
              </Panel>
            </Collapse>
            <Space>
              <Button type="secondary">
                <Link to="/pages/Questions">Cancel</Link>
              </Button>
              <Button onClick={this.saveQuestion} type="primary">
                Submit
              </Button>
            </Space>
          </div>
        )}
      </div>
    );
  }
}
