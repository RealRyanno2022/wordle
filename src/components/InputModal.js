import React from 'react'
import { useState } from 'react';
import words from '../words/words';
function InputModal(props) {
  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));

  let inputMessage = "eee";
  const isLetterGridFilled = letterGrid.filter((value) => value !== '').length >= 5;

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

  if (isLetterGridFilled) {
    if (isValidFiveLetterWord(props.letterGrid)) {
      inputMessage = "Valid word!";
    } else {
      inputMessage = "That's not a valid word!";
    }
  }

  inputMessage = "eee";
  return (  
    <div>
      <h1>{isLetterGridFilled ? inputMessage : 'Hello world!'}</h1>
    </div>
  )
}

export default InputModal;
