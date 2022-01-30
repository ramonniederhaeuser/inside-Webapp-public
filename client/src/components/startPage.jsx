import React, { Component } from "react";
import { Link } from "react-router-dom";

class StartPage extends Component {
  render() {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      this.props.history.push("/internal");
    }
    return (
      <React.Fragment>
        <div className="container startPageCSS d-flex flex-column">
          <h4 className="text-center mt-2">Willkommen beim Leistungstest</h4>
          <Link
            to="/loginpage"
            className="btn btn-info offset-md-4 col-md-4 mt-3"
          >
            Hier gehts zum Login
          </Link>
          <label
            htmlFor="btn-register"
            className="text-center mt-5 font-weight-bold text-white"
          >
            Noch nicht registriert?
          </label>
          <Link
            to="/registerpage"
            id="btn-register"
            className="btn btn-info offset-md-4 col-md-4 mb-4"
          >
            Hier gehts zur Registrierung
          </Link>
        </div>
        <div className="text-center fixed-bottom section-footer">
          <footer className="footer">
            <Link to="/impressumpage" className="btn">
              Impressum
            </Link>
            <Link to="/changelogpage" className="btn">
              Changelog
            </Link>
            <a
              className="text-white"
              href="https://www.nidhaus.ch"
              rel="noreferrer"
              target="_blank"
            >
              © Nidhaus Solutions 2021
            </a>
            <p>
              <small>Release: 2.5.0</small>
            </p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default StartPage;
