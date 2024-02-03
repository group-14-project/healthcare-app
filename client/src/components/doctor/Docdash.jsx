import React from 'react'
import './Docdash.css'
import doctor from '../../assets/doctor.png'

function Docdash() {
  return (
    <div className='doc-dash'>
        <div className="greeting">
            <div className='doctor-details'>
                <div className='details good-morning'>Good Morning</div>
                <div className='details doc-name'>Dr.Name</div>
                <div className='details line'>Have a nice day at work</div>
            </div>
            <div className='doctor-image'>
                <img src={doctor} alt="doctor" />
            </div>
        </div>
    </div>
  )
}

export default Docdash