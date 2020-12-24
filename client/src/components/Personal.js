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

import CropDemo from '../services/imageUpload';

function Personal() {

  const [weather, setWeather] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [newCityName, setNewCityName] = useState('');

  return (
    <Container fluid>
      <CropDemo />
    </Container>
  );
}

export default Personal;
