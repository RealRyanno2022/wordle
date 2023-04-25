import React from 'react';
import styled from 'styled-components';

const LetterWrapper = styled.div`
display:flex;
align-items: center;
justify-content: center;
height: 60px;
width: 60px;
font-family: Helvetica;
font-size: 28px;
font-weight: bold;
border-radius: 10px;
margin: 1px;
background-color: gray;
/* Add any other common styles here */

&.green {
background-color: green;
}

&.yellow {
background-color: yellow;
}

&.black {
background-color: black;
}

&.gray {
background-color: gray;
}
`;

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