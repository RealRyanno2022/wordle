import React from 'react';
import styles from './Enter.module.css';

const Enter = (props) => {
  return (
    <div className={styles.enter} onClick={props.onClick}>
      {props.showInputModalMessage ? (
        <div className={`${styles.enterText} ${styles.shake}`}>Enter more letters!</div>
      ) : (
        <div className={styles.enterText}>Add more letters!</div>
      )}
    </div>
  );
};

export default Enter;