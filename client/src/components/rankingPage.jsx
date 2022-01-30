import React from "react";
import CircularStatistics from "./common/circularStatistics";
import DoAuth from "./common/doAuth";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

class RankingPage extends DoAuth {
  state = {};
  data = { parsedData: {} };

  componentDidMount() {
    this.doAuth();
  }

  render() {
    const { data } = this.state;

    const getInfo = () => {
      toast(
        "Dein Fitnesszustand errechnet sich jeweils aus deinen letzten eingetragenen Aktivitäten und setzt sich aus deinem Ergebnis und deiner durchschnittlichen Herzfrequenz zusammen",
        {
          position: "bottom-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    };

    if (!data) {
      return (
        <div className="Container text-center statisticsCSS">
          Noch nicht viel los hier...
        </div>
      );
    }
    const mappedData = JSON.parse(data);
    return (
      <React.Fragment>
        <div className="Container text-center statisticsCSS">
          <h3>Allgemeiner Fitnesszustand:</h3>
          <button className="btn btn-outline-info my-3" onClick={getInfo}>
            <FontAwesomeIcon icon={faInfo} />
          </button>
          <div className="row m-2">
            <CircularStatistics data={mappedData} />
          </div>
        </div>
        <h5 className="text-white ml-2">Deine Ergebnisse:</h5>
        {mappedData.map((item, index) => (
          <div key={index} className="card m-2">
            <div className="card-body">
              <h5 className="card-title">
                {index + 1 + ". Training " + item.type}
              </h5>
              <p className="card-text">
                ØHF: {item.averageHF} <br />
                max HF: {item.maxHF} <br />
                {item.type === "cycling" || item.type === "running"
                  ? "Zeit: " + item.minutes + ":" + item.seconds
                  : "Runden: " + item.rounds}
              </p>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default RankingPage;
