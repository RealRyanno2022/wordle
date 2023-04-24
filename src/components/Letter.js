import styles from './Letter.module.css';
function Letter(props) {
  const { boxValue, highlightColor,highlightedColors, highlightedLetters } = props;
  const classes = [styles.letter];
  if (highlightColor === 'green') {
    classes.push(styles.green);
  } else if (highlightColor === 'yellow') {
    classes.push(styles.yellow);
  } else if (highlightColor === 'black'){
    classes.push(styles.black);
  } else {
    classes.push(styles.letter);
  }
  
  return <div className={classes.join(' ')}>{boxValue}</div>;
}
export default Letter;