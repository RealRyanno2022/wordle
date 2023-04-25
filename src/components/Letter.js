import styles from './Letter.module.css';

function Letter({ boxValue, colors, ...props }) {
  return (
    <div>
      <div className={styles.letter}
      {...props} 
      style={{backgroundColor: colors}}>{boxValue}</div>
    </div>
  );
}
export default Letter;