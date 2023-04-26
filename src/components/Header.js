import React, { useState, useEffect} from 'react';

import styles from './Header.module.css';

function Header() {
  let [isStackClicked, setIsStackClicked] = useState(false);
  let [isFeaturesClicked, setIsFeaturesClicked] = useState(false);

  useEffect(() => {
    setIsStackClicked(true);
    if (isStackClicked === true) setIsStackClicked(false);
  }, [isStackClicked]);

  useEffect(() => {
    setIsFeaturesClicked(true);
    if (isFeaturesClicked === true) setIsFeaturesClicked(false);
  }, [isFeaturesClicked]);


  function stackClickHandler() {

  }

  function featuresClickHandler() {

  }

  function contactClickHandler() {

  }

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h1 className={styles.h1}>Wurdle</h1>
      </div>
      <div className={styles.header__links}>
        <div onClick={featuresClickHandler}>Features</div>
        <div onClick={stackClickHandler}>Stack</div>
        <div onClick={contactClickHandler}>Contact</div>

      </div>
    </header>
  );
}

export default Header;