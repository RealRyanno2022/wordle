import React from 'react'
import styles from './Key.module.css';
function Key(props) {
  const {children, onClick, className } = props;
  return (
    <div>
        <div className={`${styles.key} ${className}`} onClick={onClick} data-value={children} style={{ cursor: 'pointer' }}>{children}</div>
    </div>
  )
}

export default Key
