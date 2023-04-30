import React from 'react';
import styles from './Letter.module.css'; 

const Letter = ({ boxValue, colors, index, className, style}) => {

  const maxIndexForDelay = 5;
  return (
    <div className={`${styles.letter} ${className}`}
      key={index}
      style={{
        animationDelay: `${(index % maxIndexForDelay) * 0.33}s`,
      }}
    >
      <div className={styles.innerLetter} style={style}>
        {boxValue}
      </div>
    </div>
  );
};

export default Letter;

