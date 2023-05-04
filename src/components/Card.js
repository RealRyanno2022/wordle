import React, { useState, useEffect, useCallback } from 'react';
import styles from './Card.module.css';
import Header from './Header';
import LetterGrid from './LetterGrid';
import Space from './Space';
import InfoModal from './InfoModal.js';
import StartModal from './StartModal';
import EndModal from './EndModal';
import Reminder from './Reminder';
import ClickWrapper from './ClickWrapper';

function Card({ handleModalClick, canClick }) {
  const [isStartModalDisplayed, setIsStartModalDisplayed] = useState(false);
  const [value, setValue] = useState(null);
  const [letterGrid, setLetterGrid] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
  const [disableClick, setDisableClick] = useState(false);
  const [clickedButton, setClickedButton] = useState('');

  useEffect(() => {
    setDisableClick(isStartModalDisplayed);
  }, [isStartModalDisplayed]);

  useEffect(() => {
    window.addEventListener("click", handleModalClick);

    return () => {
      window.removeEventListener("click", handleModalClick);
    };
  }, [handleModalClick]);

  return (
    <div className={styles.card}>
      <ClickWrapper disableClick={disableClick} canClick={canClick}>
        <Header setClickedButton={setClickedButton} />
        <Reminder />
        <InfoModal clickedButton={clickedButton} />
        
        <EndModal />
        <Space />
        <LetterGrid letterGrid={letterGrid} />
        
      </ClickWrapper>
      <StartModal letterGrid={letterGrid} handleModalClick={handleModalClick} />
    </div>
  );
}

export default Card;