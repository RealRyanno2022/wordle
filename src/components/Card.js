import React from 'react'
import styles from './Card.module.css';
import Header from './Header';
import LetterGrid from './LetterGrid';
import Space from './Space';
import Keyboard from './Keyboard';
import InputModal from './InputModal';
import ErrorBoundary from './ErrorBoundary';
function Card() {
  return (
    <div className={styles.card}>
        <ErrorBoundary>
 
  
          <Header />
          <Space />
        <LetterGrid />


      </ErrorBoundary>
    </div>
  )
}

export default Card
