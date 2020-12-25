import React, {useState, useEffect} from "react";

import Home from "./components/pages/Home";
import Explore from "./components/pages/Explore"
import Personal from "./components/pages/Personal"
import Error from "./components/pages/Error";
import Navbar from "./components/helper/Navbar";

import { Route, Switch } from "react-router-dom";

function App() {
  const localUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(localUser);
  
  function getLoginStatus() {
    fetch(`/user/loginStatus`)
    .then(res => res.json())
    .then(res => {
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
    })
  }

  useEffect(() => {
    getLoginStatus();
  }, [])

  function handleLoginStatusChange() {
    getLoginStatus();
  }

  return (
    <div className="main">
        <Navbar
          user={user}
          loginStatusChange={handleLoginStatusChange}
        />
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/explore" render={(props) => <Explore {...props} title={`Props through render`}/>} />
            {/* { <Route path="/personal" component={Personal} />} */}
            {user && <Route path="/personal" render={(props) => <Personal {...props} user={user}/>} />}
            <Route component={Error} />
        </Switch>
    </div>
  )
}

export default App;
