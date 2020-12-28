import React from 'react'

import {
  Container,
  Row,
  Jumbotron,
  Col,
} from 'reactstrap';

import gif from '../../media/origami_01.gif';

function Home() {

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
                <p className="lead">View and upload your of origami!</p>
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
