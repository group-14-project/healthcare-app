import React from 'react'
import './CallLoader.css'
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { patientActions } from '../../Store/patientSlice';


const CallLoader = () => {
     const dispatch = useDispatch();

     const handleClick = () => {
          dispatch(patientActions.updateCallingState(false));
     }

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
               <Box>
                    <Button variant='contained' color="success" onClick={handleClick}>Stop Dialing</Button>
               </Box>
          </div>
     );
}

export default CallLoader