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

import ImageForm from '../helper/ImageForm';

function Personal() {

  const [isUpload, setIsUpload] = useState();

  return (
    <Container fluid>
      <ImageForm />
    </Container>
  );
}

export default Personal;
