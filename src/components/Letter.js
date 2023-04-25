import styles from './Letter.module.css';

function Letter({ boxValue, color }) {
  let colorClass = styles.letter; // default color class

  if (color === 'green') {
    colorClass = styles.green;
  } else if (color === 'yellow') {
    colorClass = styles.yellow;
  } else if (color === 'black') {
    colorClass = styles.black;
  } else if (color === 'gray') {
    colorClass = styles.gray;
  }

  return (
    <div className={`${styles.letter} ${colorClass}`}>
      {boxValue}
    </div>
  );
}

export default Letter;