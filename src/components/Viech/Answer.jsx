const Answer = ({ overline, num }) => {
  return (
    <span>
      <span style={!overline ? { textDecoration: 'overline' } : {}}>x</span>
      <sub>{num}</sub>
    </span>
  )
}

export default Answer
