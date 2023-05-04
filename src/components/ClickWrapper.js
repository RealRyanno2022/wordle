import React, { useState } from 'react';
import styles from './ClickWrapper.module.css';

function ClickWrapper({ children, disableClick, canClick }) {
  const handleClick = (e) => {
    if (disableClick || !canClick) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className={`${styles.clickWrapper} ${!canClick ? styles.disabled : ''}`}>
      {children}
    </div>
  );
}

export default ClickWrapper;