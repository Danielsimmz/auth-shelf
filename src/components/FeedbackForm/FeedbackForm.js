import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper } from "@material-ui/core";
import "./feedbackForm.css";

class FeedbackForm extends Component {
  render() {
    const { feedback } = this.props;
    return (
      <div className="table">
        <TableContainer component={Paper}></TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Understanding</TableCell>
              <TableCell>Quality</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.understanding}</TableCell>
                <TableCell>{row.quality}</TableCell>
                <TableCell>{row.interest}</TableCell>
                <TableCell component="th" scope="row">
                  {row.comments}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(FeedbackForm);
