import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { MenuItem, Input, Button, FormControl, InputLabel, Select, FormHelperText } from "@material-ui/core";

class EditForm extends Component {
  // setting local state for the inputs
  state = {
    url: "",
    category_id: 0,
    id: 0,
    redirect: false,
  };

  componentDidMount() {
    console.log("this is props video", this.props.video);
    this.changeState();
  }

  //this function takes local state and assigns it to the value of the props
  changeState = () => {
    for (let i = 0; i < this.props.video.length; i++) {
      const element = this.props.video[i];
      let id = this.props.video.id;
      let url = element.url;
      let category_id = element.category_id;
      return this.setState({
        url: url,
        category_id: category_id,
        id: id,
      });
    }
  };

  handleSubmit = () => {
    const payload = {
      id: this.props.video.id,
      url: this.state.url,
      category_id: this.state.category_id,
    };
    if (this.state.url !== "" && this.state.category_id !== 0) {
      this.props.dispatch({ type: "EDIT_VIDEO", payload: payload });
      this.setState({ redirect: true });
    } else {
      alert("please make sure input are not empty");
    }
    this.doneEdit();
  };

  doneEdit() {
    this.props.history.push("/admin");
  }

  handleChange = (param, event) => {
    this.setState({
      [param]: event.target.value,
    });
  };

  // confirmation box before you edit the movie
  submit = (event) => {
    event.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to edit this?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleSubmit(),
        },
        {
          label: "No",
          onClick: () => this.setState({ redirect: true }),
        },
      ],
    });
  };

  //uses the Redirect to go back to edit page with the confirmation box
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/edit" />;
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.submit}>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Video url
            </InputLabel>
            <Input
              type="text"
              value={this.state.url}
              onChange={(event) => this.handleChange("url", event)}
            />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Category id
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.category_id}
              onChange={(event) => this.handleChange("category_id", event)}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
            </Select>
            <FormHelperText>Choose category from 1-5</FormHelperText>
          </FormControl>
          <br />
          <Link to="/admin">
            <Button
              className="btn btn-primary btn-lg"
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            value="Submit"
          >
            Confirm
          </Button>
        </form>
      </>
    );
  }
}

// bringing in the video details to use as props
const mapStateToProps = (state) => {
  return {
    video: state.details,
  };
};

export default withRouter(connect(mapStateToProps)(EditForm));
