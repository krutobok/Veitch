const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
const colors = ['red', 'blue', 'orange', 'green', 'darkviolet']
const getColors = (num) => {
  if (num >= colors.length) {
    return getRandomColor()
  } else {
    return colors[num]
  }
}

export default getColors
