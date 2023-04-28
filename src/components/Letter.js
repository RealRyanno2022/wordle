import styles from './Letter.module.css';
import React, { useEffect } from 'react';
function Letter({ boxValue, colors, letterGridColors, ...props }) {
  
  useEffect(() => {
    console.log(colors)
  },[]);
  

  return (

   
    <div>
      <div className={styles.letter}
      {...props} 
      style={{backgroundColor: colors}}>{boxValue}</div>
    </div>
  );
}
export default Letter;

