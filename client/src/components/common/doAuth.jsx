import { Component } from "react";
import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

class DoAuth extends Component {
  state = { data: {} };

  doAuth = async () => {
    const loginToken = localStorage.getItem("loginToken");
    const config = {
      headers: { Authorization: `Bearer ` + loginToken },
    };
    const bodyParameters = {
      key: "value",
    };
    if (loginToken) {
      try {
        const response = await axios.post(
          baseURL + "/user-info.php",
          bodyParameters,
          config
        );
        if (response.data.success === 1) {
          const {
            forename,
            lastname,
            email,
            gender,
            id,
            data,
          } = response.data.user;
          this.setState({
            forename,
            lastname,
            email,
            gender,
            userId: id,
            data,
            isAuth: true,
          });
          localStorage.setItem("userId", this.state.userId);
        } else {
          toast.info("Du wurdest abgemeldet");
          localStorage.removeItem("loginToken");
          localStorage.removeItem("userId");
          this.setState({ redirect: "/loginpage" });
        }
      } catch (error) {
        toast.error("Keine Verbindung");
      }
    } else {
      toast.info("Bitte zuerst anmelden");
      this.setState({ redirect: "/loginpage" });
    }
  };
}

export default DoAuth;
