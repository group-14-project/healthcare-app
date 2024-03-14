import React from 'react'
import './card.css'
function Card(props) {
  return (
    <div className="card">
    <img className="doctor-image" src={props.url}/>
    <h2>{props.name}</h2>
  <p className="rating">{props.rating}</p>
  </div>
  )
}

export default Card