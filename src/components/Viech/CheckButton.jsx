import { useState } from 'react'
import styles from './CheckButton.module.css'

const CheckButton = ({ changeButtons, id, checked }) => {
  const [btnStyles, setBtnStyles] = useState(styles.button)
  const onBtnClick = () => {
    !checked
      ? setBtnStyles(`${styles.button} ${styles.active}`)
      : setBtnStyles(styles.button)
    changeButtons(id)
  }
  let insideButton
  const insideButtonCreate = (size) => {
    insideButton = Array.from(id.toString(2).padStart(size, '0'))
  }
  insideButtonCreate(4)
  return (
    <button onClick={onBtnClick} className={btnStyles}>
      {insideButton.map((element, index) => {
        return (
          <span key={index + 1}>
            {element === '0' ? (
              <span style={{ textDecoration: 'overline' }}>x</span>
            ) : (
              <span>x</span>
            )}
            <sub>{index + 1}</sub>
          </span>
        )
      })}
    </button>
  )
}

export default CheckButton
