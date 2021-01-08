import React, {useState, useRef, useCallback} from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Jumbotron,
  Alert,
  CustomInput,
  FormFeedback,
  Spinner,
  Col,
} from 'reactstrap';
import {difficultyList} from "../helper/DifficultyList";

function ImageForm({afterCreatePost, name}) {
  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 / 1 });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [designedBy, setDesignedBy] = useState("");
  const [foldedBy, setFoldedBy] = useState(name);
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [difficulty, setDifficulty] = useState(difficultyList[1]);

  const [validInput, setValidInput] = useState({
    image: true,
    designedBy: true,
    foldedBy: true,
    category: true,
    model: true,
    difficulty: true,
  });
  
  const validate = () => {
    var foundError = false;
    var tmpValidInput = {...validInput};
    if (upImg === null) {
      tmpValidInput["image"] = false;
      foundError = true;
    }
    if (designedBy === "") {
      tmpValidInput["designedBy"] = false;
      foundError = true;
    }
    if (foldedBy === "") {
      tmpValidInput["foldedBy"] = false;
      foundError = true;
    }
    if (category === "") {
      tmpValidInput["category"] = false;
      foundError = true;
    }
    if (model === "") {
      tmpValidInput["model"] = false;
      foundError = true;
    }
    if (difficulty === "") {
      tmpValidInput["difficulty"] = false;
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
    setIsLoading(true);
    
    const blobURL = await getCroppedImg(imgRef.current, crop, 'preview.jpg')

    var formData = new FormData();
    formData.append("image", blobURL);
    formData.append("designedBy", designedBy);
    formData.append("foldedBy", foldedBy);
    formData.append("category", category);
    formData.append("model", model);
    formData.append("difficulty", difficulty);

    fetch(`/api/images/image-upload`, {
      method: 'post',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      setIsLoading(false);
      if (res.error) {
        setError(res.error);
      } else {
        afterCreatePost();
      }
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
    });
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
    <Jumbotron className="personal-jumbotron">
      <h1 className="display-4">Create Post</h1>
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
            />
          </span>
        </FormGroup>
        <FormGroup>
          <Label for="modelInput" id="modelLabel">Model (Eg. Tiger, Plane, Acorn)</Label>
          <Input name="model" id="modelInput" placeholder="What is the model?"
            onChange={(e) => handleInputChange(e, setModel, 'model')} invalid={!validInput.model}/>
          <FormFeedback>Enter the what kind of thing the model is</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="designedByInput" id="designedByLabel">Designed By</Label>
          <Input name="designedBy" id="designedByInput" placeholder="Enter the designer"
            onChange={(e) => handleInputChange(e, setDesignedBy, 'designedBy')} invalid={!validInput.designedBy}/>
          <FormFeedback>Oh no! Please give the designer</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="foldedByInput" id="foldedByLabel">Folded By</Label>
          <Input name="foldedBy" id="foldedByInput" placeholder="Enter the person who folded the model"
            onChange={(e) => handleInputChange(e, setFoldedBy, 'foldedBy')} invalid={!validInput.foldedBy}
            value={foldedBy}/>
          <FormFeedback>Who folded the model in the picture?</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="categoryInput" id="categoryLabel">Category (Eg. Animal, Fantasy, Human)</Label>
          <Input name="category" id="categoryInput" placeholder="Enter the category"
            onChange={(e) => handleInputChange(e, setCategory, 'category')} invalid={!validInput.category}/>
          <FormFeedback>Oh no! Please give the category</FormFeedback>
        </FormGroup>
        <FormGroup tag="fieldset" row>
          <legend className="col-form-label col-sm-2">Difficulty</legend>
          <Col sm={10}>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="difficulty" checked={difficulty === difficultyList[0]}
                value={difficultyList[0]} onChange={(e) => handleInputChange(e, setDifficulty, 'difficulty')} />{' '}
                {difficultyList[0]}
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="difficulty" checked={difficulty === difficultyList[1]}
                value={difficultyList[1]} onChange={(e) => handleInputChange(e, setDifficulty, 'difficulty')} />{' '}
                {difficultyList[1]}
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="difficulty" checked={difficulty === difficultyList[2]}
                value={difficultyList[2]} onChange={(e) => handleInputChange(e, setDifficulty, 'difficulty')} />{' '}
                {difficultyList[2]}
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>

        <Button onClick={uploadImage}>Submit</Button>
      </Form>
      
      {isLoading && <div className="loading-spinner-container">
        <Spinner size="xl" color="info" className="loading-spinner" />
      </div>}
    </Jumbotron>
  )
}

export default ImageForm;