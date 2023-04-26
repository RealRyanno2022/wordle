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
  const [colors, setColors] = useState(Array(6).fill("gray"));
  let [newColors, setNewColors] = useState([]);
  let [enterCount, setEnterCount] = useState(0);

  const [winState, setWinState] = useState({ win: false, guesses: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [backspacePressed, setBackspacePressed] = useState(false);
  let [rowTest, setRowTest] = useState(1);
  console.log(winState.win);


  function handleKeyClick(clickedLetter) {
    if (!winState.win) {
      const currentRowIndex = Math.floor(input.length / 5);
      const currentRowLetters = input.slice(currentRowIndex * 5, (currentRowIndex + 1) * 5);
  
      if (currentRowLetters.length === 5 && currentRowIndex === enterCount) {
        return;
      }
  
      if (clickedLetter === "Enter") {
        if (currentRowLetters.length > 0) {
          handleEnterClick();
        }
      } else if (typeof clickedLetter === "string" && clickedLetter !== "") {
        setInput([...input, clickedLetter.toUpperCase()]);
  
        const emptyIndex = letterGrid.indexOf('');
        if (emptyIndex !== -1) {
          const newLetterGrid = [...letterGrid];
          newLetterGrid[emptyIndex] = clickedLetter.toUpperCase();
          setLetterGrid(newLetterGrid);
        }
      }
    }
  }


  














  

  function handleBackspaceClick() {
    if (backspacePressed) {
      return;
    }
  
    const newLetterGrid = [...letterGrid];
    setInput(input.slice(0, -1));
    console.log(input);
    const lastLetterIndex = newLetterGrid.findLastIndex(char => char !== '');
    if (lastLetterIndex !== -1) {
      const inputIndex = input.length - 1;
      if (inputIndex % 5 === 4 && input.length >= 5) {
        // check if previous row is completed before allowing backspace
        const prevRowCompleted = letterGrid.slice(lastLetterIndex - 4, lastLetterIndex).every(char => char !== '');
        if (!prevRowCompleted) {
          return;
        }
      }
      newLetterGrid[lastLetterIndex] = '';
      setLetterGrid(newLetterGrid);
    }
    setBackspacePressed(true);
  }
  
  function handleBackspaceRelease() {
    setBackspacePressed(false);
  }
  
  function handleKeyPress(e) {
    const clickedLetter = e.key.toUpperCase();
    if (clickedLetter === "ENTER") {
      e.preventDefault();
      handleEnterClick();
    } else if (clickedLetter === "BACKSPACE") {
      e.preventDefault();
      handleBackspaceClick();
    } else {
      if (winState.win) {
        return;
      }
  
      e.preventDefault();
  
      if (typeof clickedLetter === "string" && clickedLetter !== "") {
        const currentRowIndex = Math.floor((input.length - 1) / 5);
        // slice (5, 10)???
        const currentRowLetters = input.slice(
          currentRowIndex * 5,
          (currentRowIndex + 1) * 5
        );
  
        console.log(currentRowLetters.length);
        console.log(enterCount);
        console.log(rowTest);
        console.log(clickedLetter);
        if (
          currentRowLetters.length === 5 &&
          enterCount !== rowTest &&
          clickedLetter !== "ENTER"
        ) {
          // console.log("boom");
          return;
        }
  
        input.push(clickedLetter.toUpperCase());
        console.log(input);
        const emptyIndex = letterGrid.indexOf("");
        if (emptyIndex !== -1) {
          const newLetterGrid = [...letterGrid];
          newLetterGrid[emptyIndex] = clickedLetter;
          setLetterGrid(newLetterGrid);
        }
      }
    }
  }
  
  function toggleModal() {
    setIsModalOpen(true);
    if(isModalOpen) {
      setIsModalOpen(false);
    }
  }
  
  useEffect(() => {
    console.log(isModalOpen); // will log true
  }, [isModalOpen]);

  let correctWord = "ABOTT";


  function handleEnterClick() {
    const currentRowIndex = Math.floor((input.length - 1) / 5);
    const currentRowLetters = input.slice(currentRowIndex * 5, (currentRowIndex + 1) * 5);
  
    if (input.length % 5 !== 0 || input.length === 0) {
      return;
    }
  
    if (letterGrid.every(char => char !== '')) {
      return;
    }
  
    const userWon = input.every((letter, index) => letter === correctWord[index % 5]);
    if (userWon) {
      setWinState((prevState) => ({ ...prevState, win: true }));
      setIsModalOpen(true);
    }
  
    let funcCount = 1;
    if (enterCount === 0) {
      setEnterCount(enterCount + 1);
    }
  
    if(!(currentRowLetters.includes('')) && enterCount === (input.length - 1) / 5) {
      setEnterCount(enterCount + 1);
    }
  
    setWinState((prevState) => ({ ...prevState, guesses: prevState.guesses + 5 }));
  
    decideColors(input, correctWord);
  }
  

 
   
  


  function decideColors(input, correctWord) {
    let newColors = [];
    let correctCount = 0;
  
    // create a copy of the correct word to track which letters have already been matched
    let remainingLetters = correctWord.split('');
  
    for (let i = 0; i < input.length; i++) {
      let letter = input[i];
      let correctIndex = i % correctWord.length;
      let correctLetter = correctWord[correctIndex];
  
      if (letter === correctLetter) {
        // mark the letter as matched
        remainingLetters[correctIndex] = null;
        newColors[i] = 'green';
        correctCount++;
      } else if (remainingLetters.includes(letter)) {
        // mark the letter as matched
        let index = remainingLetters.indexOf(letter);
        remainingLetters[index] = null;
        newColors[i] = 'yellow';
      } else {
        newColors[i] = '#444444';
      }
    }
  
    // Check for win condition
    if (correctCount === correctWord.length) {
      setWinState({ win: true, guesses: input.length });
      toggleModal(); // Show the modal
    }
  
    setColors(newColors);
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
  }, [letterGrid, enterCount]);

  const guessCount = Math.floor(winState.guesses / 5);


  return (
    <div>
       <InputModal letterGrid={letterGrid} winState={winState} guessCount={guessCount} toggleModal={toggleModal} isOpen={isModalOpen} />


      {[...Array(6)].map((_, row) => (
        <div className={styles.lettergrid}  key={row}>
          {[...Array(5)].map((_, col) => {
            const index = row * 5 + col;
            return (
              <Letter
                boxValue={letterGrid[index]}
                colors={colors[index]}
                key={index}
                style= {{ backgroundColor: colors[index] }}
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
        <Enter onClick={() => handleEnterClick()}>ENTER</Enter>
        <Key onClick={() => handleKeyClick('Z')}>Z</Key>
        <Key onClick={() => handleKeyClick('X')}>X</Key>
        <Key onClick={() => handleKeyClick('C')}>C</Key>
        <Key onClick={() => handleKeyClick('V')}>V</Key>
        <Key onClick={() => handleKeyClick('B')}>B</Key>
        <Key onClick={() => handleKeyClick('N')}>N</Key>
        <Key onClick={() => handleKeyClick('M')}>M</Key>
        <Backspace onClick={handleBackspaceClick} />
      </div>
      <div className={styles.space}></div>
    </div>

    
  );

}

export default LetterGrid;