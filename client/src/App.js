import React from "react";

import Home from "./components/Home";
import About from "./components/About"
import Template from "./components/Template"
import Error from "./components/Error";
import Navbar from "./components/Navbar";

import { Route, Switch } from "react-router-dom";

function App() {
    return (
      <div className="main">
          <Navbar />
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/template" component={Template} />
              <Route component={Error} />
          </Switch>
      </div>
    )
}

export default App;
