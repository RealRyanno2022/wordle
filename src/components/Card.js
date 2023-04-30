import React, { useState } from 'react';
import styles from './Card.module.css';
import Header from './Header';
import LetterGrid from './LetterGrid';
import Space from './Space';
import InfoModal from './InfoModal.js';
import StartModal from './StartModal';
import EndModal from './EndModal';
import Reminder from './Reminder';

function Card() {
  const [value, setValue] = useState(null);
  const [letterGrid, setLetterGrid] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

  let [clickedButton,setClickedButton] = useState('');
  let [isStackClicked, setIsStackClicked] = useState(false);
  let [isFeaturesClicked, setIsFeaturesClicked] = useState(false);
  let [isContactClicked, setIsContactClicked] = useState(false);

  const handleButtonClick = (newValue) => {
    setValue(newValue);
  };

  const stackClickHandler = () => {
    setIsStackClicked((prev) => !prev);
  };

  const featuresClickHandler = () => {
    setIsFeaturesClicked((prev) => !prev);
  };

  const contactClickHandler = () => {
    setIsContactClicked((prev) => !prev);
  };

  return (
    <div className={styles.card}>
      <div className={styles.overlay}>
        {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
          <Header setClickedButton={setClickedButton} />
          <Reminder />
        {/* </div> */}
          <InfoModal clickedButton={clickedButton} />
          <StartModal letterGrid={letterGrid} />
          <EndModal />
          <Space />
          <LetterGrid letterGrid={letterGrid} />
      </div>
    </div>
  );
}

export default Card;

