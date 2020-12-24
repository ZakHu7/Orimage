import React, {useState, useEffect} from "react";

import Home from "./components/Home";
import About from "./components/About"
import Personal from "./components/Personal"
import Error from "./components/Error";
import Navbar from "./components/Navbar";

import { Route, Switch } from "react-router-dom";

function App() {
  const localUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(localUser);
  
  function getLoginStatus() {
    fetch(`/user/loginStatus`)
    .then(res => res.json())
    .then(res => {
      setUser(res.user);
      console.log(res.user);
      console.log(JSON.stringify(res.user))
      localStorage.setItem('user', JSON.stringify(res.user));
      console.log(user);
    })
  }

  useEffect(() => {
    getLoginStatus();
  }, [])

  return (
    <div className="main">
        <Navbar
          user={user}
        />
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" render={(props) => <About {...props} title={`Props through render`}/>} />
            {user && <Route path="/personal" component={Personal} />}
            <Route component={Error} />
        </Switch>
    </div>
  )
}

export default App;
