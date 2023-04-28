import React, { useState, useEffect } from 'react';
import styles from './InfoModal.module.css';

const InfoModal = (props) => {
  let [InfoModalMessage, setInfoModalMessage] = useState("Developed by Daniel Ryan, 2023");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.isStackClicked) {
      setInfoModalMessage('I built this using React.');
      openInfoModal();
    } else if (props.isContactClicked) {
      setInfoModalMessage('Contact me');
      openInfoModal();
    } else if (props.isFeatureClicked) {
      setInfoModalMessage(
        'Features word authentication, 2000 word dictionary, physical and on-screen keyboard',
      );
      openInfoModal();
    }
  }, [props.isStackClicked, props.isContactClicked, props.isFeatureClicked]);







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