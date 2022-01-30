import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import axios from "axios";
import baseURL from "../utils/API";
import { toast } from "react-toastify";

class RunningPage extends Form {
  state = {
    data: { minutes: "", seconds: "", averageHF: "", maxHF: "" },
    errors: {},
    formattedData: {},
  };

  schema = {
    minutes: Joi.number().min(0).required().label("Minutes"),
    seconds: Joi.number().min(0).max(59).required().label("Seconds"),
    averageHF: Joi.number().min(0).required().label("Heart Frequency"),
    maxHF: Joi.number().min(0).required().label("Heart Frequency"),
  };

  formatData = async () => {
    const { minutes, seconds, averageHF, maxHF } = this.state.data;
    const formattedData = [
      {
        type: "running",
        userId: localStorage.getItem("userId"),
        minutes: minutes,
        seconds: seconds,
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
            data: { minutes: "", seconds: "", averageHF: "", maxHF: "" },
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
        <h3 className="mb-2 text-center">Run 5 Km</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("minutes", "Minuten", "number")}
          {this.renderInput("seconds", "Sekunden", "number")}
          {this.renderInput("averageHF", "Ø HF", "number")}
          {this.renderInput("maxHF", "Max. HF", "number")}
          {this.renderButton("Abschicken")}
        </form>
      </div>
    );
  }
}

export default RunningPage;
