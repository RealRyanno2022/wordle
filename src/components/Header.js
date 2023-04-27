import React, { useState, useContext } from 'react';
import HeaderModal from './HeaderModal';
import styles from './Header.module.css';
import { HeaderModalContext } from './Card';

function Header() {
  let [isStackClicked, setIsStackClicked] = useState(false);
  let [isFeaturesClicked, setIsFeaturesClicked] = useState(false);
  let [isContactClicked, setIsContactClicked] = useState(false);

  const { isModalShown, setIsModalShown } = useContext(HeaderModalContext);

  const handleClick = () => {
    setIsModalShown(true);
  };

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
      <div>
      <button onClick={handleClick}>openModal</button>
      {isModalShown && <HeaderModal />}
      </div>
        
        <div className={styles.header__links}>
          <div onClick={featuresClickHandler}>Features</div>
        </div>
        <div className={styles.header__links}>
          <div onClick={stackClickHandler}>Stack</div>
        </div>
        <div className={styles.header__links}>
          <div onClick={contactClickHandler}>Contact</div>
        </div>
        <button onClick={handleClick}>Click me</button>
        <HeaderModal  stackClicked={isStackClicked} contactClicked={isContactClicked} featuresClicked={isFeaturesClicked} />
    </header>
  );
}

export default Header;