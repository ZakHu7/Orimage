import React, {useState} from "react"

import {
  Container,
  Row,
  Col,
  ButtonToggle 
} from 'reactstrap';

function Explore(props) {
  const [test, setTest] = useState('');

  function login() {
    fetch(`/user/login`)
    .then(res => res.json())
    .then(res => {
      window.location = `${res.redirectUrl}`;
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col sm="3"></Col>
        <Col>
            <Row>
              <Col>
                <h1 className="display-3">Explore Models!</h1>
              </Col>
              <Col sm="2">
                <ButtonToggle className="header-button" >Filter</ButtonToggle>
              </Col>
            </Row>
            <hr className="my-3" />




        </Col>
        <Col sm="3"></Col>
      </Row>
    </Container>
  );
}

export default Explore
