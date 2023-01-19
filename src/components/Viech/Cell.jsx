import styles from './Cell.module.css'

const Cell = ({ children, border }) => {
  let elements = <></>
  if (border) {
    elements = border.styles.map((cell, index) => {
      const stylesCell = {}
      for (const key in cell) {
        if (cell.hasOwnProperty(key) && typeof cell[key] === 'boolean') {
          if (cell[key]) {
            stylesCell['border' + key] = '1px solid ' + cell.color
          }
        }
      }
      if (cell.Top) {
        stylesCell.height = `calc(100% - ${cell.index}px)`
        stylesCell.top = `${cell.index}px`
      }
      if (cell.Bottom) {
        stylesCell.height = `calc(100% - ${cell.index}px)`
        stylesCell.bottom = `${cell.index}px`
        stylesCell.top = `auto`
      }
      if (cell.Left) {
        stylesCell.width = `calc(100% - ${cell.index}px)`
        stylesCell.left = `${cell.index}px`
      }
      if (cell.Right) {
        stylesCell.width = `calc(100% - ${cell.index}px)`
        // stylesCell.rigth = `${cell.index}px`
        stylesCell.left = `0`
      }
      if (cell.Top && cell.Bottom) {
        stylesCell.height = `calc(100% - ${cell.index * 2}px)`
        stylesCell.top = `${cell.index}px`
        stylesCell.bottom = `auto`
      }
      if (cell.Left && cell.Right) {
        stylesCell.width = `calc(100% - ${cell.index * 2}px)`
        stylesCell.left = `${cell.index}px`
        // stylesCell.rigth = `auto`
      }
      if (cell.Top && cell.Left) {
        stylesCell.borderTopLeftRadius = '20%'
      }
      if (cell.Top && cell.Right) {
        stylesCell.borderTopRightRadius = '20%'
      }
      if (cell.Bottom && cell.Left) {
        stylesCell.borderBottomLeftRadius = '20%'
      }
      if (cell.Bottom && cell.Right) {
        stylesCell.borderBottomRightRadius = '20%'
      }
      return (
        <span
          key={index}
          style={stylesCell}
          className={styles.cellInside}
        ></span>
      )
    })
  }
  return (
    <div className={styles.cell}>
      {children}
      {elements}
    </div>
  )
}

export default Cell
