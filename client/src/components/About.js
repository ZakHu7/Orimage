import React, {useState} from "react"

function AboutUs() {
  const [test, setTest] = useState('');

  function login() {
    fetch(`/user/login`)
    .then(res => res.json("this is test"))
    .then(res => {
      window.location = `${res.redirectUrl}`;
    })
  }

  function testing() {
    fetch(`/test`)
    .then(res => res.json())
    .then(res => {
      setTest(JSON.stringify(res))
    })
  }

  return (
  <div>
    <h1>About Us</h1>
    <a onClick={login}> LOGIN </a>
    <br/>
    <a onClick={testing}> TESTINg </a>
    <br/>
    {test}
  </div>
  );
}

export default AboutUs
