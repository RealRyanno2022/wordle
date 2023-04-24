import React, { useState, useEffect } from 'react';
import styles from './LetterGrid.module.css';
import Letter from './Letter';
import Key from './Key';
import Enter from './Enter';
import Backspace from './Backspace';
import InputModal from './InputModal';
import backspaceImage from './backspaceImage.png';

function LetterGrid() {
  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));
  const [input, setInput] = useState([]);

  function handleKeyClick(clickedLetter) {
    const newLetterGrid = [...letterGrid];
    const emptyIndex = newLetterGrid.indexOf('');
    if (emptyIndex !== -1) {
      newLetterGrid[emptyIndex] = clickedLetter.toUpperCase();
      setLetterGrid(newLetterGrid);
    }
  }

  function handleBackspaceClick() {
    
    const newLetterGrid = [...letterGrid];
    input.pop();
    console.log(input);
    const lastLetterIndex = newLetterGrid.findLastIndex(char => char !== '');
    if (lastLetterIndex !== -1) {
      newLetterGrid[lastLetterIndex] = '';
      setLetterGrid(newLetterGrid);
    }
  }

  let enterCount = 0;

  function handleKeyPress(e) {
    const clickedLetter = e.key;
    let rowTest = 1;
    console.log(enterCount);
  
    if (typeof clickedLetter === "string" && clickedLetter !== "") {
      if (input.length % 5 === 0 && enterCount != rowTest && input.length > 1) {
        // And enter hasn't been pressed
        return;
      } else {
        console.log("Put in more letters... 2");
      }
  
      input.push(clickedLetter.toUpperCase());
      console.log(input);
      const emptyIndex = letterGrid.indexOf('');
      if (emptyIndex !== -1) {
        const newLetterGrid = [...letterGrid];
        newLetterGrid[emptyIndex] = clickedLetter.toUpperCase();
        setLetterGrid(newLetterGrid);
      }
    }
  }
  
  console.log(letterGrid);
  console.log(input);
  
  function handleEnterClick() {
    if (input.length % 5 === 0 && input.length > 1) {
      console.log("Success");
      enterCount++;
      console.log("Evaluating your answer...");
    } else {
      console.log("Failure");
      console.log("You need to put in more letters");
    }
  }

  useEffect(() => {

    const backspaceHandler = (e) => {
      if (e.key === 'Backspace') handleBackspaceClick();
    };

    const enterHandler = (e) => {
      if (e.key === 'Enter') handleEnterClick();
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', backspaceHandler);
    window.addEventListener('keydown', enterHandler);
  
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', backspaceHandler);
      window.removeEventListener('keydown', enterHandler);
    };
  }, [letterGrid]);

 

  return (
    <div>
      <InputModal letterGrid={letterGrid} />
      {[...Array(6)].map((_, row) => (
        <div className={styles.lettergrid} key={row}>
          {[...Array(5)].map((_, col) => {
            const index = row * 5 + col;
            return (
              <Letter
                boxValue={letterGrid[index]}
                key={index}
              />
            );
          })}
        </div>
      ))}
      <div className={styles.keyboard}>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
          <Key key={letter} onClick={() => handleKeyClick(letter)}>
            {letter}
          </Key>
        ))}
      </div>
      <div className={styles.keyboard}>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter) => (
          <Key key={letter} onClick={() => handleKeyClick(letter)}>
            {letter}
          </Key>
        ))}
      </div>
      <div className={styles.keyboard}>
        <Enter onClick={() => handleEnterClick()}></Enter>
        <Key onClick={() => handleKeyClick('Z')}>Z</Key>
        <Key onClick={() => handleKeyClick('X')}>X</Key>
        <Key onClick={() => handleKeyClick('C')}>C</Key>
        <Key onClick={() => handleKeyClick('V')}>V</Key>
        <Key onClick={() => handleKeyClick('B')}>B</Key>
        <Key onClick={() => handleKeyClick('N')}>N</Key>
        <Key onClick={() => handleKeyClick('M')}>M</Key>
        <Backspace onClick={handleBackspaceClick}></Backspace>
      </div>
    </div>
    
  );
}

export default LetterGrid;