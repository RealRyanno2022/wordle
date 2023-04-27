import React, { useState, useEffect, useContext } from 'react';
import styles from './HeaderModal.module.css';
import LetterGrid from './LetterGrid';
import { HeaderModalContext } from './Card';

const HeaderModal = (props) => {
  
  const { isModalShown } = useContext(HeaderModalContext);
  
  
  
  
  
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      if (props.stackClicked || props.contactClicked || props.featuresClicked) {
        console.log("pop");
        openHeaderModal();
      }
    }, [props.stackClicked, props.contactClicked, props.featuresClicked]);

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
>
      </div>
    </div>
  );
};

export default HeaderModal;