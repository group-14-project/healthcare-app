import React from 'react'
import './CallLoader.css'

const CallLoader = () => {
     return (
          <div className="main-loader">
               <div className='request'>
                    <h3>Please wait while the doctor accepts your call</h3>
               </div>
               <div className="bouncing-loader">
                    <div></div>
                    <div></div>
                    <div></div>
               </div>
          </div>
     );
}

export default CallLoader