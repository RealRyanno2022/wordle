import React, { useState, useEffect } from 'react';
import styles from './HeaderModal.module.css';

const HeaderModal = (props) => {
  let [headerModalMessage, setHeaderModalMessage] = useState('Developed by Daniel Ryan, 2023');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.isStackClicked || props.isContactClicked || props.isFeatureClicked) {
      console.log('pop');
      openHeaderModal();
    }
    if (props.isStackClicked) {
      setHeaderModalMessage('I built this using React.');
    }
    if (props.isContactClicked) {
      setHeaderModalMessage('Contact me');
    }
    if (props.isFeatureClicked) {
      setHeaderModalMessage(
        'Features word authentication, 2000 word dictionary, physical and on-screen keyboard',
      );
    } else {
      if (isOpen) {
        setHeaderModalMessage(
          "Developed by Daniel Ryan, 2023"
        );
      }
    }


  }, [props.isStackClicked, props.isContactClicked, props.isFeatureClicked]);

  const openHeaderModal = () => {
    setIsOpen(true);
    console.log('open');
  };

  const closeHeaderModal = () => {
    setIsOpen(false);
    console.log('closed');
  };

  const headerModalClassName = isOpen ? styles.header_modal_open : styles.header_modal_closed;

  return (
    <div>
      <button onClick={openHeaderModal}>Open HeaderModal</button>
      <button onClick={closeHeaderModal}>Close HeaderModal</button>
      <div className={`${styles.header_modal} ${headerModalClassName}`}>
        <div className={styles.header_modal_message}>{headerModalMessage}</div>
      </div>
    </div>
  );
};

export default HeaderModal;