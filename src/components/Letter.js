import React from 'react';
import styles from './Letter.module.css'; 

const Letter = ({ boxValue, colors, index, className, style}) => {
  return (
    <div className={`${styles.letter} ${className}`}
      key={index}
      style={{
        animationDelay: `${index * 0.3}s`,
      }}
    >
      <div className={styles.innerLetter} style={style}>
        {boxValue}
      </div>
    </div>
  );
};

export default Letter;

