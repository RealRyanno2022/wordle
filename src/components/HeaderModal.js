import React, { useState, useEffect, useContext } from 'react';
import styles from './HeaderModal.module.css';
import LetterGrid from './LetterGrid';
import { HeaderModalContext } from './Card';

const HeaderModal = (props) => {
  
  const { isModalShown } = useContext(HeaderModalContext);
  
  
  
  
  
    const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.stackClicked || props.contactClicked || props.featureClicked) {
        console.log("pop");
      openHeaderModal();
    }
  }, [props.stackClicked, props.contactClicked, props.featureClicked]);

  const openHeaderModal = () => {
    setIsOpen(true);
  };

  const closeHeaderModal = () => {
    setIsOpen(false);
  };

  const headerModalClassName = `${styles.header_modal} ${isOpen ? styles.header_modal_closed : styles.header_modal_open}`;

  return (
    <div>
      <button onClick={openHeaderModal}>Open HeaderModal</button>
      <div className={headerModalClassName}>
        <div>Hello there</div>
        <button onClick={closeHeaderModal}>Close HeaderModal</button>
        <LetterGrid isModalShown={isModalShown} />
      </div>
    </div>
  );
};

export default HeaderModal;