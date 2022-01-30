import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import StartPage from "./components/startPage";
import NotFound from "./components/not-found";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import ImpressumPage from "./components/impressumPage";
import ChangeLogPage from "./components/changeLogPage";
import Internal from "./components/internal";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <main className="main-container">
        <Switch>
          <Route path="/startpage" component={StartPage} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/loginpage" component={LoginPage} />
          <Route path="/registerpage" component={RegisterPage} />
          <Route path="/impressumpage" component={ImpressumPage} />
          <Route path="/changelogpage" component={ChangeLogPage} />
          <Route path="/internal" component={Internal} />
          <Redirect from="/" exact to="/startpage" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
