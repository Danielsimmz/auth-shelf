import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { Button, Paper, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router";

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

  render() {
    return (
      <ul className="display">
        <li>
          <Paper elevation={3} variant="outlined">
            <ReactPlayer
              width="480px"
              height="360px"
              controls
              url={this.props.item.url}
            />
            <br />
            {console.log("this is the category", this.props.item.name)}
            <IconButton aria-label="delete">
              <DeleteIcon
                id={this.props.item.id}
                fontSize="large"
                color="secondary"
                type="submit"
                variant="contained"
                onClick={(event) => this.removeItem(event)}
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
