import React, {useState, useEffect} from 'react'

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
              <h1 className="display-3">{user.firstName} {user.lastName}</h1>
            </Col>
            <Col sm="2">
              {!isCreate && <ButtonToggle className="header-button" onClick={toggleIsCreate}>Create</ButtonToggle>}
              {isCreate && <ButtonToggle className="header-button" onClick={toggleIsCreate}>Images</ButtonToggle>}
            </Col>
          </Row>
          <hr className="my-3" />



        {!isCreate && <PersonalImages />}
        {isCreate && <ImageForm afterCreatePost={afterCreatePost} />}



        </Col>
        <Col sm="3"></Col>
      </Row>
    </Container>
  );
}

export default Personal;
