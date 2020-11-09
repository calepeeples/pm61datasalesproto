import React, { Component } from "react";
import QuestionDataService from "../services/pm61proto.service";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCreateddate = this.onChangeCreateddate.bind(this);
    //this.onChangeQuestiontags = this.onChangeQuestiontags.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);

    this.state = {
      currentQuestion: {
        key: null,
        title: "",
        createddate: "",
        questiontags: "",
        rating: "",
        answers: "",
        updated: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { question } = nextProps;
    if (prevState.currentQuestion.key !== question.key) {
      return {
        currentQuestion: question,
        message: "",
      };
    }

    return prevState.currentQuestion;
  }

  componentDidMount() {
    this.setState({
      currentQuestion: this.props.question,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentQuestion: {
          ...prevState.currentQuestion,
          title: title,
        },
      };
    });
  }

  onChangeCreateddate(e) {
    const createddate = e.target.value;

    this.setState((prevState) => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        createddate: createddate,
      },
    }));
  }

  updatePublished(status) {
    QuestionDataService.update(this.state.currentQuestion.key, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentQuestion: {
            ...prevState.currentQuestion,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateQuestion() {
    const data = {
      title: this.state.currentQuestion.title,
      description: this.state.currentQuestion.description,
    };

    QuestionDataService.update(this.state.currentQuestion.key, data)
      .then(() => {
        this.setState({
          message: "The question was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteQuestion() {
    QuestionDataService.delete(this.state.currentQuestion.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentQuestion } = this.state;

    return (
      <div>
        <h4>Question</h4>
        {currentQuestion ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentQuestion.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Created Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentQuestion.createddate}
                  onChange={this.onChangeCreateddate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Question Tags</label>
                <input
                  type="text"
                  className="form-control"
                  id="questiontags"
                  value={currentQuestion.questiontags}
                  onChange={this.onChangeQuestiontags}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentQuestion.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentQuestion.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteQuestion}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateQuestion}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Question...</p>
          </div>
        )}
      </div>
    );
  }
}
