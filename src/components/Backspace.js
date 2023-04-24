import React from 'react';
import styles from './Backspace.module.css';
import backspaceImage from './backspaceImage.png';

function Backspace(props) {
  const { children } = props;
  return (
    <div>
      <div className={styles.backspace} onClick={props.onClick}>
        <img data-value={children} className={styles.image} src={backspaceImage}></img>{children}
      </div>
    </div>
  );
}

export default Backspace;