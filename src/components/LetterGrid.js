import React, { useState, useEffect, useCallback } from 'react';
import styles from './LetterGrid.module.css';
import Letter from './Letter';
import Key from './Key';
import Enter from './Enter';
import Backspace from './Backspace';
import EndModal from './EndModal';
import keyStyles from './Key.module.css';
import Space from './Space';
import WORDS from '../words/words.js';
import StartModal from './StartModal';

// NEW TASKS
// - Allow you to click on the Keyboard and InfoModals after hitting OK
// - Display an EndModal when you win or run out of letters
// - Allow you to hit OK
// - Fix Reminder.js so that the appropriate messages are displayed when needed
// - Add a shaking animation to the row when an inappropriate action is taken
// - Add random correctWord selection
// - Add better word validation
// - Somehow give all Letters this formatting // .gray {
//   background-color: rgba(0,0,0,0);
//   border: 2px solid gray;
// }
// - Add color functionality to computed keyboard keys









// 














function LetterGrid() {

  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));
  let [canKeyPress, setCanKeyPress] = useState(false);
  const [input, setInput] = useState([]);
  const [colors, setColors] = useState(Array(6).fill("gray"));
  let [currentRow,setCurrentRow] = useState([]);
  let [enterCount, setEnterCount] = useState(0);
  const [currentRowInvalid, setCurrentRowInvalid] = useState(false);
  const [isStartModalDisplayed, setIsStartModalDisplayed] = useState(true);
  let[keyboardStyles, setKeyboardStyles] = useState(() => {
    const initialState = {};
    for (let i = 0; i < 26; i++) {
      initialState[String.fromCharCode(65 + i)] = 'gray';
    }
    return initialState;
  });
  let [invalidWord, setInvalidWord] = useState(false);
  let [invalidInputSize, setInvalidInputSize] = useState(false);
  const [key, setKey] = useState(0);
  const [winState, setWinState] = useState({ win: false, guesses: 0 });
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);


  function validWordChecker() {
    const word = currentRow.join("");

    if (!(WORDS.includes(word))) {
      setInvalidWord(true);
      setCurrentRow([]);
      setCurrentRowInvalid(true); // Add this line to mark the current row as invalid
      console.log("invalid");
    } else {
      setInvalidWord(false);
      console.log("valid");
    }
  }

  function invalidInputSizeChecker() {
    if(currentRow.length < 4) {
      setInvalidInputSize(true);
    } else {
      setInvalidInputSize(false);
    }
  }

  useEffect(() => {
    const defaultStyles = new Array(26).fill('#444444');
    setKeyboardStyles(defaultStyles);
  }, []);


  const handleModalClose = useCallback(() => {
    // Put the code you want to run when the modal is closed here
    console.log("bing");
    setIsStartModalDisplayed(false);
  }, []);



  

  function handleKeyClick(clickedLetter) {
 
    setCurrentRowInvalid(false);
    if (!winState.win) {
      const currentRowLength = input.length - enterCount * 5;
      console.log(currentRowLength);
      if (currentRowLength <= 4) {
        setInput([...input, clickedLetter.toUpperCase()]);
    
        const emptyIndex = letterGrid.indexOf("");
        if (emptyIndex !== -1) {
          const newLetterGrid = [...letterGrid];
          newLetterGrid[emptyIndex] = clickedLetter;
          setLetterGrid(newLetterGrid);
        }
      }
    }
  }

  function findLastIndex(arr, callback) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (callback(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }
  
  function handleBackspaceClick() {
    const inputIndex = input.length - 1;
    
    if (input.length % 5 === 0 && (input.length / 5 === enterCount)) {
      return;
    }
  
    const newLetterGrid = [...letterGrid];
    const lastLetterIndex = findLastIndex(newLetterGrid, (char) => char !== "");
    setInput(input.slice(0, -1));
    newLetterGrid[lastLetterIndex] = "";
    setLetterGrid(newLetterGrid);
  }
  
  function handleKeyPress(e) {
    const bannedLetters = ["ARROWUP","ARROWDOWN","ARROWRIGHT","ARROWLEFT","SHIFT","CONTROL","ALT","DELETE","HOME","PAGEUP","PAGEDOWN","END","OS","ALTGRAPH","ESCAPE",
      "#", "[", "]", ".", "/", "${\}", "(", ")", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "?", "<", ">", "{", "}", "-", "_", "+", "=", "£", "$", "%", "^", "&", "*", "`", "¬", "  ", " ", "|", "~",
    ];
    // Check for isStartModalDisplayed here
    if (isStartModalDisplayed) {
      console.log("vine boom");
      return;
    }
    
    let clickedLetter = e.key.toUpperCase();
    console.log(clickedLetter);
  
    if (bannedLetters.includes(clickedLetter)) {
      return;
    }
  
    if (clickedLetter === "ENTER") {
      e.preventDefault();
      handleEnterClick();
    }
  
    if (clickedLetter === "BACKSPACE") {
      e.preventDefault();
      handleBackspaceClick();
    } else {
      if (winState.win) {
        return;
      }
  
      e.preventDefault();
  
      if (typeof clickedLetter === "string" && clickedLetter !== "" && clickedLetter !== "ENTER") {
        const currentRowLength = input.length - enterCount * 5;
        if (currentRowLength <= 4) {
          setInput([...input, clickedLetter.toUpperCase()]);
  
          const emptyIndex = letterGrid.indexOf("");
          if (emptyIndex !== -1) {
            const newLetterGrid = [...letterGrid];
            newLetterGrid[emptyIndex] = clickedLetter;
            setLetterGrid(newLetterGrid);
          }
        }
      }
    }
  }
  

  let correctWord = "ABOTT";

  useEffect(() => {
    if (input.length % 5 === 0 && input.length > 0 && key > 0 && invalidWord === false) {
      decideColors(input, correctWord);
    }
  }, [key]);

  function handleEnterClick() {
    validWordChecker();
    invalidInputSizeChecker();
    if (invalidWord === true) {
      return;
    }
  
    const currentRowIndex = Math.floor((input.length - 1) / 5);
    const currentRowLetters = input.slice(currentRowIndex * 5, (currentRowIndex + 1) * 5);
    const currentRowLength = input.length - enterCount * 5;
  
    console.log(currentRow);
    if (currentRowLength < 4) {
      setInvalidInputSize(true);
      return;
    }
  
    if (input.length % 5 !== 0 || input.length === 0) {
      return;
    }
  
    if (letterGrid.every(char => char !== '')) {
      return;
    }
  
    const userWon = input.every((letter, index) => letter === correctWord[index % 5]);
    if (userWon) {
      setWinState((prevState) => ({ ...prevState, win: true }));
      setIsEndModalOpen(true);
    }
  
    if (input.length === 30 && enterCount === 6 && !userWon) {
      setWinState((prevState) => ({ ...prevState, win: false }));
      setIsEndModalOpen(true);
    }
  
    if (!(currentRowLetters.includes(''))) {
      setEnterCount((prevEnterCount) => prevEnterCount + 1);
      setKey((prevKey) => prevKey + 1); // Increment the key value
    }
  
    setWinState((prevState) => ({ ...prevState, guesses: prevState.guesses + 5 }));
  }

  function decideColors(input, correctWord) {
    let newColors = [];
    let correctCount = 0;
  
    // Create a copy of the correct word to track which letters have already been matched
    let remainingLetters = correctWord.split('');
  
    // Create an object to store the frequency of unmatched yellow letters in the correct word
    const unmatchedYellowLetters = remainingLetters.reduce((acc, letter) => {
      if (!acc[letter]) {
        acc[letter] = 0;
      }
      acc[letter]++;
      return acc;
    }, {});
  
    for (let i = 0; i < input.length; i++) {
      let letter = input[i];
      let correctIndex = i % correctWord.length;
      let correctLetter = correctWord[correctIndex];
  
      if (letter === correctLetter) {
        // Mark the letter as matched
        remainingLetters[correctIndex] = null;
        newColors[i] = 'green';
        correctCount++;
  
        // Decrease the count of unmatched yellow letters if the letter is matched
        if (unmatchedYellowLetters[letter] && unmatchedYellowLetters[letter] > 0) {
          unmatchedYellowLetters[letter]--;
        }
      } else {
        if (unmatchedYellowLetters[letter] && unmatchedYellowLetters[letter] > 0) {
          // Mark the letter as found and update the unmatchedYellowLetters object
          unmatchedYellowLetters[letter]--;
          newColors[i] = 'yellow';
        } else {
          newColors[i] = '#444444';
        }
      }
    }
  
    // Check for win condition
    if (correctCount === correctWord.length) {
      setWinState({ win: true, guesses: input.length });
      toggleEndModal(); // Show the EndModal
    }
  
    // The keyboard looks at the newColors and applies the appropriate styles
    const currentRowIndex = Math.floor((input.length - 1) / 5);
    let keysAffected = input.slice(currentRowIndex * 5, (currentRowIndex + 1) * 5);
  
    let newKeyboardStylesCopy = [...keyboardStyles];
    for (let i = 0; i < keysAffected.length; i++) {
      const letter = keysAffected[i];
      const letterIndex = letter.charCodeAt(0) - 'A'.charCodeAt(0);
      newKeyboardStylesCopy[letterIndex] = newColors[currentRowIndex * 5 + i];
    }
  
    setKeyboardStyles(newKeyboardStylesCopy);
    console.log(newKeyboardStylesCopy);
    setColors(newColors);
  }

  const toggleEndModal = () => {
    setIsEndModalOpen((prevIsEndModalOpen) => !prevIsEndModalOpen);
  };

 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    function onKeyPress(e) {
      handleKeyPress(e);
    }

    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };



  }, [input, letterGrid, winState, isStartModalDisplayed]);
  const currentRowIndex = Math.floor((input.length - 1) / 5);


  return (
    <div>
      {isStartModalDisplayed &&  <StartModal isOpen={isStartModalDisplayed} setIsOpen={setIsStartModalDisplayed} handleModalClose={handleModalClose} />}
      {[...Array(6)].map((_, row) => {
        const rowValidityChecker = (invalidWord || invalidInputSize) && currentRowIndex === row ? styles.invalid-row : "";
        return (
          <div className={`${styles.lettergrid} ${rowValidityChecker}`} key={row}>
            {[...Array(5)].map((_, col) => {
              const index = row * 5 + col;
              let colorClass = '';
              if (colors[index] === 'green') {
                colorClass = styles.green;
              } else if (colors[index] === 'yellow') {
                colorClass = styles.yellow;
              } else if (colors[index] === '#444444') {
                colorClass = styles.black;
              }
              return (
                <Letter
                  boxValue={letterGrid[index]}
                  colors={colors[index]}
                  key={index}
                  index={index}
                  className={colorClass}
                  style={{
                    '--bg-color': 'gray',
                    '--animation-delay': '0.3s',
                  }}
                />
              );
            })}
          </div>
        )
      })}
      <Space />
      <div className={styles.keyboard}>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter, index) => (
          <Key
            key={letter}
            onClick={() => handleKeyClick(letter)}
            className={`${keyStyles[keyboardStyles[letter]]} ${styles.key}`}
          >
            {letter}
          </Key>
        ))}
      </div>
      <div className={styles.keyboard}>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter, index) => (
          <Key
            key={letter}
            onClick={() => handleKeyClick(letter)}
            className={`${keyStyles[keyboardStyles[letter]]} ${styles.key}`}
          >
            {letter}
          </Key>
        ))}
      </div>
      <div className={styles.keyboard}>
        <Enter onClick={handleEnterClick}>ENTER</Enter>
        {/* When a key is found to be in the word in the correct place, turn green. If 
        in the word but the wrong place, turn yellow. Else, turn black.  */}
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter, index) => (
          <Key
            key={letter}
            onClick={() => handleKeyClick(letter)}
            className={`${keyStyles[keyboardStyles[letter]]} ${styles.key}`}
          >
            {letter}
          </Key>
        ))}
        <Backspace onClick={handleBackspaceClick} />
      </div>
      <div className={styles.space}></div>
      <EndModal isOpen={isEndModalOpen} winState={winState} toggleEndModal={toggleEndModal} />
    </div>
  );

  

}

export default LetterGrid;