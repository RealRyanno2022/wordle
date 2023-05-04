import React from 'react';
import styles from './Reminder.module.css';

function Reminder({ invalidInputSize, invalidWord, ...props }) {
  const inputLettersReminder = 'Input 5 letters before hitting enter.';
  const invalidWordReminder = 'That word is not valid.';

  if (!props.invalidInputSize && !props.invalidWord) {
    return null; // Return nothing if both conditions are false
  }
  if (props.invalidWord) {
    console.log("Invalid word");
  }

  if (props.invalidInputSize) {
    console.log("Invalid input size");
  }

  return (
    <div className={styles.reminder}>
      {props.invalidInputSize && <p>{inputLettersReminder}</p>}
      {props.invalidWord && <p>{invalidWordReminder}</p>}
    </div>
  );
}

export default Reminder;