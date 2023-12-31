import React from 'react'

const Title = ({ title, subTitle }) => {
  return (
    <div id='title'>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  )
}

export default Title
