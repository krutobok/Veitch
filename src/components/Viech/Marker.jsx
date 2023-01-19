import styles from './Marker.module.css'

const Marker = ({ children, style }) => {
  return (
    <div style={style} className={styles.marker}>
      <p className={`${styles.markerText} markerText`}>{children}</p>
      <div className={styles.markerLine}></div>
    </div>
  )
}

export default Marker
