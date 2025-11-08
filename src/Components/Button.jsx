import styles from './Button.module.css'

function Button({ children, onClick, type = "button", variant = "primary" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button
