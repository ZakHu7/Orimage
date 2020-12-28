import React, {useState, useEffect} from 'react'

import {
  Container,
  Row,
  Jumbotron,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  FormGroup
} from 'reactstrap';

import gif from '../../media/origami_01.gif';

function Home() {

  const [weather, setWeather] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [newCityName, setNewCityName] = useState('');

  useEffect(() => {
    getCityList();
  }, []);

  function getCityList() {
    fetch(`/api/cities`)
    .then(res => res.json())
    .then(res => {
      var newCityList = res.map(r => r.city_name);
      setCityList(newCityList);
    })
  }

  function handleAddCity() {
    fetch(`/api/cities`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: newCityName })
    })
    .then(res => res.json())
    .then(res => {
      getCityList();
      setNewCityName('');
    })
  }

  function handleChangeCity(e) {
    getWeather(e.target.value);
  }

  function getWeather(city) {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setWeather(res);
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col sm="2">
        </Col>
        <Col>
          <Jumbotron>
            <Row>
              <Col sm="2">
              </Col>
              <Col sm="8">
                <h1 className="display-3">ImageRepo</h1>
                <p className="lead">View and upload your images of origami!</p>
                <hr className="my-3" />
                <img src={gif} className="crane-gif"></img>
                <hr className="my-3" />
                <small className="lead gif-text">Gif from CharlotteCambon</small>
              </Col>
              <Col sm="2">
              </Col>
            </Row>
          </Jumbotron>
        </Col>
        <Col sm="2">
        </Col>
      </Row>
      
    </Container>
  );
}

export default Home;
