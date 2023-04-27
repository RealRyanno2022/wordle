import React, { useState } from 'react';
import styles from './Card.module.css';
import Header from './Header';
import LetterGrid from './LetterGrid';
import Space from './Space';
import HeaderModal from './HeaderModal';

function Card() {
  const [value, setValue] = useState(null);
  let [isStackClicked, setIsStackClicked] = useState(false);
  let [isFeaturesClicked, setIsFeaturesClicked] = useState(false);
  let [isContactClicked, setIsContactClicked] = useState(false);

  const handleButtonClick = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.card}>
      <div className={styles.overlay}>
        <Header
          isStackClicked={isStackClicked}
          isFeaturesClicked={isFeaturesClicked}
          isContactClicked={isContactClicked}
          setIsStackClicked={setIsStackClicked}
          setIsFeaturesClicked={setIsFeaturesClicked}
          setIsContactClicked={setIsContactClicked}
        />
        <HeaderModal
          isStackClicked={isStackClicked}
          isFeatureClicked={isFeaturesClicked}
          isContactClicked={isContactClicked}
          setIsStackClicked={setIsStackClicked}
          setIsFeatureClicked={setIsFeaturesClicked}
          setIsContactClicked={setIsContactClicked}
        />
        <Space />
        <LetterGrid />
      </div>
    </div>
  );
}

export default Card;