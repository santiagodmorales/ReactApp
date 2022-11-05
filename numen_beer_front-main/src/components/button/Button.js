import React from 'react'
import './button.css'
import { Link } from 'react-router-dom';

const Button = (props) => {
  const {type, text, onClick, className, url} = props;

  return (
    <Link to={`/${url}`}>
      <button type={type} onClick={onClick} className={className}>{text}</button>
    </Link>
  )
}

export default Button


  