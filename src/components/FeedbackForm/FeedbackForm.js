import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, TableBody, TableCell } from "@material-ui/core";
import "./feedbackForm.css";

class FeedbackForm extends Component {
  render() {
    return (
      <div>
        <Table className="col-12" id="feedbackTable">
          <thead>
            <tr>
              <th>Email</th>
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
