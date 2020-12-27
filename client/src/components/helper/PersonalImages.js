import React, {useState, useRef, useCallback, useEffect} from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Input,
  Button,
  CardText,
  CardSubtitle,
  CardTitle,
  Jumbotron,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
} from 'reactstrap';

function PersonalImages() {
  const [imageList, setImageList] = useState([]);

  const getImages = () => {
    fetch(`/api/images/user-images`)
    .then(res => res.json())
    .then(res => {
      setImageList(res);
    })
  }

  const createCards = (image) => {
    return (
      <Col sm="4" className="card-container" key={image.id}>
        <Card>
          <div className="dim-image-container">
            <CardImg className="dim-image" top width="100%" src={image.url} alt="Card image cap" />
            <div className="image-text-container">
              <CardSubtitle tag="h6" className="mb-2 text-muted">Designer: {image.designed_by}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Folded By: {image.folded_by}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Model: {image.model}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Difficulty: {image.difficulty}</CardSubtitle>
            </div>
          </div>
        </Card>
      </Col>
    )
  }

  useEffect(() => {
    getImages();
  }, [])
  
  return (
    <Jumbotron className="personal-jumbotron">
      <Row>
        {imageList && imageList.map((image) => createCards(image))}
        {imageList.length === 0 && <p className="lead">Create and upload your own images. Then view them here!</p>}
      </Row>
    </Jumbotron>
  )
}

export default PersonalImages;