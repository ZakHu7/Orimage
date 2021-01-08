import React, { useEffect, useState } from 'react';
import {
  Progress,
} from 'reactstrap';

function DifficultyBar({difficulty}) {
  const [barLength, setBarLength] = useState([0,0,0]);
  const [difficultyList, setDifficultyList] = useState(["","",""]);

  useEffect(() => {
    const calculateBarLength = () => {
      const newBar = [0,0,0];
      const newDifficultyList = ["","",""];
      if (difficulty === "Easy") {
        newBar[0] = 33;
        newDifficultyList[0] = difficulty;
      } else if (difficulty === "Normal") {
        newBar[0] = 33;
        newBar[1] = 34;
        newDifficultyList[1] = difficulty;
      } else if (difficulty === "Hard") {
        newBar[0] = 33;
        newBar[1] = 34;
        newBar[2] = 33;
        newDifficultyList[2] = difficulty;
      }
      setBarLength(newBar);
      setDifficultyList(newDifficultyList);
    }
    calculateBarLength();
  }, [difficulty])

  return (
    <Progress multi>
      <Progress bar color="success" value={barLength[0]}> {difficultyList[0]} </Progress>
      <Progress bar color="warning" value={barLength[1]}> {difficultyList[1]} </Progress>
      <Progress bar color="danger" value={barLength[2]}> {difficultyList[2]} </Progress>
    </Progress>
  );
}

export default DifficultyBar;