import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import axios from "axios";
import baseURL from "../utils/API";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


class RegisterPage extends Form {
  state = {
    data: { forename: "", lastname: "", email: "", password: "", gender: "" },
    errors: {},
  };

  schema = {
    forename: Joi.string().required().label("Forename"),
    lastname: Joi.string().required().label("Lastname"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    gender: Joi.string().required().label("Gender"),
  };

  doSubmit = async () => {
    //call the server
    try {
      const response = await axios.post(
        baseURL + "/register.php",
        this.state.data
      );
      if (response.data.status === 201) {
        toast.success("Erfolgreich registriert");
        this.props.history.push("/loginpage");
      } else if (response.data.status === 422) {
        toast.error("Email bereits vergeben!");
      } else {
        toast.warn("Etwas ist schiefgelaufen, bitte nochmals probieren");
      }
    } catch (error) {
      toast.error("Server Anfrage fehlgeschlagen");
    }
  };

  render() {
    return (
      <div className="container registerPageCSS">
        <h1 className="mb-2">Registrierung</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("forename", "Vorname")}
          {this.renderInput("lastname", "Nachname")}
          {this.renderInput("email", "E-Mail")}
          {this.renderInput("password", "Passwort", "password")}
          {this.renderSelect("gender", "Geschlecht", [
            { _id: 1, name: "Männlich" },
            { _id: 2, name: "Weiblich" },
          ])}
          {this.renderButton("Abschicken")}
          <Link to="/startpage" className="btn btn-outline-info ml-2">
            Startbildschirm
          </Link>
        </form>
      </div>
    );
  }
}

export default RegisterPage;
