import React, { useState } from 'react';
import InfoModal from './InfoModal';
import styles from './Header.module.css';


function Header(props) {
  let [isStackClicked, setIsStackClicked] = useState(false);
  let [isFeaturesClicked, setIsFeaturesClicked] = useState(false);
  let [isContactClicked, setIsContactClicked] = useState(false);



  function stackClickHandler() {
    console.log("Stack clicked");
    setIsStackClicked(true);
    if (isStackClicked === true) setIsStackClicked(false);

  }

  function featuresClickHandler() {
    console.log("Features clicked");
    setIsFeaturesClicked(true);
    if (isFeaturesClicked === true) setIsFeaturesClicked(false);
  }

  function contactClickHandler() {
    console.log("Contact clicked");
    setIsContactClicked(true);
    if (isContactClicked === true) setIsContactClicked(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h1 className={styles.h1}>Wurdle</h1>
      </div>
     
        
        <div className={styles.header__links}>
          <div onClick={props.featuresClickHandler}>Features</div>
        </div>
        <div className={styles.header__links}>
          <div onClick={props.stackClickHandler}>Stack</div>
        </div>
        <div className={styles.header__links}>
          <div onClick={props.contactClickHandler}>Contact</div>
        </div>
    </header>
  );
}

export default Header;