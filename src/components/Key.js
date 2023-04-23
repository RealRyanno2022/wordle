import React from 'react'
import styles from './Key.module.css';
function Key(props) {
  const {children, onClick } = props;
  return (
    <div>
        <div className={styles.key} onClick={onClick} data-value={children} style={{ cursor: 'pointer' }}>{children}</div>
    </div>
  )
}

export default Key
