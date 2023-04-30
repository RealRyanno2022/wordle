import styles from './EndModal.module.css';

const EndModal = ({ isOpen, setIsOpen, toggleEndModal, winState }) => {
  const endLossMessage = winState ? `Unlucky, you couldn't solve the Wurdle! You got ${winState.guesses - winState.correctCount} letters correct and ${winState.correctCount} close letters. The correct word was ${winState.correctWord}` : '';
  const endWinMessage = winState ? `Congrats, you got the Wordle! It took you ${winState.guesses / 5} guesses. Here's a cookie: 🍪` : '';

  const closeEndModal = () => {
    toggleEndModal();
    console.log("closed");
  };

  const ModalClassName = isOpen ? styles.end_modal_open : styles.end_modal_closed;

  return (
    <div>
      <div className={`${styles.end_modal} ${ModalClassName}`}>
        <h1>Game Over</h1>
        <div className={styles.end_modal_inner}>
          <p>{winState && (winState.win ? endWinMessage : endLossMessage)}</p>
          <div onClick={closeEndModal} className={styles.end_modal_button}>OK</div>
        </div>
      </div>
    </div>
  );
};

export default EndModal;