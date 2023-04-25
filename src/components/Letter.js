import styles from './Letter.module.css';
function Letter(props) {
  return (
    <div>
      <div className={styles.letter} style={{backgroundColor: props.color}}>{props.boxValue}</div>
    </div>
  );
}
export default Letter;