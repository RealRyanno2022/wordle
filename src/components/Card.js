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

function Card({ handleModalClick, canClick, canKeyPress }) {
  const [letterGrid, setLetterGrid] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
  const [disableClick, setDisableClick] = useState(false);
  const [clickedButton, setClickedButton] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  function OKClickHandler() {
    setIsModalOpen(false);
    setDisableClick(false);
  }

  useEffect(() => {
    window.addEventListener("click", handleModalClick);

    return () => {
      window.removeEventListener("click", handleModalClick);
    };
  }, [handleModalClick]);

  return (
    <div className={styles.card}>
      <ClickWrapper disableClick={disableClick} canClick={canClick} className={disableClick ? styles.clickWrapper : ''}>
        <Header setClickedButton={setClickedButton} />
        <Reminder />
        <InfoModal clickedButton={clickedButton} />
        <EndModal />
        <Space />
        <LetterGrid letterGrid={letterGrid} />
      </ClickWrapper>
      <StartModal letterGrid={letterGrid} isOpen={isModalOpen} setIsOpen={setIsModalOpen} OKClickHandler={OKClickHandler} />
    </div>
  );
}
export default Card;