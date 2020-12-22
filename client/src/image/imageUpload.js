import React, {useState, useRef, useCallback} from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { 
  Row,
  Col,
  Input,
  Button,
} from 'reactstrap';

function CropDemo() {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 / 1 });
  const [testImg, setTestImg] = useState('');

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
    const blobURL = await getCroppedImg(imgRef.current, crop, 'preview.jpg')

    var formData = new FormData();
    formData.append("image", blobURL);
    // formData.append('name', 'some value user types');
    // formData.append('description', 'some value user types');
    console.log(blobURL);

    fetch(`/api/image-upload`, {
      method: 'post',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.fileUrl);
      setTestImg(res.fileUrl);
    })
    .catch(err => console.log(err));
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  return (
    <Row>
      <Col xs="3">.col</Col>
      <Col>
        <Input type="file" accept="image/*" onChange={handleFileChange}/>
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          // onComplete={(c) => setCompletedCrop(c)}
        />
        <Button color="primary" onClick={uploadImage}>Add City</Button>
        <img src={testImg}></img>
      </Col>
      <Col xs="3">.col</Col>
    </Row>
  )
}

export default CropDemo;