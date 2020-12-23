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

import Weather from '../components/Weather';
import CropDemo from '../services/imageUpload';

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
      console.log(newCityList);
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
        <Col>
          <Jumbotron>
            <h1 className="display-3">ImageRepo</h1>
            <p className="lead">Current weather for cities</p>
          <InputGroup>
            <Input
              placeholder="New city name..."
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={handleAddCity}>Add City</Button>
            </InputGroupAddon>
          </InputGroup>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          {JSON.stringify(cityList)}
          {newCityName}
          <h1 className="display-5">Current Weather</h1>
          <FormGroup>
            <Input type="select" onChange={(e) => handleChangeCity(e)}>
              { cityList.length === 0 && <option>No cities found</option> }
              { cityList.length !== 0 && <option>Select a city</option> }
              { cityList.map((city, i) => <option key={i}>{city}</option>) }
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <CropDemo />
      <Weather data={weather}/>
    </Container>
  );
}

export default Home;
