import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import axios from "axios";
import baseURL from "../utils/API";
import { toast } from "react-toastify";

class WorkoutPage extends Form {
  state = {
    data: { rounds: "", averageHF: "", maxHF: "" },
    errors: {},
    formattedData: {},
  };

  schema = {
    rounds: Joi.number().min(0).required().label("Rounds"),
    averageHF: Joi.number().min(0).required().label("Heart Frequency"),
    maxHF: Joi.number().min(0).required().label("Heart Frequency"),
  };

  formatData = async () => {
    const { rounds, averageHF, maxHF } = this.state.data;
    const formattedData = [
      {
        type: "workout",
        userId: localStorage.getItem("userId"),
        rounds: rounds,
        averageHF: averageHF,
        maxHF: maxHF,
      },
    ];
    this.setState({ formattedData: formattedData });
  };

  doSubmit = async () => {
    //formatting the data
    this.formatData().then(async () => {
      //call the server
      try {
        const response = await axios.post(
          baseURL + "/user-update.php",
          this.state.formattedData
        );
        if (response.data.success === 1) {
          toast.success("Daten erfolgreich abgeschickt.");
          this.setState({
            data: { rounds: "", averageHF: "", maxHF: "" },
            errors: {},
            formattedData: {},
          });
        } else if (response.data.status === 404) {
          toast.error("Keine verbindung zum Server");
        } else {
          toast.warn("Etwas ist schiefgelaufen, bitte nochmals probieren");
        }
      } catch (error) {
        toast.error("Server Anfrage fehlgeschlagen");
      }
    });
  };

  render() {
    return (
      <div className="container cyclingPageCSS">
        <h3 className="mb-2 text-center">Workout 20 Min</h3>
        <ul>
          <li>5 Burpees</li>
          <li>5 Situps</li>
          <li>5 Jumping Squats</li>
        </ul>
        <p>(angefangene Runden dürfen beendet werden)</p>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("rounds", "Runden", "number")}
          {this.renderInput("averageHF", "Ø HF", "number")}
          {this.renderInput("maxHF", "Max. HF", "number")}
          {this.renderButton("Abschicken")}
        </form>
      </div>
    );
  }
}

export default WorkoutPage;
