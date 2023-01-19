import styles from './Result.module.css'
import keysForResult from '../../data/keysForResult'
import Answer from './Answer'

const Result = ({ combinations, lenght }) => {
  const generateNods = combinations.map((comb, index) => {
    const elems = keysForResult.reduce((acum, key, keyIndex) => {
      const result = comb.reduce(
        (marker, num) => {
          if (key.includes(num)) {
            marker.yes = true
          }
          if (!key.includes(num)) {
            marker.no = true
          }
          return marker
        },
        { yes: false, no: false }
      )
      if (!result.no && result.yes) {
        acum[keyIndex + 1] = true
      }
      if (result.no && !result.yes) {
        acum[keyIndex + 1] = false
      }
      return acum
    }, {})
    let nods = []
    for (const key in elems) {
      if (elems.hasOwnProperty(key) && typeof elems[key] === 'boolean') {
        nods.push(
          <Answer
            key={key * index + key * 85}
            num={key}
            overline={elems[key]}
          />
        )
      }
    }
    if (index !== lenght - 1) {
      nods.push(' v ')
    }

    return nods
  })
  console.log(generateNods.flat())
  return (
    <div className={styles.result}>
      {`Відповідь: `}
      {lenght === 1 && generateNods.flat().length === 0 ? '1' : generateNods}
    </div>
  )
}

export default Result
