import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Button,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  Card,
} from "@material-ui/core";
import "./WelcomePage.css";
import { connect } from "react-redux";

//this component loads up the welcome page when you start website
class WelcomePage extends Component {

  //on starting the page dispatches an action to retrieve
  //a random gif to use on page when it loads
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_GIFS" });
  }
  next = () => {
    this.props.history.push("/home"); //takes user to "home" page
  };

  render() {
    return (
      <div className="text-center display">
        {console.log(this.props.gif)}
        <Card style={{ height: "500px", width: "450px" }}>
          <CardActionArea>
            <Typography gutterBottom variant="h5" component="h2">
              <b>Welcome to the Tennis Gurus site</b>
            </Typography>
            <CardMedia
              className="media"
              component="img"
              image={this.props.gif.url}
              title="giphy"
            />
            <CardContent></CardContent>
          </CardActionArea>
          <CardActions></CardActions>
        </Card>
        <Button
          size="small"
          variant="contained"
          color="primary"
          id={this.props.gif.id}
          onClick={() => this.next()}
        >
          Enter the site
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gif: state.giphyReducer,
});

export default withRouter(connect(mapStateToProps)(WelcomePage));
