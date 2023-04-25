import React, { useState, useEffect, useRef } from 'react';
import styles from './LetterGrid.module.css';
import Letter from './Letter';
import Key from './Key';
import Backspace from './Backspace';
import Enter from './Enter';

function LetterGrid() {
  const [letterGrid, setLetterGrid] = useState(Array(6 * 5).fill(''));
  const [colors, setColors] = useState(Array(6 * 5).fill('gray'));
  const [winning, setWinning] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [message, setMessage] = useState('');
  const [enterCount, setEnterCount] = useState(1);
  const [showInputModalMessage, setShowInputModalMessage] = useState(false);

  const inputModalRef = React.createRef();
  const enterCountRef = useRef(enterCount);

  function findLastIndex(array, predicate) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i], i, array)) {
        return i;
      }
    }
    return -1;
  }

  useEffect(() => {
    const backspaceHandler = (e) => {
      if (e.key === 'Backspace') handleBackspaceClick();
    };

    const enterHandler = (e) => {
      if (e.key === 'Enter') handleEnterClick();
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', backspaceHandler);
    window.addEventListener('keydown', enterHandler);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keydown', backspaceHandler);
      window.removeEventListener('keydown', enterHandler);
    };
  }, [letterGrid, winning]);

  useEffect(() => {
    enterCountRef.current = enterCount;
  }, [enterCount]);

  function handleKeyClick(clickedLetter) {
    const newLetterGrid = [...letterGrid];
    const emptyIndex = newLetterGrid.indexOf('');
    if (emptyIndex !== -1) {
      newLetterGrid[emptyIndex] = clickedLetter.toUpperCase();
      setLetterGrid(newLetterGrid);
    }
  }

  function handleBackspaceClick() {
    const currentLetterCount = letterGrid.reduce((count, letter) => count + (letter !== '' ? 1 : 0), 0);
    if (currentLetterCount % 5 === 0 && currentLetterCount > 0) return;
  
    const newLetterGrid = [...letterGrid];
    const lastLetterIndex = findLastIndex(newLetterGrid, (char) => char !== '');
  
    if (lastLetterIndex !== -1) {
      newLetterGrid[lastLetterIndex] = '';
      setLetterGrid(newLetterGrid);
    }
  }


  function handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === 'Backspace') {
      return;
    }
    const clickedLetter = e.key;
    const currentLetterCount = letterGrid.reduce((count, letter) => count + (letter !== '' ? 1 : 0), 0);
  
    if (currentLetterCount % 5 === 0 && currentLetterCount > 0) {
      handleEnterClick();
    } else {
      setShowInputModalMessage(true);
    }
  
    if (
      letterGrid.indexOf('') === -1 || winning ||
      (typeof clickedLetter !== 'string') ||
      clickedLetter === '' ||
      !clickedLetter.match(/^[A-Za-z]$/)
    ) {
      return;
    }
  
    handleKeyClick(clickedLetter);
  }

  function handleEnterClick() {
    const currentLetterCount = letterGrid.reduce(
      (count, letter) => count + (letter !== "" ? 1 : 0),
      0
    );
  
    if (currentLetterCount % 5 !== 0 || currentLetterCount === 0) {
      setShowInputModalMessage(true);
      return;
    }
  
    setShowInputModalMessage(false);
  
    const lastRowStartIndex = Math.floor(letterGrid.length / 5) * 5;
    const lastRowNotEmpty = letterGrid
      .slice(lastRowStartIndex, lastRowStartIndex + 5)
      .every((char) => char !== "");
  
    if (lastRowNotEmpty) {
      let newEnterCount = enterCount + 1;
      setEnterCount(newEnterCount);
  
      const row = Math.floor(currentLetterCount / 5) - 1;
      const startIndex = row * 5;
      const currentRow = letterGrid.slice(startIndex, startIndex + 5);
  
      decideColors(row, currentRow);
    } else {
      setMessage("Please enter all 5 letters before submitting.");
      setDisabledInput(true);
    }
  }
  
  const correctWord = 'ABOTT';
  
  function decideColors(row, inputRow) {
    const newColors = [...colors];
  
    for (let i = 0; i < inputRow.length; i++) {
      const letter = inputRow[i];
      if (correctWord[i] === letter) {
        newColors[row * 5 + i] = 'green';
      } else if (correctWord.includes(letter)) {
        newColors[row * 5 + i] = 'yellow';
      } else {
        newColors[row * 5 + i] = 'gray';
      }
    }
  
    setColors(newColors);
  
    const lastFiveColors = newColors.slice(row * 5, row * 5 + 5);
    if (lastFiveColors.every(color => color === 'green')) {
      setWinning(true);
      const message = `You win! The word was: ${correctWord}. You took ${row + 1} guesses.`;
      setMessage(message); // Update the message state
      setDisabledInput(true);
    } else {
      setDisabledInput(false);
    }
  }

  return (
    <div>
      {/* <InputModal ref={inputModalRef} letterGrid={letterGrid} showInputModalMessage={showInputModalMessage} /> */}
      {[...Array(6)].map((_, row) => (
      <div className={styles.lettergrid} key={row}>
        {[...Array(5)].map((_, col) => {
          const index = row * 5 + col;
          return (
            <Letter
              boxValue={letterGrid[index]}
              key={index}
              color={colors[index]}
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
        <Enter onClick={() => handleEnterClick()} showInputModalMessage={showInputModalMessage} />
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