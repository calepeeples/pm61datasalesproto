import React, { Component } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";
// import { UserContext } from "./providers/UserProvider";
// import { auth } from "../firebase";
import QuestionDataService from "../services/pm61proto.service";
import { PageHeader, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Title } = Typography;

export default class QuestionDetails extends Component {
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title={this.props.match.params.id}
          //breadcrumb={{ routes }}
          subTitle=""
        />
      </div>
    );
  }
}
