import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router";

class InfoPageItem extends Component {
  removeItem = () => {
    this.props.dispatch({
      type: "DELETE_PLANT",
      payload: this.props.item.id,
    });
  };
  edit() {
    this.props.history.push("/edit");
  }

  render() {
    return (
      <ul className="display">
        
          <li>
            <ReactPlayer
              width="480px"
              height="360px"
              controls
              url={this.props.item.url}
            />
            <br />
            {console.log("this is the category", this.props.item.name)}
            <Button
              id={this.props.item.id}
              className="categoryButton"
              variant="outlined"
              color="secondary"
              type="submit"
              onClick={(event) => this.removeItem(event)}
            >
              Delete
            </Button>
            <Button
              id={this.props.item.id}
              className="categoryButton"
              variant="outlined"
              color="primary"
              type="submit"
              onClick={() => this.edit()}
            >
              Edit
            </Button>
            <br />
          </li>
      </ul>
    );
  }
}

export default withRouter(connect()(InfoPageItem));