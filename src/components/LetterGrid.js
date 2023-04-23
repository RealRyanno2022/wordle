import React, { useState, useEffect } from 'react';
import Letter from './Letter';
import styles from './LetterGrid.module.css';
import words from '../words/words.js';
import InputModal from './InputModal';
import Key from './Key';
import Enter from './Enter';
import Backspace from './Backspace';
import backspaceImage from './backspaceImage.png';

function LetterGrid(props) {
  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));
  const [letterCount, setLetterCount] = useState(0);
  const [correctWord, setCorrectWord] = useState('');

  const [gameState, setGameState] = useState({
    letterGrid: Array(30).fill(''),
    letterCount: 0,
    isValidWord: false,
  });

  useEffect(() => {
    function handleKeyDown(event) {
      const keyPressed = event.key.toUpperCase();
      if (/^[A-Z]$/.test(keyPressed)) {
        handleKeyClick(keyPressed);
      } else if (keyPressed === 'ENTER') {
        handleEnterClick();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        handleBackspaceClick(letterGrid);
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [letterGrid]);

  useEffect(() => {
    setCorrectWord(chooseWord());
  }, []);

  function chooseWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log(words[randomIndex]);
    return words[randomIndex];
  }

  function handleEnterClick() {
    let isValidWord = false;
    if (gameState.letterCount === 5) {
      const firstFiveChars = gameState.letterGrid.slice(0, 5).join('');
      if (words.includes(firstFiveChars)) {
        console.log(true);
        isValidWord = true;
      } else {
        console.log(false);
      }
    }

    // Update game state with the new letter grid and count
    setGameState(prevState => ({
      ...prevState,
      letterGrid: Array(30).fill(''),
      letterCount: 0,
      isValidWord
    }));
  }

  function handleKeyClick(clickedLetter) {
    const emptyBoxIndex = letterGrid.findIndex((value) => value === '');
      
    if (emptyBoxIndex !== -1 && letterCount < 5) {
      const newLetterGrid = [...letterGrid];
      newLetterGrid[emptyBoxIndex] = clickedLetter.toUpperCase();
      setLetterGrid(newLetterGrid);
      setLetterCount(letterCount + 1);
    }
  }

  function handleBackspaceClick(letterGrid) {
    const newLetterGrid = [...letterGrid]; // create a new copy of letterGrid
    const lastNonEmptyIndex = newLetterGrid.reduceRight((acc, curr, index) => {
      if (acc === -1 && curr !== "") {
        return index;
      }
      return acc;
    }, -1); // find the index of the last non-empty element in the array
  
    if (lastNonEmptyIndex !== -1) { // check if there is at least one non-empty element in the array
      newLetterGrid[lastNonEmptyIndex] = ""; // set the last non-empty element to an empty string
      setLetterGrid(newLetterGrid);
      setLetterCount(letterCount - 1);
    }
  }

  function isValidFiveLetterWord(letterGrid) {
    const firstFiveChars = letterGrid.slice(0, 5).join('');
    if (words.includes(firstFiveChars)) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }


  return (

    <div>
      <InputModal letterGrid={letterGrid} />

      {[...Array(6)].map((_, row) => (
        <div className={styles.lettergrid} key={row}>
          {letterGrid.slice(row * 5, row * 5 + 5).map((boxValue, col) => (
            <Letter boxValue={boxValue} key={row * 5 + col} />
          ))}
        </div>
      ))}
      <div className={styles.space}>

      </div>


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
        <Enter onClick={() => handleEnterClick('ENTER')}>ENTER</Enter>
        <Key onClick={() => handleKeyClick('Z')}>Z</Key>
        <Key onClick={() => handleKeyClick('X')}>X</Key>
        <Key onClick={() => handleKeyClick('C')}>C</Key>
        <Key onClick={() => handleKeyClick('V')}>V</Key>
        <Key onClick={() => handleKeyClick('B')}>B</Key>
        <Key onClick={() => handleKeyClick('N')}>N</Key>
        <Key onClick={() => handleKeyClick('M')}>M</Key>
        <Backspace onClick={() => handleBackspaceClick('BACKSPACE')}>
          <img 
          src={backspaceImage} 
          width="37" 
          height="40" 
          style=
            {{
              filter: 
                "brightness(0), grayscale(100%) !important"
            }} 
          alt="Backspace" 
          />
        </Backspace>
      </div>

        
      </div>
    
  );
}

export default LetterGrid;