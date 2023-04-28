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
    const currentRowIndex = Math.floor(inputIndex / 5);
  
    const newLetterGrid = [...letterGrid];
    const lastLetterIndex = findLastIndex(newLetterGrid, (char) => char !== "");
  
    if (lastLetterIndex !== -1) {
      const prevRowIndex = Math.floor((lastLetterIndex - 1) / 5);
  
      // Check if current row index is less than the previous row index
      if (currentRowIndex < prevRowIndex) {
        return;
      }
  
      // Check if the current letter is the first letter of a row (except for the first row)
      if (currentRowIndex > 0 && inputIndex % 5 === 0) {
        const prevRowCompleted = newLetterGrid
          .slice(currentRowIndex * 5 - 5, currentRowIndex * 5)
          .every((char) => char !== "");
        if (!prevRowCompleted) {
          return;
        }
      } 

      console.log(inputIndex + " inputIndex");
      console.log(lastLetterIndex + " lastLetterIndex");
  
      // Prevent deletion of values in previous rows
      if (inputIndex !== lastLetterIndex) {
        return;
      }
  
      setInput(input.slice(0, -1));
      newLetterGrid[lastLetterIndex] = "";
      setLetterGrid(newLetterGrid);
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
  
    
    if(clickedLetter === "ENTER") { return; }

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


        console.log(currentRow.length + " currentRow.length");
        console.log(enterCount + " enterCount");
        console.log(rowTest + " rowTest");
       



    
        if ((input.length % 5 === 0 // true
           && input.length != 0 // true
           && enterCount !== rowTest) // true
           || (currentRow.length === 5 
            && input.length % 5 !== 0)) {
          console.log("fart");
          console.log(input.length + " input.length");
          return;
        }
    
        // Update this line to use setInput instead of directly modifying the input state
        setInput([...input, clickedLetter.toUpperCase()]);
    
        const emptyIndex = letterGrid.indexOf("");
        if (emptyIndex !== -1) {
          const newLetterGrid = [...letterGrid];
          newLetterGrid[emptyIndex] = clickedLetter;
          setLetterGrid(newLetterGrid);
          
        }
        console.log(input.length + " input.length");
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
      toggleEndModal(); // Show the EndModal
    }

    // The keyboard looks at the newColors and applies the appropriate styles
    // [black,black,black,black,black]
    // Look at the last five elements of Input. Look at newColors. Match the element to the color.
    const currentRowIndex = Math.floor((input.length - 1) / 5); // 1
    let keysAffected = input.slice(currentRowIndex * 5, (currentRowIndex + 1) * 5);
    console.log(keysAffected);

    



  
    setColors(newColors);
    console.log(newColors);
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


  return (
    <div>
      {[...Array(6)].map((_, row) => (
        <div className={styles.lettergrid}  key={row}>
          {[...Array(5)].map((_, col) => {
            const index = row * 5 + col;
            return (
              <Letter
                boxValue={letterGrid[index]}
                colors={colors[index]}
                key={index}
                index={index}
                // style= {{ backgroundColor: colors[index] }}
                // className={styles.colors}
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
        <Enter onClick={() => {}}>ENTER</Enter>
        {/* When a key is found to be in the word in the correct place, turn green. If 
        in the word but the wrong place, turn yellow. Else, turn black.  */}
        <Key className={keyStyles.green} onClick={() => handleKeyClick('Z')}>Z</Key>
        <Key onClick={() => handleKeyClick('X')}>X</Key>
        <Key onClick={() => handleKeyClick('C')}>C</Key>
        <Key onClick={() => handleKeyClick('V')}>V</Key>
        <Key onClick={() => handleKeyClick('B')}>B</Key>
        <Key onClick={() => handleKeyClick('N')}>N</Key>
        <Key onClick={() => handleKeyClick('M')}>M</Key>
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