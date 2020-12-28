import React, {useState, useEffect} from "react"
import InfiniteScroll from 'react-infinite-scroll-component';
import DifficultyBar from "../helper/DifficultyBar";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardSubtitle,
  CardTitle,
  CardHeader,
  CardBody,
  Alert,
  UncontrolledCollapse,
} from 'reactstrap';

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};


function Explore() {
  const [imageList, setImageList] = useState([]);
  const [imageListError, setImageListError] = useState("");
  // pointer to where the last image fetched is - used for infinite scroll
  const [lastImageCreatedDate, setLastImageCreatedDate] = useState(new Date(Date.now()).toISOString());
  const [isScrollable, setIsScrollable] = useState(true);
  
  const getAllImages = () => {
    fetch(`/api/images/all-images/${lastImageCreatedDate}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.error) {
        setImageListError(res.error);
      } else {
        if (res.length === 0) {
          setIsScrollable(false);
        } else {
          setImageList(imageList.concat(res));
          setLastImageCreatedDate(res.slice(-1)[0].created_on);
        }
      }
    })
  }

  useEffect(() => {
    getAllImages();
  }, [])

  const createCards = (image) => {
    return (
      <Col sm="7" className="large-card-container" key={image.id}>
        <Card>
          <div className="dim-image-container">
            <CardHeader className="display-4">{image.model}</CardHeader>
            <CardImg top width="100%" src={image.url} alt={image.model} />
            <CardBody>
              <Row>
                <Col sm="6">
                  <CardTitle className="lead" tag="h5">Designer: {image.designed_by}</CardTitle>
                </Col>
                <Col sm="6">
                  <DifficultyBar difficulty={image.difficulty}/>
                </Col>
                <Col sm="6">
                  <CardSubtitle tag="h6" className="mb-2 text-muted lead">Folded By: {image.folded_by}</CardSubtitle>
                </Col>
              </Row>
            </CardBody>
          </div>
        </Card>
      </Col>
    )
  }

  const fetchMoreData = () => {
    getAllImages();
  };

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
              <Button  className="header-button" id="filterToggle">Filter</Button>
            </Col>
          </Row>
          <Row>
            <UncontrolledCollapse toggler="#filterToggle">
              <Card>
                <CardBody>
                  Filter is not implemented at this time
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </Row>
          <hr className="my-3" />
          <Row>
            <InfiniteScroll
              dataLength={imageList.length}
              next={fetchMoreData}
              hasMore={isScrollable}
              loader={<h4 className="display-4">Loading... </h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <hr className="my-3" />
                  <div className="lead" tag="h5">Yay! You have seen it all</div>
                </p>
              }
            >
              {imageList && imageList.map((image) => createCards(image))}
            </InfiniteScroll>

            {imageList.length === 0 && <p className="lead">There are no images to view. Maybe you can upload some of your own!</p>}
            {imageListError && <Alert color="danger">
              {imageListError}
            </Alert>}
          </Row>
        </Col>
        <Col sm="3"></Col>
      </Row>
    </Container>
  );
}

export default Explore
