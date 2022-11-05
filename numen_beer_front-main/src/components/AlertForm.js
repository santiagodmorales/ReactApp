import React from 'react'
import '../styles/alert.css'


const AlertForm = (error, className) => {
    return (
      <p className={className}>{error}</p>
  
    )
  }
  
export default AlertForm