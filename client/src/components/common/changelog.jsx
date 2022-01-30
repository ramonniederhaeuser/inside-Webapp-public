import React, { Component } from 'react';

class ChangeLog extends Component {


  renderChangeLog(date, vers, change) {
    return (
      <React.Fragment>
        <p><strong>{date}</strong></p>
        <p>Application Version {vers}</p>
        <ul>
          <li>{change}</li>
        </ul>
      </React.Fragment>
    );
  }
}
 
export default ChangeLog;

