import React, {useState, useEffect} from 'react'
import {
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  Col,
} from 'reactstrap';
import {difficultyList} from "./DifficultyList";

function Filter({isScrolled, afterFilterSubmit}) {
  const [designedBy, setDesignedBy] = useState("");
  const [foldedBy, setFoldedBy] = useState("");
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [easy, setEasy] = useState(false);
  const [normal, setNormal] = useState(false);
  const [hard, setHard] = useState(false);

  const [lastImageCreatedDate, setLastImageCreatedDate] = useState(new Date(Date.now()).toISOString());
  const [lastFilterSetting, setLastFilterSetting] = useState("");
  var isNewFilter = false;

  const handleInputChange = (e, setState, field) => {
    setState(e.target.value);
  }

  const handleCheckboxChange = (e, setState, field) => {
    setState(e.target.checked);
  }

  useEffect(() => {
    if (isScrolled)
      getFilteredImages();
  }, [isScrolled]) // eslint-disable-line react-hooks/exhaustive-deps

  const getFilteredImages = () => {
    const filters = makeQueryString();
    let lastDate = lastImageCreatedDate;
    if (filters !== lastFilterSetting) {
      lastDate = new Date(Date.now()).toISOString();
      setLastFilterSetting(filters);
      isNewFilter = true;
    } else {
      isNewFilter = false;
    }
    fetch(`/api/images/filtered-images/${lastDate}+${filters}`)
    .then(res => res.json())
    .then(res => {
      if (!res.error) {
        if (res.length !== 0) {
          setLastImageCreatedDate(res.slice(-1)[0].created_on);
        }
      }
      afterFilterSubmit(res, isNewFilter);
    })
  }

  const makeQueryString = () => {
    const res = [];
    if (designedBy)
      res.push(`designed_by=${designedBy}`);
    if (foldedBy)
      res.push(`folded_by=${foldedBy}`);
    if (category)
      res.push(`category=${category}`);
    if (model)
      res.push(`model=${model}`);
    if (easy)
      res.push(`difficulty=easy`);
    if (normal)
      res.push(`difficulty=normal`);
    if (hard)
      res.push(`difficulty=hard`);
    
    if (res.length === 0)
      return "";
    return "?"+res.join("&");
  }

  return (
    <Form>
      <FormGroup>
        <Label for="modelInput" id="modelLabel">Model (Eg. Tiger, Plane, Acorn)</Label>
        <Input name="model" id="modelInput" placeholder="Filter by model name"
          onChange={(e) => handleInputChange(e, setModel, 'model')}/>
        <FormFeedback>Enter the what kind of thing the model is</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="designedByInput" id="designedByLabel">Designed By</Label>
        <Input name="designedBy" id="designedByInput" placeholder="Filter by designer"
          onChange={(e) => handleInputChange(e, setDesignedBy, 'designedBy')}/>
        <FormFeedback>Oh no! Please give the designer</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="foldedByInput" id="foldedByLabel">Folded By</Label>
        <Input name="foldedBy" id="foldedByInput" placeholder="Filter by folder"
          onChange={(e) => handleInputChange(e, setFoldedBy, 'foldedBy')}
          value={foldedBy}/>
        <FormFeedback>Who folded the model in the picture?</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="categoryInput" id="categoryLabel">Category (Eg. Animal, Fantasy, Human)</Label>
        <Input name="category" id="categoryInput" placeholder="Filter by category"
          onChange={(e) => handleInputChange(e, setCategory, 'category')}/>
        <FormFeedback>Oh no! Please give the category</FormFeedback>
      </FormGroup>
      <FormGroup tag="fieldset" row>
        <legend className="col-form-label col-sm-2">Difficulty</legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="difficulty" checked={easy}
              value={difficultyList[0]} onChange={(e) => handleCheckboxChange(e, setEasy, 'difficulty')} />{' '}
              {difficultyList[0]}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="difficulty" checked={normal}
              value={difficultyList[1]} onChange={(e) => handleCheckboxChange(e, setNormal, 'difficulty')} />{' '}
              {difficultyList[1]}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="difficulty" checked={hard}
              value={difficultyList[2]} onChange={(e) => handleCheckboxChange(e, setHard, 'difficulty')} />{' '}
              {difficultyList[2]}
            </Label>
          </FormGroup>
        </Col>
      </FormGroup>

      <Button onClick={getFilteredImages}>Submit</Button>
    </Form>
  );
}

export default Filter;