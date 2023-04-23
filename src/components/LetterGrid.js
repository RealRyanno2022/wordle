import React from 'react'
import Letter from './Letter'
import styles from './LetterGrid.module.css';
import { useState, useEffect } from 'react';
function LetterGrid(props) {
   const [letterGrid, setLetterGrid] = useState(Array(30).fill(''));
   const { onLetterClick } = props;
   useEffect(() => {
      const handleKeyDown = (e) => {
        const pressedKey = e.key.toUpperCase();
        const emptyBoxIndex = letterGrid.findIndex((value) => value === '');
        if (emptyBoxIndex !== -1) {
          const newLetterGrid = [...letterGrid];
          newLetterGrid[emptyBoxIndex] = pressedKey;
          setLetterGrid(newLetterGrid);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [letterGrid]);

   function keyClickHandler(e) {
      const clickedLetter = e.key.toUpperCase();
      const emptyBoxIndex = letterGrid.findIndex((value) => value === '');
      if (emptyBoxIndex !== -1) {
        const newLetterGrid = [...letterGrid];
        newLetterGrid[emptyBoxIndex] = clickedLetter;
        setLetterGrid(newLetterGrid);
      }
    }

   function handleKeyDown(e) {
      const keyPressed = e.key.toUpperCase();
      const emptyBoxIndex = letterGrid.findIndex((value) => value === '');
      if (emptyBoxIndex !== -1) {
        const newLetterGrid = [...letterGrid];
        newLetterGrid[emptyBoxIndex] = keyPressed;
        setLetterGrid(newLetterGrid);
      }
   }

return (
   <div>
     <div className={styles.lettergrid}>
       {letterGrid.slice(0, 5).map((boxValue, index) => (
         <Letter boxValue={boxValue} key={index} />
       ))}
     </div>
     <div className={styles.lettergrid}>
       {letterGrid.slice(5, 10).map((boxValue, index) => (
         <Letter boxValue={boxValue} key={index} />
       ))}
     </div>
     <div className={styles.lettergrid}>
       {letterGrid.slice(10, 15).map((boxValue, index) => (
         <Letter boxValue={boxValue} key={index} />
       ))}
     </div>
     <div className={styles.lettergrid}>
       {letterGrid.slice(15, 20).map((boxValue, index) => (
         <Letter boxValue={boxValue} key={index} />
       ))}
     </div>
     <div className={styles.lettergrid}>
       {letterGrid.slice(20, 25).map((boxValue, index) => (
         <Letter boxValue={boxValue} key={index} />
       ))}
     </div>
     <div className={styles.lettergrid}>
       {letterGrid.slice(25).map((boxValue, index) => (
         <Letter boxValue={boxValue} key={index} />
       ))}
     </div>
   </div>
 );
}



export default LetterGrid
