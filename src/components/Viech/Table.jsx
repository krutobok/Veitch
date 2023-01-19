import Cell from './Cell'
import Marker from './Marker'
import styles from './Table.module.css'

const Table = ({ buttons, combinations, borders }) => {
  return (
    <div className={styles.tableInner}>
      <Marker
        style={{
          top: 'calc(25% + 2px)',
          left: 'calc(40px - 25%)',
          transform: 'rotate(270deg)',
        }}
      >
        x1
      </Marker>
      <Marker style={{ top: '0', left: '45px' }}>x2</Marker>

      <Marker
        style={{
          top: 'calc(50% - 20px)',
          right: 'calc(40px - 25%)',
          transform: 'rotate(90deg)',
        }}
      >
        x3
      </Marker>
      <Marker
        style={{
          left: 'calc(25% + 24px)',
          bottom: '0',
          transform: 'rotate(180deg)',
        }}
      >
        x4
      </Marker>
      <div className={styles.table}>
        {buttons.map((button) =>
          button.checked ? (
            <Cell
              border={borders.find((el) => el.id === button.id)}
              key={button.id}
            >
              1
            </Cell>
          ) : (
            <Cell key={button.id}>0</Cell>
          )
        )}
      </div>
    </div>
  )
}

export default Table
