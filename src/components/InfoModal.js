import React, { useState, useEffect } from 'react';
import styles from './InfoModal.module.css';

const InfoModal = (props) => {
  let [InfoModalMessage, setInfoModalMessage] = useState("Developed by Daniel Ryan, 2023");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    switch(props.clickedButton) {
      case 'stack':
        setInfoModalMessage('I built this using React.');
        openInfoModal();
        break;
      case 'contact':
        setInfoModalMessage('Contact me');
        openInfoModal();
        break;
      case 'feature':
        setInfoModalMessage('Features word authentication, 2000 word dictionary, physical and on-screen keyboard');
        openInfoModal();
        break;
    }

  }, [props.clickedButton]);

  const openInfoModal = () => {
    setIsOpen(true);
    console.log('open');
  };

  const closeInfoModal = () => {
    setIsOpen(false);
    console.log('closed');
  };

  const InfoModalClassName = isOpen ? styles.info_modal_open : styles.info_modal_closed;
  return (
    <div>
      <div className={`${styles.info_modal} ${InfoModalClassName}`}>
        <div className={styles.info_modal_inner}>
          <div className={styles.info_modal_message}>{InfoModalMessage}</div>
          <div onClick={closeInfoModal} className={styles.info_modal_button}>OK</div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;