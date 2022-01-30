import { Component } from "react";
import baseURL from "../../utils/API";
import axios from "axios";
import { toast } from "react-toastify";

class GetRankingData extends Component {
  state = {
    cyclingData: {},
    runningData: {},
    workoutData: {},
  };

  getRankingData = async () => {
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
          baseURL + "/get-ranking.php",
          bodyParameters,
          config
        );
        if (response.data.success === 1) {
          this.setState({
            cyclingData: response.data.cyclingData,
            runningData: response.data.runningData,
            workoutData: response.data.workoutData,
          });
        }
      } catch (error) {
        toast.error("Keine Verbindung");
      }
    } else {
      toast.error("Irgendwas stimmt nicht, bitte neu anmelden");
    }
  };
}

export default GetRankingData;
