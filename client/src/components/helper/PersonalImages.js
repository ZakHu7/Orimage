import React, {useState, useEffect} from 'react'

import 'react-image-crop/dist/ReactCrop.css';
import {
  CardSubtitle,
  CardTitle,
  Jumbotron,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  Alert,
} from 'reactstrap';

function PersonalImages() {
  const [imageList, setImageList] = useState([]);
  const [imageListError, setImageListError] = useState("");

  const getUserImages = () => {
    fetch(`/api/images/user-images`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.error) {
        setImageListError(res.error);
      } else {
        setImageList(res);
      }
    })
  }

  const createPersonalCards = (image) => {
    return (
      <Col sm="4" className="small-card-container" key={image.id}>
        <Card>
          <div className="dim-image-container">
            <CardImg className="dim-image" top width="100%" src={image.url} alt={image.model} />
            <div className="image-text-container">
              <CardSubtitle tag="h6" className="mb-2">Designer: {image.designed_by}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2">Folded By: {image.folded_by}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2">Model: {image.model}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2">Difficulty: {image.difficulty}</CardSubtitle>
            </div>
          </div>
        </Card>
      </Col>
    )
  }

  useEffect(() => {
    getUserImages();
  }, [])
  
  return (
    <Jumbotron className="personal-jumbotron">
      <Row>
        {imageListError && <Alert color="danger">
          {imageListError}
        </Alert>}
        {imageList && imageList.map((image) => createPersonalCards(image))}
        {imageList.length === 0 && <p className="lead">Create and upload your own images. Then view them here!</p>}
      </Row>
    </Jumbotron>
  )
}

export default PersonalImages;