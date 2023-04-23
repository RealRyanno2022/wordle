import React from 'react'
import styles from './Backspace.module.css';
function Backspace(props) {
  const {keyValue} = props;
  return (
    <div>
        <div className={styles.backspace}>{keyValue}</div>
    </div>
  )
}

export default Backspace;