import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table, TableBody, TableCell } from "@material-ui/core";
import { withRouter } from "react-router";
import "./feedbackForm.css"

class FeedbackForm extends Component {
  render() {
    return (
      <div>
        <Table >
          <thead>
            <tr>
              <th>Username</th>
              <th>Understanding</th>
              <th>Quality</th>
              <th>Interest</th>
              <th>Comments</th>
              <th></th>
            </tr>
          </thead>
          <TableBody >
          <tr>
            <TableCell>{this.props.feedbacks.username}</TableCell>
            <TableCell>{this.props.feedbacks.understanding}</TableCell>
            <TableCell>{this.props.feedbacks.quality}</TableCell>
            <TableCell>{this.props.feedbacks.interest}</TableCell>
            <TableCell>{this.props.feedbacks.comments}</TableCell>
          </tr>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(FeedbackForm);
