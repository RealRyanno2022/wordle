import React, { useState } from 'react';
import styles from './StartModal.module.css';
import Letter from './Letter';
import letterStyles from './LetterGrid.module.css';


const StartModal = ({ ...props }) => {
  const startMessage1 = 'Guess the Wurdle in 6 tries.';
  const startMessage2 = 'Each guess must be a valid 5 letter word.';
  const startMessage3 = 'Examples:';
  const startMessage4 = "The letter A is in the word and in the correct place"
  const startMessage5 = "The letter P is in the word but not in the correct place"
  const startMessage6 = "None of these letters are in the correct word"

  let letterGrid1 = ['A', 'B', 'O', 'T', 'T']
  let colors = ['green', '#444444', '#444444', '#444444', '#444444'];
  let letterGrid2 = ['H', 'A', 'P', 'P', 'Y']
  let colors2 = ['#444444', '#444444', 'yellow', '#444444', '#444444'];
  let letterGrid3 = ['R', 'E', 'A', 'C', 'T']
  let colors3 = ['#444444', '#444444', '#444444', '#444444', '#444444'];

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    console.log('closed');
  };

  const ModalClassName = isOpen ? styles.starter_modal_open : styles.starter_modal_closed;

  return (
    <div>
      <div className={`${styles.starter_modal} ${ModalClassName}`}>
        <h1>How to Play</h1>
        <div className={styles.starter_modal_inner}>
          <div className={styles.starter_modal_message}>{startMessage1}</div>
          <div className={styles.starter_modal_message}>{startMessage2}</div>
          <div className={styles.starter_modal_message}>{startMessage3}</div>
          <div>
            {[...Array(1)].map((_, row) => (
              <div className={styles.lettergrid} key={row}>
                {[...Array(5)].map((_, col) => {
                  const index = row * 5 + col;
                  let colorClass = '';
                  if (colors && colors[index] === 'green') {
                    colorClass = letterStyles.green;
                  } else if (colors && colors[index] === 'yellow') {
                    colorClass = letterStyles.yellow;
                  } else if (colors && colors[index] === '#444444') {
                    colorClass = letterStyles.black;
                  }
                  return (
                    <Letter
                      boxValue={letterGrid1[index]}
                      colors={colors && colors[index]}
                      key={index}
                      index={index}
                      className={colorClass}
                      style={{
                        '--bg-color': 'gray',
                        '--animation-delay': '0.3s',
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className={styles.starter_modal_message}>{startMessage4}</div>
          <div>
            {[...Array(1)].map((_, row) => (
              <div className={styles.lettergrid} key={row}>
                {[...Array(5)].map((_, col) => {
                  const index = row * 5 + col;
                  let colorClass = '';
                  if (colors && colors2[index] === 'green') {
                    colorClass = letterStyles.green;
                  } else if (colors && colors2[index] === 'yellow') {
                    colorClass = letterStyles.yellow;
                  } else if (colors && colors2[index] === '#444444') {
                    colorClass = letterStyles.black;
                  }
                  return (
                    <Letter
                      boxValue={letterGrid2[index]}
                      colors={colors && colors2[index]}
                      key={index}
                      index={index}
                      className={colorClass}
                      style={{
                        '--bg-color': 'gray',
                        '--animation-delay': '0.3s',
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.starter_modal_message}>{startMessage5}</div>
          <div>
            {[...Array(1)].map((_, row) => (
              <div className={styles.lettergrid} key={row}>
                {[...Array(5)].map((_, col) => {
                  const index = row * 5 + col;
                  let colorClass = '';
                  if (colors && colors3[index] === 'green') {
                    colorClass = letterStyles.green;
                  } else if (colors && colors3[index] === 'yellow') {
                    colorClass = letterStyles.yellow;
                  } else if (colors && colors3[index] === '#444444') {
                    colorClass = letterStyles.black;
                  }
                  return (
                    <Letter
                      boxValue={letterGrid3[index]}
                      colors={colors && colors3[index]}
                      key={index}
                      index={index}
                      className={colorClass}
                      style={{
                        '--bg-color': 'gray',
                        '--animation-delay': '0.3s',
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className={styles.starter_modal_message}>{startMessage6}</div>

          <div onClick={closeModal} className={styles.starter_modal_button}>
            OK
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartModal;