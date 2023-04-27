import React, { useState } from 'react';
import styles from './Card.module.css';
import Header from './Header';
import LetterGrid from './LetterGrid';
import Space from './Space';
import ErrorBoundary from './ErrorBoundary';


export const HeaderModalContext = React.createContext();

function Card() {
  const [value, setValue] = useState(null);
  
  const { isModalShown, setIsModalShown } = useState(false);
  const handleButtonClick = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.card}>
      <ErrorBoundary>
        <HeaderModalContext.Provider value={{ isModalShown, setIsModalShown }}>
          <Header onButtonClick={handleButtonClick} />
          <Space />
          <LetterGrid />
        </HeaderModalContext.Provider>
      </ErrorBoundary>
    </div>
  )
}

export default Card;