import React from 'react';
import styles from './Reminder.module.css';

function Reminder({ validInputSize, invalidWord, ...props }) {
  const inputLettersReminder = 'Input 5 letters before hitting enter.';
  const invalidWordReminder = 'That word is not valid.';

  if (!validInputSize && !invalidWord) {
    return null; // Return nothing if both conditions are false
  }


  return (
    <div className={styles.reminder}>
      {validInputSize ? inputLettersReminder : ' '}
      {invalidWord ? invalidWordReminder : ' '}
    </div>
  );
}

export default Reminder;