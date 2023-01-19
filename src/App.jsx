import { useState } from 'react'
import './App.css'
import CheckButtonsContainer from './components/Viech/CheckButtonsContainer'
import Table from './components/Viech/Table'
import keysForSize4 from './data/keys'
import getColor from './components/Utils/randomColor'
import Result from './components/Viech/Result'
const SIZE = 4

function App() {
  const defaultButtons = []
  for (let i = 0; i < 16; i++) {
    const newBtn = {
      id: i,
      checked: false,
    }
    defaultButtons.push(newBtn)
  }
  const [buttons, setButtons] = useState(defaultButtons)
  const [borders, setBorders] = useState([])
  const [cellData, setCellData] = useState(
    defaultButtons.map((elem, index) => ({
      ...elem,
      tableKey: keysForSize4[index],
    }))
  )
  const [combinations, setCombinations] = useState([])
  console.log(combinations)
  const changeButtonHandler = (id) => {
    setButtons(
      buttons.map((button) =>
        button.id === id
          ? { ...button, checked: !button.checked }
          : { ...button }
      )
    )
    const newCellDate = cellData.map((cell) =>
      cell.tableKey === id ? { ...cell, checked: !cell.checked } : { ...cell }
    )
    setCellData(newCellDate)
    let newCombinations = newCellDate
      .reduce((acum, button, index) => {
        const cellChecker = (from, to) => {
          const cellArr = []
          for (let i = from; i <= to; i++) {
            cellArr.push(newCellDate[i].id)
            if (!newCellDate[i].checked) {
              return false
            }
          }
          return cellArr
        }
        const cellArrayChecker = (arr) => {
          if (!arr.every((elem) => newCellDate[elem].checked)) {
            return false
          }
          const cellArr = [...arr]
          return cellArr
        }
        const cellCheckerVertically = (from, num) => {
          const cellArr = []
          let currentIndex = from
          for (let j = 0; j < num; j++) {
            cellArr.push(newCellDate[currentIndex].id)
            if (!newCellDate[currentIndex].checked) {
              return false
            }
            currentIndex += SIZE
          }
          return cellArr
        }
        const cellArrayCheckerWrapper = (statment, elements) => {
          if (statment) {
            const result = cellArrayChecker(elements)
            if (result) {
              acum.push(result)
            }
          }
        }
        if (newCellDate.every((button) => button.checked)) {
          const arr = []
          for (let i = 0; i < newCellDate.length; i++) {
            arr.push(i)
          }
          acum = [arr]
          return acum
        }
        if (newCellDate.length > index + 7 && button.id % SIZE === 0) {
          const result = cellChecker(index, index + 7)
          if (result) {
            acum.push(result)
          }
        }
        if (index < SIZE - 1) {
          const result1 = cellCheckerVertically(index, 4)
          const result2 = cellCheckerVertically(index + 1, 4)
          if (result1 && result2) {
            acum.push(result1.concat(result2))
          }
        }
        if (index === SIZE - 1) {
          const result1 = cellCheckerVertically(index, 4)
          const result2 = cellCheckerVertically(0, 4)
          if (result1 && result2) {
            acum.push(result1.concat(result2))
          }
        }
        if (index < SIZE) {
          const result = cellCheckerVertically(index, 4)
          if (result) {
            acum.push(result)
          }
        }
        if (newCellDate.length === index + SIZE && button.id % SIZE === 0) {
          const result1 = cellChecker(index, index + SIZE - 1)
          const result2 = cellChecker(0, SIZE - 1)
          if (result1 && result2) {
            acum.push(result1.concat(result2))
          }
        }
        if (newCellDate.length > index + 3 && button.id % SIZE === 0) {
          const result = cellChecker(index, index + 3)

          if (result) {
            acum.push(result)
          }
        }
        if (index < SIZE * (SIZE - 1) && (index + 1) % SIZE === 0) {
          const result1 = cellCheckerVertically(index, 2)
          const result2 = cellCheckerVertically(index - SIZE + 1, 2)
          if (result1 && result2) {
            acum.push(result1.concat(result2))
          }
        }
        if (index < SIZE * (SIZE - 1) - 1 && (index + 1) % SIZE !== 0) {
          const result1 = cellCheckerVertically(index, 2)
          const result2 = cellCheckerVertically(index + 1, 2)
          if (result1 && result2) {
            acum.push(result1.concat(result2))
          }
        }
        if (index < SIZE * (SIZE - 1)) {
          const result = cellCheckerVertically(index, 2)
          if (result) {
            acum.push(result)
          }
        }
        if (newCellDate.length !== index + 1 && (button.id + 1) % SIZE !== 0) {
          const result = cellChecker(index, index + 1)
          if (result) {
            acum.push(result)
          }
        }
        cellArrayCheckerWrapper(index === newCellDate.length - 1, [
          index,
          SIZE - 1,
          index - SIZE + 1,
          0,
        ])

        cellArrayCheckerWrapper(
          index >= SIZE * (SIZE - 1) && index !== newCellDate.length - 1,
          [
            index,
            index - SIZE * (SIZE - 1),
            index + 1,
            index - SIZE * (SIZE - 1) + 1,
          ]
        )
        cellArrayCheckerWrapper(index >= SIZE * (SIZE - 1), [
          index,
          index - SIZE * (SIZE - 1),
        ])
        cellArrayCheckerWrapper((index + 1) % SIZE === 0, [
          index,
          index - SIZE + 1,
        ])
        cellArrayCheckerWrapper(true, [index])
        return acum
      }, [])
      .sort((a, b) => b.length - a.length)
    if (newCombinations.length > 1) {
      let isReady = false
      let currentLength = newCombinations[0].length
      while (!isReady) {
        const bigCombinations = newCombinations.filter(
          (elem) => elem.length === currentLength
        )
        newCombinations = newCombinations.reduce((acum, elem) => {
          if (elem.length >= currentLength) {
            acum.push(elem)
            return acum
          }
          const isInclude = bigCombinations.reduce((marker, comb) => {
            if (!marker) {
              return elem.every((cell) => comb.includes(cell))
            }
            return marker
          }, false)
          if (!isInclude) {
            acum.push(elem)
          }
          return acum
        }, [])
        if (newCombinations.some((el) => el.length < currentLength)) {
          currentLength = currentLength / 2
        } else {
          isReady = true
        }
      }
      isReady = false
      while (!isReady) {
        const newCombinationsChecker = newCombinations.reduce(
          (acum, comb, combIndex) => {
            let otherArray = []
            newCombinations.forEach((el, index) => {
              if (index !== combIndex) {
                otherArray = otherArray.concat(el)
              }
            })
            if (comb.every((el) => otherArray.includes(el)) && !acum.marker) {
              acum.marker = true
              return acum
            }
            acum.combArr.push(comb)
            return acum
          },
          { combArr: [], marker: false }
        )
        if (newCombinations.length === newCombinationsChecker.combArr.length) {
          isReady = true
        }
        newCombinations = newCombinationsChecker.combArr
      }
    }

    setCombinations(newCombinations)
    setBorders(
      newCombinations.reduce((borderArr, comb, combIndex) => {
        const borderCreate = (arr) => {
          const color = getColor(combIndex)
          return comb.reduce((newArr, elem, index) => {
            const bordersList = arr
            let nesElem
            if (newArr.some((el) => el.id === elem)) {
              nesElem = newArr.find((el) => el.id === elem)
            } else {
              nesElem = { id: elem, styles: [] }
              newArr.push(nesElem)
            }
            const newStyle = {}
            bordersList[index].forEach((objKey) => {
              newStyle[objKey] = true
            })
            newStyle.color = color
            newStyle.index = combIndex
            nesElem.styles.push(newStyle)
            return newArr
          }, insideArr)
        }

        const insideArr = [...borderArr]
        const isVerticallyChecker = () =>
          comb.reduce((marker, elem, index) => {
            if (index !== comb.length - 1) {
              if (
                elem + 1 === comb[index + 1] ||
                elem + 1 - SIZE === comb[index + 1]
              ) {
                marker++
              } else {
                marker--
              }
              return marker
            } else {
              if (marker > 0) {
                return false
              } else {
                return true
              }
            }
          }, 0)
        const isSquaryChecker = () =>
          comb.every((elem, index) => {
            if (index !== comb.length - 1) {
              if (elem + SIZE === comb[index + 1]) {
                return true
              } else {
                return false
              }
            } else {
              return true
            }
          })
        if (comb.length === 2 ** SIZE) {
          return borderCreate([
            ['Top', 'Left'],
            ['Top'],
            ['Top'],
            ['Top', 'Right'],
            ['Left'],
            [],
            [],
            ['Right'],
            ['Left'],
            [],
            [],
            ['Right'],
            ['Bottom', 'Left'],
            ['Bottom'],
            ['Bottom'],
            ['Bottom', 'Right'],
          ])
        } else if (comb.length === 8) {
          const isVertically = isVerticallyChecker()
          if (!isVertically) {
            borderCreate([
              ['Top', 'Left'],
              ['Top'],
              ['Top'],
              ['Top', 'Right'],
              ['Bottom', 'Left'],
              ['Bottom'],
              ['Bottom'],
              ['Bottom', 'Right'],
            ])
          } else {
            borderCreate([
              ['Top', 'Left'],
              ['Left'],
              ['Left'],
              ['Bottom', 'Left'],
              ['Top', 'Right'],
              ['Right'],
              ['Right'],
              ['Bottom', 'Right'],
            ])
          }
        } else if (comb.length === 4) {
          const isVertically = isVerticallyChecker()
          const isNotSquary = isSquaryChecker()
          if (!isVertically) {
            borderCreate([
              ['Top', 'Bottom', 'Left'],
              ['Top', 'Bottom'],
              ['Top', 'Bottom'],
              ['Top', 'Bottom', 'Right'],
            ])
          } else if (isNotSquary) {
            borderCreate([
              ['Top', 'Right', 'Left'],
              ['Right', 'Left'],
              ['Right', 'Left'],
              ['Bottom', 'Right', 'Left'],
            ])
          } else {
            borderCreate([
              ['Top', 'Left'],
              ['Bottom', 'Left'],
              ['Top', 'Right'],
              ['Bottom', 'Right'],
            ])
          }
        } else if (comb.length === 2) {
          const isVertically = isVerticallyChecker()
          if (!isVertically) {
            borderCreate([
              ['Top', 'Bottom', 'Left'],
              ['Top', 'Bottom', 'Right'],
            ])
          } else {
            borderCreate([
              ['Top', 'Right', 'Left'],
              ['Bottom', 'Left', 'Right'],
            ])
          }
        } else if (comb.length === 1) {
          borderCreate([['Top', 'Bottom', 'Right', 'Left']])
        }
        return insideArr
      }, [])
    )
  }

  return (
    <div className="app">
      <h1>Розрахунок МДНФ за допомогою таблиці Вейча</h1>
      <CheckButtonsContainer
        changeButtons={changeButtonHandler}
        buttons={buttons}
      />
      <Table borders={borders} combinations={combinations} buttons={cellData} />
      <Result combinations={combinations} lenght={combinations.length} />
    </div>
  )
}

export default App
