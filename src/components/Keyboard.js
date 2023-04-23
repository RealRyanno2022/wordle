import React from 'react';
import styles from './Keyboard.module.css';
import Backspace from './Backspace';
import Key from './Key';
import Enter from './Enter';
import { useState } from 'react';
import backspaceImage from './backspaceImage.png';
import Letter from './Letter';

function Keyboard() {
  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));

  function keyClickHandler(e) {
    const clickedLetter = e.target.getAttribute('data-value');
    console.log(clickedLetter);
    const emptyBoxIndex = letterGrid.findIndex((value) => value === '');
    if (emptyBoxIndex !== -1) {
      const newLetterGrid = [...letterGrid];
      newLetterGrid[emptyBoxIndex] = clickedLetter;
      setLetterGrid(newLetterGrid);
      console.log(newLetterGrid); 
    }
    console.log("test");
  }

  const keyValues = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div>
      {keyValues.map((row, index) => (
        <div className={styles.keyboard} key={index}>
          {row.map((keyValue) => (
            <Key keyValue={keyValue} onClick={keyClickHandler} key={keyValue} />
          ))}
          {index === 2 && <Backspace image={backspaceImage} onClick={keyClickHandler} />}
          {index === 2 && <Enter keyValue="ENTER" onClick={keyClickHandler} />}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;