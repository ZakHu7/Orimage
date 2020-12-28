import React from "react"
import {
  Link
} from 'react-router-dom';

import {
  Container,
  Row,
  Jumbotron,
  Col,
} from 'reactstrap';

function Error() {
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
                <h1 className="display-4">Oops!</h1>
                <p className="lead">This page does not exist or is inaccessible at this time.</p>
                <hr className="my-3" />
              <Link className="lead" to="/">
                Go Home
              </Link>
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
  )
};

export default Error
