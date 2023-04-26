import React from 'react';
import styles from './InputModal.module.css';

function InputModal({ letterGrid, winState, guessCount, toggleModal, isOpen }) {


  return (
    <div className={`${styles.modal} ${isOpen ? styles.show : styles.hide}`}>
      <h1 className={styles.title}>InputModal</h1>
      {winState.win ? (
        <p>
          You win! Guesses: {guessCount}
        </p>
      ) : (
        <p>
          Keep trying! Guesses: {guessCount}
        </p>
      )}
      <button onClick={toggleModal}>Close</button>
    </div>
  );
}

export default InputModal;