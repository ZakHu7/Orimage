import React, {useState} from 'react'

import {
  Container,
  Row,
  Col,
  ButtonToggle 
} from 'reactstrap';

import ImageForm from '../helper/ImageForm';
import PersonalImages from '../helper/PersonalImages';

function Personal({user}) {
  const [isCreate, setIsCreate] = useState(false);

  const name = user.firstName + " " + user.lastName;

  const toggleIsCreate = () => {
    const curIsCreate = isCreate;
    setIsCreate(!curIsCreate);
  }

  const afterCreatePost = () => {
    toggleIsCreate();
  }

  return (
    <Container fluid>
      <Row>
        <Col sm="3"></Col>
        <Col>
          <Row>
            <Col>
              <h1 className="display-3">{name}</h1>
            </Col>
            <Col sm="2">
              {!isCreate && <ButtonToggle className="header-button" onClick={toggleIsCreate}>Create</ButtonToggle>}
              {isCreate && <ButtonToggle className="header-button" onClick={toggleIsCreate}>Images</ButtonToggle>}
            </Col>
          </Row>
          <hr className="my-3" />



        {!isCreate && <PersonalImages />}
        {isCreate && <ImageForm afterCreatePost={afterCreatePost} name={name} />}



        </Col>
        <Col sm="3"></Col>
      </Row>
    </Container>
  );
}

export default Personal;
