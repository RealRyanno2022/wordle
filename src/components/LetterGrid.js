import React, { useState, useEffect } from 'react';
import styles from './LetterGrid.module.css';
import Letter from './Letter';
import Key from './Key';
import Enter from './Enter';
import Backspace from './Backspace';
import InputModal from './InputModal';

function LetterGrid() {
  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));
  const [input, setInput] = useState([]);
  const [colors, setColors] = useState(Array(30).fill('gray'));
  let [enterCount, setEnterCount] = useState(0);
  let [funcCount, setFuncCount] = useState(1);
  const [canInput, setCanInput] = useState(true);
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  const [canEnter, setCanEnter] = useState(true);

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
    const lastLetterIndex = newLetterGrid.findLastIndex((char) => char !== '');
    if (lastLetterIndex !== -1) {
      const inputIndex = input.length - 1;
      if (inputIndex % 5 === 4 && input.length >= 5) {
        // check if previous row is completed before allowing backspace
        setCanInput(true);
        return;
      }
      input.pop();
      newLetterGrid[lastLetterIndex] = '';
      setLetterGrid(newLetterGrid);
    }
  }

  function handleKeyPress(e) {
    const clickedLetter = e.key;
    if (typeof clickedLetter === "string" && clickedLetter !== "") {
      if (clickedLetter === "Enter") {
        e.preventDefault();
        if (input.length % 5 === 0 && input.length > 0) {
          setEnterCount(enterCount + 1);
          decideColors(input, "ABOTT");
          setIsInputEnabled(true);
          setCanEnter(false);
          setCanInput(true);
        } else if (canInput) {
          setIsInputEnabled(true);
          setCanInput(true);
        } else {
          console.log("You need to put in more letters");
        }
      } else if (isInputEnabled || canInput) {
        setInput(input => [...input, clickedLetter.toUpperCase()]);
        const emptyIndex = letterGrid.indexOf('');
        if (emptyIndex !== -1) {
          const newLetterGrid = [...letterGrid];
          newLetterGrid[emptyIndex] = clickedLetter.toUpperCase();
          setLetterGrid(newLetterGrid);
          if (input.length % 5 === 4) {
            setIsInputEnabled(false);
            setCanInput(false);
          } else if (input.length % 5 === 0 && input.length > 0) {
            setIsInputEnabled(true);
            setCanInput(true);
          }
        } else {
          console.log("You need to hit Enter before entering more letters");
        }
      } 
    }
  }

  function handleEnterClick() {
    if (input.length % 5 === 0 && input.length > 1 && funcCount !== enterCount) {
      console.log("Success");
      enterCount++;
      funcCount++;
      console.log("Evaluating your answer...");
  
      decideColors(letterGrid, "ABOTT");
      setCanEnter(true);
      setCanInput(true);
      setIsInputEnabled(true); 
    } else {
      console.log("Failure");
      console.log("You need to put in more letters");
    }
  }

  function handleInputModalClick() {
    const newLetterGrid = Array(30).fill('');
    const newColors = Array(30).fill('gray');
    setLetterGrid(newLetterGrid);
    setColors(newColors);
    setInput([]);
    setEnterCount(0);
    setFuncCount(1);
    setCanInput(true);
    setIsInputEnabled(true);
    setCanEnter(true);
  }

  function handleRestartClick() {
    const newLetterGrid = Array(30).fill('');
    const newColors = Array(30).fill('gray');
    setLetterGrid(newLetterGrid);
    setColors(newColors);
    setInput([]);
    setEnterCount(0);
    setFuncCount(1);
    setCanInput(true);
    setIsInputEnabled(true);
    setCanEnter(true);
  }

  function decideColors(letterGrid, correctWord) {
    const newColors = [];
    for (let i = 0; i < letterGrid.length; i++) {
      const letter = letterGrid[i];
      const index = correctWord.indexOf(letter);
      if (index === i) {
        newColors.push('green');
      } else if (index !== -1) {
        newColors.push('yellow');
      } else {
        newColors.push('black');
      }
    }
  
    setColors(newColors);
  }

  return (
    <div>
      <InputModal letterGrid={letterGrid} onClick={handleInputModalClick} />
      {[...Array(6)].map((_, row) => (
        <div className={styles.lettergrid} key={row}>
          {[...Array(5)].map((_, col) => {
            const index = row * 5 + col;
            return (
              <Letter
                boxValue={letterGrid[index]}
                key={index}
                style={{ backgroundColor: colors[index] }}
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
        <Enter onClick={handleEnterClick} disabled={canEnter}>ENTER</Enter>
        <Key onClick={() => handleKeyClick('Z')}>Z</Key>
        <Key onClick={() => handleKeyClick('X')}>X</Key>
        <Key onClick={() => handleKeyClick('C')}>C</Key>
        <Key onClick={() => handleKeyClick('V')}>V</Key>
        <Key onClick={() => handleKeyClick('B')}>B</Key>
        <Key onClick={() => handleKeyClick('N')}>N</Key>
        <Key onClick={() => handleKeyClick('M')}>M</Key>
        <Backspace onClick={handleBackspaceClick} />
      </div>
      <div className={styles.buttons}>
        <button className={styles.restartButton} onClick={handleRestartClick}>RESTART</button>
      </div>
    </div>
  );
}

export default LetterGrid;