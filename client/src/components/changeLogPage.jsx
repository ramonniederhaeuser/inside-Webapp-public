import React from "react";
import Changelog from "./common/changelog";
import { Link } from "react-router-dom";

class ChangeLogPage extends Changelog {
  render() {
    return (
      <React.Fragment>
        <div className="container changelogCSS">
          <Link to="/" className="btn btn-info my-3">
            Zurückkehren
          </Link>
          <h2>Application Changelog</h2>
          <br />
          <br />
          <div className="container mt-5">
            {this.renderChangeLog("11.02.2021", "0.1.0", "Build UI")}
            {this.renderChangeLog("11.02.2021", "0.2.0", "Build Backend API")}
            {this.renderChangeLog(
              "11.02.2021",
              "0.3.0",
              "Add Register API request"
            )}
            {this.renderChangeLog(
              "11.02.2021",
              "0.4.0",
              "Token Validation Added"
            )}
            {this.renderChangeLog("11.02.2021", "0.5.0", "Internal UI created")}
            {this.renderChangeLog(
              "11.02.2021",
              "0.5.0",
              "Internal Routing added"
            )}
            {this.renderChangeLog(
              "12.02.2021",
              "0.6.0",
              "Added new Files in Backend for storing User Ranking"
            )}
            {this.renderChangeLog(
              "12.02.2021",
              "0.7.0",
              ".htaccess added to perform AUTH"
            )}
            {this.renderChangeLog("12.02.2021", "0.8.0", "Added Oflline Page")}
            {this.renderChangeLog(
              "12.02.2021",
              "0.8.0",
              "Added Serviceworker and Manifest"
            )}
            {this.renderChangeLog("12.02.2021", "1.0.0", "First Build")}
            {this.renderChangeLog(
              "12.02.2021",
              "1.0.1",
              "Changed Manifest.json, small bugfixes"
            )}
            {this.renderChangeLog(
              "12.02.2021",
              "1.0.2",
              "Added Module_Rewrite in .htacceess to fix 404 Error when Page Reload"
            )}
            {this.renderChangeLog(
              "13.02.2021",
              "1.0.3",
              "Changed Constructor for auth to ComponentdidMount"
            )}
            {this.renderChangeLog(
              "13.02.2021",
              "1.1.0",
              "Setting Backend up for Requesting Training Data in Protected Function"
            )}
            {this.renderChangeLog(
              "13.02.2021",
              "1.1.0",
              "UI rankingPage created with axios request in Background"
            )}
            {this.renderChangeLog(
              "13.02.2021",
              "1.1.0",
              "Changed LoginPHP _jwtHandler"
            )}
            {this.renderChangeLog(
              "14.02.2021",
              "1.1.0",
              "Auto Logout when Token runs out added"
            )}
            {this.renderChangeLog(
              "14.02.2021",
              "1.1.0",
              "Ranking functionality developped, ready for Build 1.1.0 => builded"
            )}
            {this.renderChangeLog(
              "18.02.2021",
              "2.0.0",
              "Renew complete Logic in Backend, removed Rankings, deleted Workout Databases=> added Row for users data Array"
            )}
            {this.renderChangeLog(
              "19.02.2021",
              "2.0.1",
              "changed Backend userUpdate, UPDATE user, overwrite data, each time User saves new Workout Data => build 2.0.1 => Upload"
            )}
            {this.renderChangeLog(
              "20.02.2021",
              "2.1.0",
              "Input fields now go cleared after submitting"
            )}
            {this.renderChangeLog(
              "20.02.2021",
              "2.1.3",
              "Changed Backend, Users Data merged to one JSON Array, JSON.parse received Data in UI Statistics => build_2.1.3"
            )}
            {this.renderChangeLog(
              "20.02.2021",
              "2.1.4",
              "Added Build number @ startpage => build_2.1.4"
            )}
            {this.renderChangeLog(
              "20.02.2021",
              "2.2.0",
              "Added Refresh Button in Offline Page"
            )}
            {this.renderChangeLog(
              "20.02.2021",
              "2.3.0",
              "Pull to Refresh added in App.js => Build 2.3.0"
            )}
            {this.renderChangeLog(
              "20.02.2021",
              "2.3.1",
              "Moved Pull to refresh to internal Page, because of errors => Build 2.3.1"
            )}
            {this.renderChangeLog(
              "26.02.2021",
              "2.4.0",
              "Statistics Site generated, changed Update User in Backend and get Data back Parsed"
            )}
            {this.renderChangeLog(
              "27.02.2021",
              "2.4.4",
              "Small changes in Statistics UI => Build 2.4.4"
            )}
            {this.renderChangeLog(
              "28.02.2021",
              "2.5.0",
              "Statistics UI and background Math completed, circular Progressbar animated => Build 2.5.0"
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangeLogPage;
