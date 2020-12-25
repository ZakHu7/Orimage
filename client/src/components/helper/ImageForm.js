import React, {useState, useRef, useCallback} from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { 
  Row,
  Col,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Jumbotron,
  Alert,
  CustomInput,
  FormFeedback,
} from 'reactstrap';
import { validate } from 'uuid';

function ImageForm() {
  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 / 1 });
  const [testImg, setTestImg] = useState('');

  const [error, setError] = useState("");
  const [author, setAuthor] = useState("");
  const [validInput, setValidInput] = useState({
    image: true,
    author: true
  });
  
  const validate = () => {
    var foundError = false;
    var tmpValidInput = {...validInput};
    if (upImg === null) {
      tmpValidInput["image"] = false;
      foundError = true;
    }
    if (author === "") {
      tmpValidInput["author"] = false;
      foundError = true;
    }
    setValidInput(tmpValidInput);
    return foundError;
  }

  // react-image-crop code to get cropped blob
  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
   
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
   
    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');
   
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  }

  async function uploadImage(event) {
    if (validate()) {
      return;
    }

    const blobURL = await getCroppedImg(imgRef.current, crop, 'preview.jpg')

    var formData = new FormData();
    formData.append("image", blobURL);
    formData.append("author", author);
    console.log(author);

    fetch(`/api/images/image-upload`, {
      method: 'post',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        setError(res.error);
      } else {
        setTestImg(res.fileUrl);
      }
    })
    .catch(err => {console.log(err)});
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      
      var tmpValidInput = {...validInput};
      tmpValidInput["image"] = true;
      setValidInput(tmpValidInput);
    }
  };

  const handleInputChange = (e, setState, field) => {
    setState(e.target.value);
    var tmpValidInput = {...validInput};
    tmpValidInput[field] = true;
    setValidInput(tmpValidInput);
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  return (
    <Row>
      <Col xs="3"></Col>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Create Post</h1>
          <p className="lead">Create a post of your origami model!</p>
          <hr className="my-2" />
          {error && <Alert color="danger">
            {error}
          </Alert>}
          <Form>
            <FormGroup>
              <Label for="fileInput">File Browser</Label>
              <CustomInput type="file" id="fileInput" name="customFile" accept="image/*" 
                onChange={handleFileChange} invalid={!validInput.image}/>
              <span className='centered'>
                <ReactCrop
                  className="react-crop"
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  // onComplete={(c) => setCompletedCrop(c)}
                />
              </span>
              <img src={testImg}></img>
            </FormGroup>
            <FormGroup>
              <Label for="authorInput" id="authorLabel">Author</Label>
              <Input name="author" id="authorInput" placeholder="Enter the author"
                onChange={(e) => handleInputChange(e, setAuthor, 'author')} invalid={!validInput.author}/>
              <FormFeedback>Oh no! Please give the author</FormFeedback>
            </FormGroup>

            <Button onClick={uploadImage}>Submit</Button>
          </Form>
        </Jumbotron>
      </Col>
      <Col xs="3"></Col>
    </Row>
  )
}

export default ImageForm;