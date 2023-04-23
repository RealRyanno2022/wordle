import React from 'react'
import styles from './Keyboard.module.css';
import Backspace from './Backspace';
import Key from './Key';
import Enter from './Enter';
import { useState } from 'react';
function Keyboard() {

  const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));





  function keyClickHandler(e) {
    const clickedLetter = e.target.getAttribute('data-value');
    const emptyBoxIndex = letterGrid.findIndex((value) => value === '');
    if (emptyBoxIndex !== -1) {
      const newLetterGrid = [...letterGrid];
      newLetterGrid[emptyBoxIndex] = clickedLetter;
      setLetterGrid(newLetterGrid);
      console.log(letterGrid);
    }
    console.log("test");
  }




  return (


    <div>   
      <div className={styles.keyboard}>
        <Key keyValue="Q" onClick={keyClickHandler}/>
        <Key keyValue="W" onClick={keyClickHandler}/>
        <Key keyValue="E" onClick={keyClickHandler}/>
        <Key keyValue="R" onClick={keyClickHandler}/>
        <Key keyValue="T" onClick={keyClickHandler}/>
        <Key keyValue="Y" onClick={keyClickHandler}/>
        <Key keyValue="U" onClick={keyClickHandler}/>
        <Key keyValue="I" onClick={keyClickHandler}/>
        <Key keyValue="O" onClick={keyClickHandler}/>
        <Key keyValue="P" onClick={keyClickHandler}/>
        <Backspace keyValue="Backspace" onClick={keyClickHandler}/>

      </div>
      <div className={styles.keyboard}>
        <Key keyValue="A" onClick={keyClickHandler}/>
        <Key keyValue="S" onClick={keyClickHandler}/>
        <Key keyValue="D" onClick={keyClickHandler}/>
        <Key keyValue="F" onClick={keyClickHandler}/>
        <Key keyValue="G" onClick={keyClickHandler}/>
        <Key keyValue="H" onClick={keyClickHandler}/>
        <Key keyValue="J" onClick={keyClickHandler}/>
        <Key keyValue="K" onClick={keyClickHandler}/>
        <Key keyValue="L" onClick={keyClickHandler}/>
        <Enter keyValue="Enter" onClick={keyClickHandler} />
  
      </div>
      <div className={styles.keyboard}>
        <Key keyValue="Z" onClick={keyClickHandler}/>
        <Key keyValue="X" onClick={keyClickHandler}/>
        <Key keyValue="C" onClick={keyClickHandler}/>
        <Key keyValue="V" onClick={keyClickHandler}/>
        <Key keyValue="B" onClick={keyClickHandler}/>
        <Key keyValue="N" onClick={keyClickHandler}/>
        <Key keyValue="M" onClick={keyClickHandler}/>
      </div>
    </div>
  )
}

export default Keyboard
