import React, {useState, useEffect} from 'react'

import 'react-image-crop/dist/ReactCrop.css';
import {
  CardSubtitle,
  Button,
  Jumbotron,
  Row,
  Col,
  Card,
  CardImg,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

function PersonalImages() {
  const [imageList, setImageList] = useState([]);
  const [imageListError, setImageListError] = useState("");
  const [imageToDelete, setImageToDelete] = useState(null);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
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

  const deleteImage = (image) => {
    fetch(`/api/images/delete-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageId: image.id,
        userId: image.user_id,
        imageKey: image.imagekey,
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        console.log(res);
      } else {
        toggle();
        getUserImages();
      }
    })
  }

  const handleDeleteChange = (image, e) => {
    console.log(image);
    toggle();
    setImageToDelete(image);
  };

  const handleDeleteImage = (e) => {
    deleteImage(imageToDelete);
  };


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
              <Button color="danger" onClick={(e) => handleDeleteChange(image, e)}>DELETE</Button>
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

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Permanently Delete Image</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this image?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteImage}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggle}>No</Button>
        </ModalFooter>
      </Modal>
    </Jumbotron>
  )
}

export default PersonalImages;