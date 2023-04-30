import React from 'react';
import styles from './Header.module.css';

function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h1 className={styles.h1}>Wurdle</h1>
      </div>
      <div className={styles.header__links}>
        <div onClick={() => props.setClickedButton('feature')}>Features</div>
      </div>
      <div className={styles.header__links}>
        <div onClick={() => props.setClickedButton('stack')}>Stack</div>
      </div>
      <div className={styles.header__links}>
        <div onClick={() => props.setClickedButton('contact')}>Contact</div>
      </div>
    </header>
  );
}

export default Header;