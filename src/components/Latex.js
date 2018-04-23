import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'

const Latex = (props) => {
  const array = props.code.split('\\block')
  return (
    <div className='inline'>
      {array.map((s, i) => {
        if (s.length === 0) {
          return null
        }
        if (s.includes("katex-block")) {
          const block = s.substring(11)
          return <BlockMath key={i} math={block} />
        } else {
          return <InlineMath key={i} math={s} />
        }
      })}
    </div>
  )
}

export default Latex