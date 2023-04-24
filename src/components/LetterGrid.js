import React, { useState, useEffect } from 'react';
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
  const [highlightedLetters, setHighlightedLetters] = useState(...Array(30).fill(' '));
  const [letterCount, setLetterCount] = useState(0);
  const [enteredLetters, setEnteredLetters] = useState([]);
  const [letterGridState, setLetterGridState] = useState(Array(30).fill(''));
  const [letterCountState, setLetterCountState] = useState(0);
  const [isValidWordState, setIsValidWordState] = useState(false);
  const [correctWordState, setCorrectWordState] = useState('abbot');
  const [prevGameState, setPrevGameState] = useState({});
  const [gameState, setGameState] = useState({
    letterGrid: Array(30).fill(''),
    letterCount: 0,
    isValidWord: false,
    correctWord: 'abbot'
  });

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleKeyClick(key);
      } else if (key === 'BACKSPACE') {
        handleBackspaceClick();
      } else if (key === 'ENTER') {
        handleEnterClick();
      }
    }
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleKeyClick(letter) {
    if (currentBoxIndex < 30) {
      setLetterGrid((prevState) => {
        const newLetterGrid = [...prevState];
        newLetterGrid[currentBoxIndex] = letter;
        return newLetterGrid;
      });
  
      setHighlightedLetters((prevState) => {
        const newHighlightedLetters = [...prevState];
        newHighlightedLetters[currentBoxIndex] = "black";
        return newHighlightedLetters;
      });
  
      setCurrentBoxIndex((prevState) => prevState + 1);
      setCurrentBoxValue("");
  
      // Increment letter count
      setLetterCount((prevState) => prevState + 1);
    }
  }

  function handleBackspaceClick() {
    const newLetterGrid = [...letterGrid];
    newLetterGrid[currentBoxIndex - 1] = '';
    setLetterGrid(newLetterGrid);
    setCurrentBoxIndex(currentBoxIndex - 1);
  }

  function handleEnterClick() {
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
      setCurrentBoxIndex(0);
      setCurrentBoxValue('');
    }
  }


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