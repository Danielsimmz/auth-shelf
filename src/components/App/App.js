import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminRoute from "../AdminRoute/AdminRoute";


import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import WelcomePage from "../WelcomePage/WelcomePage";
import DetailsPage from "../DetailsPage/DetailsPage";
import EditForm from "../EditForm/EditForm";

import "./App.css";
import Understanding from "../Feedback/Understanding";
import Interest from "../Feedback/Interest";
import Quality from "../Feedback/Quality";
import Comments from "../Feedback/Comments";
import ReveiwForm from "../Feedback/ReveiwForm";


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/welcome */}
            <Redirect exact from="/" to="/welcome" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/about" component={AboutPage} />
            {/*This page will pop up first when loaded and this will be the welcome page 
            //that user sees when they first load browser*/}
            <Route exact path="/welcome" component={WelcomePage} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute exact path="/home" component={UserPage} />
            {/* This works the same as the other protected route, except that if the user is logged in as admin,
            they will see the info page instead. */}
            <AdminRoute exact path="/admin" component={InfoPage} />
            <AdminRoute exact path="/edit" component={EditForm} />
            <ProtectedRoute exact path="/details" component={DetailsPage} />
            <ProtectedRoute exact path="/feedback" component={Understanding} />
            <ProtectedRoute exact path="/quality" component={Quality} />
            <ProtectedRoute exact path="/interest" component={Interest} />
            <ProtectedRoute exact path="/comments" component={Comments} />
            <ProtectedRoute exact path="/review" component={ReveiwForm} />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <div className="header">
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
