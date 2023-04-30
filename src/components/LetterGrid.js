import React, { useState, useEffect } from 'react';
import styles from './LetterGrid.module.css';
import Letter from './Letter';
import Key from './Key';
import Enter from './Enter';
import Backspace from './Backspace';
import EndModal from './EndModal';
import keyStyles from './Key.module.css';

// ~~PRIORITY~~

// HIGH
// Add a EndModal when you start, run out of letters or get the correct answer
// Fix the keyboard so that the letters change color depending on their board state
// Add a global lettergridColor useState which originally makes all of the letter components have a style like 
// .gray {
//   background-color: rgba(0,0,0,0);
//   border: 2px solid gray;
// }
// but changes according to the applied color
// MEDIUM
// Fix handleEnterClick
// Fix handleKeyClick
// Fix handleBackspaceClick
// Animate the letters so that they flip when evaluated
// LOW

// Fix the overlay
// Add word validation
// Randomise the correct word
// Fix the header so it takes up the top of the screen

function LetterGrid() {

  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));
  const [input, setInput] = useState([]);
  const [colors, setColors] = useState(Array(6).fill("gray"));
  let [currentRow,setCurrentRow] = useState([]);
  // let [newColors, setNewColors] = useState([]);
  let [enterCount, setEnterCount] = useState(0);
  let[keyboardStyles, setKeyboardStyles] = useState(Array(26).fill('gray'));
  let[newKeyboardStyles, setNewKeyboardStyles] = useState(Array(26).fill('gray'));
  let [letterGridColors, setLetterGridColors] = useState(Array(30).fill(''));



  const [winState, setWinState] = useState({ win: false, guesses: 0 });
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
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
    
    if(input.length % 5 === 0 && (input.length / 5 === enterCount)) {
      console.log("Trigger");
      return;
    }
  
    const newLetterGrid = [...letterGrid];
    const lastLetterIndex = findLastIndex(newLetterGrid, (char) => char !== "");
    setInput(input.slice(0, -1));
    newLetterGrid[lastLetterIndex] = "";
    setLetterGrid(newLetterGrid);
    console.log(inputIndex);

    console.log(input.length + " input.length");
    console.log(Math.floor((input.length % 6)) + " input.length %  6")
    console.log(currentRow.length + " currentRow.length");
    console.log(enterCount + " enterCount");
    console.log(rowTest + " rowTest");
  }
  

  function findLastIndex(arr, callback) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (callback(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }

  
  
 
  
      function handleKeyPress(e) {
        const bannedLetters = [
          "#",
      ".",
      "/",
      "${\}",
      "(",
      ")",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "!",
      "?",
      "<",
      ">",
      "{",
      "}",
      "-",
      "_",
      "+",
      "=",
      "£",
      "$",
      "%",
      "^",
      "&",
      "*",
      "`",
      "¬",
      "  ",
      " ",
      "|",
      "~",
        ];
    
        let clickedLetter = e.key.toUpperCase();
        console.log(clickedLetter);
    
        if (clickedLetter === "ENTER") {
          return;
        }
    
        if (clickedLetter === "BACKSPACE") {
          e.preventDefault();
          handleBackspaceClick();
        } else if (bannedLetters.includes(clickedLetter)) {
          clickedLetter = "A";
          return;
        } else {
          if (winState.win) {
            return;
          }
    
          e.preventDefault();
    
          if (typeof clickedLetter === "string" && clickedLetter !== "") {
            // Check if the current row is full before adding a new letter
            const currentRowIndex = Math.floor(input.length / 5);
            const currentRow = input.slice(
              currentRowIndex * 5,
              (currentRowIndex + 1) * 5
            );
    
            console.log(currentRow.length);
            console.log(input.length % 5 + " input.length % 5");
            console.log(enterCount);
            console.log(currentRowIndex + " currentRowIndex");
            console.log(currentRow + " currentRow");
            console.log(currentRow.length + " currentRow.length");
            
          const currentRowLength = input.length - enterCount * 5;
          console.log(currentRowLength);
          if (currentRowLength <= 4) {
            setInput([...input, clickedLetter.toUpperCase()]);
        
            const emptyIndex = letterGrid.indexOf("");
            if (emptyIndex !== -1) {
              const newLetterGrid = [...letterGrid];
              newLetterGrid[emptyIndex] = clickedLetter;
              setLetterGrid(newLetterGrid);
              console.log(input.length + " input.length");
              console.log(Math.floor(input.length / 5) + " input.length / 5");
              console.log(currentRow.length + " currentRow.length");
              console.log(enterCount + " enterCount");
              console.log(rowTest + " rowTest");
            }
          }
        }
      }
    }
  
  
 

  useEffect(() => { 
    if(input.length % 5 === 0 && currentRow.length === 0) {
      setRowTest(enterCount + 1);
      console.log(rowTest + " rowTest (useEffect")
    }
  }, []);
  
  

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
      setIsEndModalOpen(true);
    }

    if(input.length === 30 && enterCount === 6 && !userWon) {
      setWinState((prevState) => ({ ...prevState, win: false }));
      setIsEndModalOpen(true);
    }
  
    if (!(currentRowLetters.includes('')) 
    // && enterCount === Math.floor(input.length / 5
    ) {
      setEnterCount(prevEnterCount => prevEnterCount + 1);
      console.log(enterCount + " enterCount");
      console.log(rowTest + " rowTest");
    }

  
    setWinState((prevState) => ({ ...prevState, guesses: prevState.guesses + 5 }));
  
    decideColors(input, correctWord);
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
      } else {
        if (unmatchedYellowLetters[letter] && unmatchedYellowLetters[letter] > 0) {
          // Mark the letter as found and update the unmatchedYellowLetters object
          unmatchedYellowLetters[letter]--;
          console.log(unmatchedYellowLetters)
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

  console.log(colors);
  console.log(newKeyboardStyles[10]);


  return (
    <div>
      {[...Array(6)].map((_, row) => (
        <div className={styles.lettergrid} key={row}>
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
      ))}
      <div className={styles.keyboard}>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter,index) => (
          <Key key={letter} onClick={() => handleKeyClick(letter)}
            className={keyStyles[newKeyboardStyles[index]]}>
            {letter}
          </Key>
        ))}
      </div>
      <div className={styles.keyboard}>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter,index) => (
          <Key key={letter} onClick={() => handleKeyClick(letter)}
          className={keyStyles[newKeyboardStyles[index+10]]}>
            {letter}
          </Key>
        ))}
      </div>
      <div className={styles.keyboard}>
        <Enter onClick={() => {}}>ENTER</Enter>
        {/* When a key is found to be in the word in the correct place, turn green. If 
        in the word but the wrong place, turn yellow. Else, turn black.  */}
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter, index) => (
          <Key
            key={letter}
            onClick={() => handleKeyClick(letter)}
            className={keyStyles[newKeyboardStyles[index+10]]}>
          
            {letter}
          </Key>
        ))}
        <Backspace onClick={handleBackspaceClick} />
      </div>
      <div className={styles.space}></div>
      <EndModal
        isOpen={isEndModalOpen}
        setIsOpen={setIsEndModalOpen}
        toggleEndModal={toggleEndModal}
      />
    </div>

    
  );

}

export default LetterGrid;