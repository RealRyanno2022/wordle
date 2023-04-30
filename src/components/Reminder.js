import React, { useState} from 'react'

function Reminder({validInputSize, invalidWord, ...props}) {

    const inputLettersReminder = "Input 5 letters before hitting enter."
    const invalidWordReminder = "That word is not valid."

  return (
    <div>
        {validInputSize ? " " : {inputLettersReminder}}
        {invalidWord ? " " : {invalidWordReminder}}
    </div>
  )
}

export default Reminder
