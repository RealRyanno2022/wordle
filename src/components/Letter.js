import React from 'react'
import styles from './Letter.module.css';
import { useState } from 'react';

function Letter(props) {
  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));
  const [letter, setLetter] = useState('');
  const { row, col, onLetterClick, index } = props;

  const handleClick = () => {
    letterClickHandler(row, col);    
  };


  function handleKeyboardInput(e) {
    const pressedLetter = e.key.toUpperCase();
    setLetter(pressedLetter);
    const index = row * letterGrid[0].length + col;
    const newLetterGrid = [...letterGrid];
    newLetterGrid[index] = pressedLetter;
    setLetterGrid(newLetterGrid);
  }



  function letterClickHandler() {
    const newLetterGrid = [...letterGrid];
    newLetterGrid[index] = '';
    setLetterGrid(newLetterGrid);
  }

  return (
    <div className={styles.letter} onClick={handleClick}>
  {/* <span className={styles.letterText}> */}
    {letterGrid && letterGrid[row] && letterGrid[row][col] ? letterGrid[row][col] : ''}
  {/* </span> */}
</div>
  );
}

export default Letter
