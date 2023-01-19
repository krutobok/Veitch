import CheckButton from './CheckButton'
import styles from './CheckButtonsContainer.module.css'

const CheckButtonsContainer = ({ changeButtons, buttons }) => {
  return (
    <div className={styles.buttonContainer}>
      <h2 className={styles.containerTitle}>Виберіть набори:</h2>
      {buttons.map((button) => (
        <CheckButton
          key={button.id}
          changeButtons={changeButtons}
          id={button.id}
          checked={button.checked}
        />
      ))}
    </div>
  )
}

export default CheckButtonsContainer
