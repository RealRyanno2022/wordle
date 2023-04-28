import React, { useState } from 'react';
import styles from './EndModal.module.css';

const EndModal = ({ isOpen, setIsOpen, toggleEndModal }) => {
 
    const endLossMessage = "Unlucky, you couldn't solve the Wurdle! You got {x} letters correct and {y} close letters. The correct word was {correctWord}";
    const endWinMessage = "Congrats, you got the Wordle! It took you {x} guesses. Here's a cookie: 🍪";    


  const closeEndModal = () => {
    toggleEndModal();
    console.log("closed");
  };




  const ModalClassName = isOpen ? styles.end_modal_open : styles.end_modal_closed;

  return (
    <div>
      <div className={`${styles.end_modal} ${ModalClassName}`}>
      <h1>Wurdle</h1>
        <div className={styles.end_modal_inner}>
            
          {/* <div className={styles.end_modal_message}>{startMessage}</div>
          <div className={styles.end_modal_message}>{start2}</div> */}
          <div onClick={closeEndModal} className={styles.end_modal_button}>OK</div>
        </div>
      </div>
    </div>
  );
};

export default EndModal;