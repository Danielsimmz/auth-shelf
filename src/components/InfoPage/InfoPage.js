import React, { Component } from "react";
import Axios from "axios";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  state = {
    data: ["fuck", "fuck2"],
    description: "",
    image_url: "",
  };

  componentDidMount() {
    console.log("component did mount, I think.");
    Axios.get("/api/shelf/")
      .then((result) => {
        console.log(JSON.stringify(result));
        console.log(`Component did mount result:(result) ${result}`);
        console.log(`Component did mount result:(result[0]) ${result[0]}`);
        console.log(
          `Component did mount result:(result[0].description) ${result.data.description}`
        );
        console.log(result);
        this.setState({
          data: [...result.data],
        });
      })
      .catch((error) => console.log(error));
  }

  onSubmit = () => {
    console.log("in onSubmit");
  };

  render() {
    console.log(`Data xxxxxxxxxxxxxxxxxxxxxxx is ${this.state.data}`);

    return (
      <>
        <p>Shelf Page</p>
        {/* <p>{JSON.stringify(this.state.data)}</p> */}

        <form onSubmit={() => this.onSubmit()}>
          Image URL:
          <input
            type="text"
            value={this.state.image_url}
            onChange={(e) => this.setState({ image_url: e.target.value })}
          />
          <br />
          Description:
          <textarea
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>

        <ul>
          <>
            {this.state.data.map((item, i) => (
              <li key={i}>
                <img src={item.image_url} alt={item.description}></img>
                {item.description}
              </li>
            ))}
          </>
        </ul>
      </>
    );
  }
}

export default InfoPage;
