import React, { Component } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./js/ChangingProgressProvider";

class CircularStatistics extends Component {
  state = { averageValue: 0 };

  componentDidMount() {
    if (this.props.data) {
      this.mapData();
    }
  }

  mapData() {
    let cycling = [];
    let running = [];
    let workout = [];

    let averageValue = 0;
    let valueCounter = 0;

    this.props.data.map((item) => {
      if (item.type === "cycling") cycling = item;
      if (item.type === "running") running = item;
      if (item.type === "workout") workout = item;
    });

    if (cycling.type) {
      const { minutes, seconds, averageHF } = cycling;
      const cyclingValue = this.calculateCycling(
        parseInt(minutes),
        parseInt(seconds),
        parseInt(averageHF)
      );
      averageValue = averageValue + cyclingValue;
      valueCounter++;
    }
    if (running.type) {
      const { minutes, seconds, averageHF } = running;
      const runningValue = this.calculateRunning(
        parseInt(minutes),
        parseInt(seconds),
        parseInt(averageHF)
      );
      averageValue = averageValue + runningValue;
      valueCounter++;
    }
    if (workout.type) {
      const { rounds, averageHF } = workout;
      const workoutValue = this.calculateWorkout(
        parseInt(rounds),
        parseInt(averageHF)
      );
      averageValue = averageValue + workoutValue;
      valueCounter++;
    }
    averageValue = averageValue / valueCounter;
    if (averageValue > 100) this.setState({ averageValue });
    else if (averageValue < 1) this.setState({ averageValue });
    this.setState({ averageValue: parseInt(averageValue) });
  }

  calculateCycling(minutes, seconds, averageHF) {
    const timeHundred = 75;
    const timeZero = 200 - timeHundred;
    const time = minutes + seconds / 60 - timeHundred;
    const resultTime = parseInt(100 - (100 / timeZero) * time);
    const pulseHundred = 130;
    const pulseZero = 210 - pulseHundred;
    const pulse = averageHF - pulseHundred;
    const resultPulse = parseInt(100 - (100 / pulseZero) * pulse);
    const result = (resultTime + resultPulse) / 2;
    return result;
  }
  calculateRunning(minutes, seconds, averageHF) {
    const timeHundred = 15;
    const timeZero = 60 - timeHundred;
    const time = minutes + seconds / 60 - timeHundred;
    const resultTime = parseInt(100 - (100 / timeZero) * time);
    const pulseHundred = 130;
    const pulseZero = 210 - pulseHundred;
    const pulse = averageHF - pulseHundred;
    const resultPulse = parseInt(100 - (100 / pulseZero) * pulse);
    const result = (resultTime + resultPulse) / 2;
    return result;
  }
  calculateWorkout(rounds, averageHF) {
    const roundHundred = 30;
    const resultRounds = (100 / roundHundred) * rounds;
    const pulseHundred = 150;
    const pulseZero = 210 - pulseHundred;
    const pulse = averageHF - pulseHundred;
    const resultPulse = parseInt(100 - (100 / pulseZero) * pulse);
    const result = (resultRounds + resultPulse) / 2;
    return result;
  }

  calculateColor(number) {
    if (number <= 35) return "red";
    if (number > 35 && number <= 65) return "yellow";
    return "green";
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    const { averageValue } = this.state;
    return (
      <React.Fragment>
        <div className="col">
          <ChangingProgressProvider values={[0, averageValue]}>
            {(averageValue) => (
              <CircularProgressbar
                value={averageValue}
                text={`${averageValue}%`}
                styles={buildStyles({
                  textColor: "black",
                  pathColor: this.calculateColor(averageValue),
                  trailColor: "black",
                  pathTransitionDuration: 7,
                })}
              />
            )}
          </ChangingProgressProvider>
        </div>
      </React.Fragment>
    );
  }
}

export default CircularStatistics;
