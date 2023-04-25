import styles from './Letter.module.css';

function Letter(props) {
  let colorClass = styles.letter; // default color class

  const { boxValue, color } = props;
  if (color === 'green') {
    colorClass = styles.green;
    console.log("buzz");
  } else if (color === 'yellow') {
    colorClass = styles.yellow;
    console.log("buzz");
  } else if (color === 'black') {
    colorClass = styles.black;
    console.log("buzz");
  } else if (color === 'gray') {
    colorClass = styles.gray;
  }

  return (
    <div>
      <div className={styles.letter} style={{backgroundColor: props.color}}>{props.boxValue}</div>
    </div>
  );
}
export default Letter;