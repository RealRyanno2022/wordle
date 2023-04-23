import React from 'react'
import styles from './Card.module.css';
import Header from './Header';
import LetterGrid from './LetterGrid';
import Space from './Space';
import Keyboard from './Keyboard';
function Card() {
  return (
    <div className={styles.card}>
          <Header />
      
      <LetterGrid />

        <Space />
      <Keyboard />
    </div>
  )
}

export default Card
