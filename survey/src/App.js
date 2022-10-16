import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import VersionOne from "./components/version-one";
import VersionTwo from "./components/version-two";
import VersionThree from "./components/version-three";

const getBasename = (path) => path.substr(0, path.lastIndexOf("/"));

const App = () => {
  return (
    <Router basename={getBasename(window.location.pathname)}>
      <Switch>
        <Route path="/" exact component={VersionOne} />
        <Route path="/v1" exact component={VersionOne} />
        <Route path="/v2" exact component={VersionTwo} />
        <Route path="/v3" exact component={VersionThree} />
      </Switch>
    </Router>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
