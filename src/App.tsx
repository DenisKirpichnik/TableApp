import React from 'react'
import './styles/styles.css'

export const App = () => {
  return (
    <div>
      {process.env.name}
      <p id="wow">Cool</p>
    </div>
  )
}
