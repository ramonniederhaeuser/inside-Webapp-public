import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <React.Fragment>
      <div className="container not-foundCSS">
        <div>
          <h4 className="mt-5">Ups da ist etwas schiefgelaufen :(</h4>
          <p>Bitte zur Startseite zurückkehren</p>
          <Link to="/" className="btn btn-primary">
            Zurückkehren
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
