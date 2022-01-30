import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import axios from "axios";
import baseURL from "../utils/API";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

class LoginPage extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //call the server
    try {
      const response = await axios.post(
        baseURL + "/login.php",
        this.state.data
      );
      if (response.data.success === 1) {
        toast.success("Anmeldung erfolgreich");
        localStorage.setItem("loginToken", response.data.token);
        this.props.history.push("/internal");
      } else if (response.data.status === 422) {
        toast.error("Email oder Passwort falsch");
      } else {
        toast.warn("Etwas ist schiefgelaufen, bitte nochmals probieren");
      }
    } catch (error) {
      toast.error("Server Anfrage fehlgeschlagen");
    }
  };

  render() {
    return (
      <div className="container loginPageCSS">
        <h1 className="mb-2">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "E-Mail")}
          {this.renderInput("password", "Passwort", "password")}
          {this.renderButton("Login")}
          <Link to="/startpage" className="btn btn-outline-info ml-2">
            Startbildschirm
          </Link>
        </form>
      </div>
    );
  }
}

export default LoginPage;
