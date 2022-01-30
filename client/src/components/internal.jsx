import React from "react";
import DoAuth from "./common/doAuth";
import CyclingPage from "./cyclingPage";
import RunningPage from "./runningPage";
import WorkoutPage from "./workoutPage";
import RankingPage from "./rankingPage";
import PullToRefresh from "react-simple-pull-to-refresh";
import { toast } from "react-toastify";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBiking,
  faDoorOpen,
  faDumbbell,
  faRunning,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

class Internal extends DoAuth {
  state = {
    data: {},
    isAuth: false,
    redirect: null,
  };

  componentDidMount() {
    this.doAuth();
  }

  handleRefresh = () => {
    window.location.reload();
  };

  logout = () => {
    toast.success("Erfolgreich abgemeldet");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("userId");
    this.setState({
      forename: "",
      lastname: "",
      email: "",
      gender: "",
      data: "",
      isAuth: false,
      redirect: "/",
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <React.Fragment>
          <PullToRefresh onRefresh={this.handleRefresh}>
            <div className="container internalCSS">
              <h4 className="text-center">Hallo {this.state.forename}</h4>
              <p className="text-center">Was willst du als nächstes tun?</p>
              <div className="row">
                <button
                  onClick={this.logout}
                  className="btn btn-lg btn-danger mx-1 my-1 col p-4"
                >
                  <FontAwesomeIcon icon={faDoorOpen} />
                  <br />
                  LOGOUT
                </button>
                <Link
                  to="/internal/ranking"
                  className="btn btn-lg btn-success mx-1 my-1 col p-4"
                >
                  <FontAwesomeIcon icon={faChartBar} />
                  <br />
                  Statistics
                </Link>
              </div>
              <div className="row">
                <Link
                  to="/internal/cycling"
                  className="btn btn-lg btn-info mx-1 my-1 col p-4"
                >
                  <FontAwesomeIcon icon={faBiking} />
                </Link>
                <Link
                  to="/internal/running"
                  className="btn btn-lg btn-info mx-1 my-1 col p-4"
                >
                  <FontAwesomeIcon icon={faRunning} />
                </Link>
                <Link
                  to="/internal/workout"
                  className="btn btn-lg btn-info mx-1 my-1 col p-4"
                >
                  <FontAwesomeIcon icon={faDumbbell} />
                </Link>
              </div>
            </div>
            <main className="internalMainContainer">
              <Switch>
                <Route path="/internal/cycling" component={CyclingPage} />
                <Route path="/internal/running" component={RunningPage} />
                <Route path="/internal/workout" component={WorkoutPage} />
                <Route path="/internal/ranking" component={RankingPage} />
              </Switch>
            </main>
          </PullToRefresh>
        </React.Fragment>
      );
    }
  }
}

export default Internal;
