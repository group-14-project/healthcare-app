import React from 'react'
import { useSelector } from 'react-redux'
import IncomingCall from './IncomingCall';


function Departments() {

  const doctorState = useSelector(state=>state.doctor);

  return (
    <div>
      Departments
      {doctorState.incomingCall ? (
        <IncomingCall />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Departments