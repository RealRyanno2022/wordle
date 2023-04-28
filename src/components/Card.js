import React, { useState } from 'react';
import styles from './Card.module.css';
import Header from './Header';
import LetterGrid from './LetterGrid';
import Space from './Space';
import InfoModal from './InfoModal';
import StartModal from './StartModal';
import EndModal from './EndModal';

function Card() {
  const [value, setValue] = useState(null);
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
        <Header
          stackClickHandler={stackClickHandler}
          featuresClickHandler={featuresClickHandler}
          contactClickHandler={contactClickHandler}
        />
        <InfoModal
          isStackClicked={isStackClicked}
          isFeatureClicked={isFeaturesClicked}
          isContactClicked={isContactClicked}
        />
        <StartModal />
        <EndModal />
        <Space />
        <LetterGrid />
      </div>
    </div>
  );
}

export default Card;