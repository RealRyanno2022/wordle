import React, { forwardRef, useImperativeHandle, useState } from "react";
import words from "../words/words";
import styles from "./InputModal.module.css";

const InputModal = forwardRef((props, ref) => {
  const [shake, setShake] = useState(false);

  const isValidFiveLetterWord = (letterGrid) => {
    const firstFiveChars = letterGrid.slice(0, 5).join("");
    return words.includes(firstFiveChars);
  };

  const handleEnter = () => {
    if (props.letterGrid.filter((value) => value !== "").length % 5 === 0) {
      let inputMessage;
      if (isValidFiveLetterWord(props.letterGrid)) {
        inputMessage = "Valid word!";
      } else {
        inputMessage = "Add more letters!";
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 500);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleEnter,
  }));

  // Calculate inputMessage
  let inputMessage;
  if (props.letterGrid.filter((value) => value !== "").length % 5 === 0) {
    if (isValidFiveLetterWord(props.letterGrid)) {
      inputMessage = "Valid word!";
    } else {
      inputMessage = "Add more letters!";
    }
  }

  return (
    <div>
      <h1
        className={shake ? styles.shakeAnimation : ""}
      >
        {props.letterGrid.filter((value) => value !== "").length % 5 === 0
          ? inputMessage
          : ""}
      </h1>
    </div>
  );
});

export default InputModal;