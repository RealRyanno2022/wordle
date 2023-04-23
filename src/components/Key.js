import React from 'react'
import styles from './Key.module.css';
function Key(props) {
  const {keyValue, onClick } = props;
  return (
    <div>
        <div className={styles.key} onClick={onClick} data-value={keyValue} style={{ cursor: 'pointer' }}>{keyValue}</div>
    </div>
  )
}

export default Key
