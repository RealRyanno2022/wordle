import React, { useState, useEffect, useCallback } from 'react';
import styles from './LetterGrid.module.css';
import Letter from './Letter';
import Key from './Key';
import Enter from './Enter';
import Backspace from './Backspace';
import InputModal from './InputModal';
import backspaceImage from './backspaceImage.png';

function LetterGrid() {
  const [letterGrid, setLetterGrid] = useState(Array(30).fill(' '));
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [currentBoxValue, setCurrentBoxValue] = useState('');
  const [highlightedLetters, setHighlightedLetters] = useState(Array(30).fill(' '));
  const [letterCount, setLetterCount] = useState(0);
  const [prevGameState, setPrevGameState] = useState({});
  const [gameState, setGameState] = useState({
    letterGrid: Array(30).fill(''),
    letterCount: 0,
    isValidWord: false,
    correctWord: 'abbot'
  });

  function handleEnterClick(letterGrid, prevGameState, setHighlightedLetters, setGameState, setCurrentBoxValue) {
    let isValidWord = false;
    const enteredLetters = letterGrid.slice(0, 5);
    const highlightedLetters = Array(5).fill('black');
  
    // Check if the user has entered five letters
    if (enteredLetters.length === 5) {
      // Check for duplicate letters
      if (new Set(enteredLetters).size !== enteredLetters.length) {
        console.log("Duplicate letters detected!");
        return;
      }
  
      // Check for invalid input
      if (!/^[a-zA-Z]+$/.test(enteredLetters.join(''))) {
        console.log("Invalid input detected!");
        return;
      }
  
      // check each entered letter against the correct word
      for (let i = 0; i < enteredLetters.length; i++) {
        const enteredLetter = enteredLetters[i];
        if (prevGameState.correctWord.includes(enteredLetter)) {
          if (prevGameState.correctWord[i] === enteredLetter) {
            // correct letter in correct place
            highlightedLetters[i] = 'green';
          } else {
            // correct letter in wrong place
            highlightedLetters[prevGameState.correctWord.indexOf(enteredLetter)] = 'yellow';
          }
        } else {
          // letter not in correct word
          highlightedLetters[i] = 'black';
        }
      }
  
      // check if all entered letters are in the correct word
      if (enteredLetters.every(letter => prevGameState.correctWord.includes(letter))) {
        isValidWord = true;
      }
  
      setHighlightedLetters(highlightedLetters);
  
      setGameState(prevState => ({
        ...prevState,
        letterGrid: Array(30).fill(' '),
        letterCount: 0,
        isValidWord,
      }));
      setCurrentBoxValue('');
    }
  }
  
  function handleKeyClick(event) {
    const clickedLetter = event.key.toUpperCase();
    const emptyBoxIndex = letterGrid.findIndex((value) => value === '');
    
    if (/^[A-Z]$/.test(clickedLetter) && emptyBoxIndex !== -1 && letterCount < 5) {
      const newLetterGrid = [...letterGrid];
      newLetterGrid[emptyBoxIndex] = clickedLetter;
      setLetterGrid(newLetterGrid);
      setLetterCount(letterCount + 1);
    }
  }
  
  function handleBackspaceClick(letterGrid, currentBoxIndex, setLetterGrid, setCurrentBoxIndex) {
    if (currentBoxIndex > 0) {
      const newLetterGrid = [...letterGrid];
      newLetterGrid[currentBoxIndex - 1] = '';
      setLetterGrid(newLetterGrid);
      setCurrentBoxIndex(currentBoxIndex - 1);
    }
  }
  

  function handleKeyDown(event) {
    let clickedLetter = '';
    const key = event.key.toUpperCase();
    if (event.key === 'Enter') {
      handleEnterClick(letterGrid, prevGameState, setHighlightedLetters, setGameState, setCurrentBoxValue);
    } else if (event.key === 'Backspace') {
      handleBackspaceClick(letterGrid, currentBoxIndex, setLetterGrid, setCurrentBoxIndex);
    } else {
      handleKeyClick(event);
    }
  }


  useEffect(() => {
    
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [letterGrid, prevGameState, setHighlightedLetters, setGameState, setCurrentBoxIndex, setLetterGrid, letterCount, setLetterCount, currentBoxIndex]);  

  return (
        <div>
      <InputModal letterGrid={letterGrid} />

      {[...Array(6)].map((_, row) => (
        <div className={styles.lettergrid} key={row}>
          {[...Array(5)].map((_, col) => {
            const index = row * 5 + col;
            const highlightColor = highlightedLetters[index];
            return (
              <Letter
                boxValue={letterGrid[index]}
                key={index}
                highlightColor={highlightColor}
                highlightedLetters={highlightedLetters}
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
            style={{ filter: "brightness(0) grayscale(100%) !important" }} 
            alt="Backspace" 
          />
        </Backspace>
      </div>
    </div>
    
  );
}

export default LetterGrid;