import React from 'react'
import styles from './Enter.module.css';
function Enter(props) {
  const {keyValue} = props;
  return (
    <div>
        <div onClick={props.onClick} className={styles.enter}>ENTER</div>
    </div>
  )
}

export default Enter;
