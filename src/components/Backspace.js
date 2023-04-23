import React from 'react'
import styles from './Backspace.module.css';
function Backspace(props) {
  const {image} = props;
  return (
    <div>
        <div className={styles.backspace}><img src={props.image} width="37" height="40" style={{filter: "brightness(0), grayscale(100%) !important"}} alt="Backspace" /></div>
    </div>
  )
}

export default Backspace;