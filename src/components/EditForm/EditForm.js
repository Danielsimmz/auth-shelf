import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from "react-router-dom";

class EditForm extends Component {
  // setting local state for the inputs
  state = {
    url: "",
    category_id: "",
    id: 0,
    redirect: false,
  };

  componentDidMount() {
    console.log(this.state);
    this.changeState();
  }

  changeState = () => {
  //   let value = 0;
  //   for (let i = 0; i < this.props.details.length; i++) {
  //     const element = this.props.details[i];
  //     let value = element.id;
  //     let title = element.title;
  //     let description = element.description;
  //     console.log(value);

  //     return this.setState({
  //       title: title,
  //       description: description,
  //       id: value,
  //     });
  //   }
   };

  // confirmation box before you edit the movie
  submit = () => {
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

  render() {
    return (
      <>
        <form
          id={this.props.id}
          onSubmit={() => {
            this.props.updateImage();
          }}
        >
          Video URL:
          <input
            type="text"
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
          />
          <br />
          category_id:
          <textarea
          type="number"
            value={this.state.category_id}
            onChange={(e) => this.setState({ category_id: e.target.value })}
          />
          <br />
          <Link to="/admin">
            <button className="btn btn-primary btn-lg">Back to Admin</button>
          </Link>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}



export default EditForm;
