import React, { useState } from 'react';
import styles from './StartModal.module.css';

const Modal = (props) => {


  const startMessage = "Guess the Wurdle in 6 tries. Each guess must be a valid 5 letter word.";
  const start2 = "Examples";
    
    

  const [isOpen, setIsOpen] = useState(true);


  const closeModal = () => {
    setIsOpen(false);
    console.log('closed');
  };

  const ModalClassName = isOpen ? styles.starter_modal_open : styles.starter_modal_closed;

  return (
    <div>
      <div className={`${styles.starter_modal} ${ModalClassName}`}>
      <h1>Wurdle</h1>
        <div className={styles.starter_modal_inner}>
            
          <div className={styles.starter_modal_message}>{startMessage}</div>
          <div className={styles.starter_modal_message}>{start2}</div>
          <div onClick={closeModal} className={styles.starter_modal_button}>OK</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;