import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./UserPageList.css";
import {
  Button,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  Card,
} from "@material-ui/core";




class UserPageList extends Component {

  //this function dispatches an action with payload of video category
  //that is captured by sagas and stored in reducer.
  showCategory = () => {
    this.props.dispatch({
      type: "PUT_CATEGORY",
      payload: {
        name: this.props.videoItem.name,
      },
    });
    this.next();
  };
  next = () => {
    this.props.history.push("/details"); //takes customer to next "page"
    // this.props.dispatch({ type: "FETCH_VIDEOSS"});
  };

  render() {
    return (
      <>
        <div>
          <ul>
            <li className="userPage">
              <Card style={{ height: "400px", width: "450px" }}>
                <CardActionArea>
                  <CardMedia
                    className="media"
                    component="img"
                    image={this.props.videoItem.poster}
                    title={this.props.videoItem.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.props.videoItem.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    id={this.props.videoItem.id}
                    onClick={() => this.showCategory()}
                  >
                    View Videos
                  </Button>
                </CardActions>
              </Card>
              <br />
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(connect()(UserPageList));

