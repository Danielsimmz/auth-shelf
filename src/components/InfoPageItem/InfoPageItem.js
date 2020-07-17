import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { Paper, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class InfoPageItem extends Component {
  removeItem = () => {
    this.props.dispatch({
      type: "DELETE_VIDEO",
      payload: this.props.item.id,
    });
  };

  editItem = (e) => {
    this.props.dispatch({
      type: "EDIT_VIDEOS",
      payload: e,
    });
    console.log(this.props.item);

    this.edit();
  };
  edit() {
    this.props.history.push("/edit");
  }

  submit = () => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this video?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.removeItem(),
        },
        {
          label: "No",
          onClick: () => this.setState({ redirect: true }),
        },
      ],
    });
  };

  render() {
    return (
      <ul className="display video">
        <li>
          <Paper elevation={3} variant="outlined">
            <ReactPlayer
              width="480px"
              height="360px"
              controls
              url={this.props.item.url}
            />
            <IconButton aria-label="delete">
              <DeleteIcon
                id={this.props.item.id}
                fontSize="large"
                color="secondary"
                type="submit"
                variant="contained"
                onClick={(event) => this.submit(event)}
              />
            </IconButton>
            <IconButton aria-label="edit">
              <EditIcon
                id={this.props.item.id}
                className="categoryButton"
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => this.editItem(this.props.item.id)}
              />
            </IconButton>
          </Paper>
        </li>
      </ul>
    );
  }
}

export default withRouter(connect()(InfoPageItem));
