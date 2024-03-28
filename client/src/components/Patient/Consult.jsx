import React from 'react'
// import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import symptoms from '../../Utility Data/Symptoms';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, FormLabel, InputLabel } from '@mui/material';
import axios from 'axios';




const specialties = [
     ['Cardiology', 1],
     ['Dermatology', 2],
     ['Endocrinology', 3],
     ['Gastroenterology', 4],
     ['Neurology', 5],
     ['Oncology', 6],
     ['Pediatrics', 7],
     ['Psychiatry', 8],
     ['Rheumatology', 9],
     ['Urology', 10]
];

// const useStyles = makeStyles((theme) => ({
//      form: {
//           '& .MuiTextField-root': {
//                margin: theme.spacing(1),
//                width: '25ch',
//           },
//      },
// }));


const Consult = () => {


     // const classes = useStyles();
     const [specialization, setSpecialization] = useState('');
     const [mainSymptoms, setMainSymptoms] = useState([]);
     const [otherProblems, setOtherProblems] = useState('');


     const handleSpecializationChange = (event) => {
          // console.log(e)
          setSpecialization(event.target.value);
     };

     const handleMainSymptomsChange = (event) => {
          console.log(event.target.innerText)
          setMainSymptoms([...mainSymptoms,event.target.innerText]);
     }

     const handleOtherSymptomsChange = (event) => {
          setOtherProblems(event.target.value);
     }

     const handleSubmit = (event) => {
          event.preventDefault();
          // Handle form submission logic here
          
          console.log('Selected Specialization:', specialization);

          console.log({mainSymptoms,specialization,otherProblems});

          axios.post('http://localhost:9090/patient/consult', { mainSymptoms, specialization, otherProblems})
               .then(response => {
                    console.log('Response from backend:', response.data);
                    // Handle response if needed
               })
               .catch(error => {
                    console.error('Error sending specialization:', error);
                    // Handle error if needed
               });


     };



     return (
          // <div>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
               <form onSubmit={handleSubmit} autoComplete="off" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                    <Box sx={{ width: '30%', margin: "40px" }}>
                         <FormLabel sx={{ marginBottom: "10px" }}>
                              What's Your Chief Complaint?
                         </FormLabel>
                         <Autocomplete
                              multiple
                              limitTags={2}
                              id="symptom-select"
                              options={symptoms}
                              getOptionLabel={(option) => option.symptom}
                              // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                              renderInput={(params) => (
                                   <TextField {...params} label="Symptoms" placeholder="Favorites" sx={{ color: "black" }} />
                              )}

                              onChange={handleMainSymptomsChange}

                         />
                    </Box>

                    <Box sx={{ width: '30%', margin: "40px" }}>
                         <FormLabel sx={{ marginBottom: "10px" }}>
                              Describe other problems that you are facing (Comma Separated)
                         </FormLabel>
                         <TextField
                              id="outlined-multiline-static"
                              label="Other Problems"
                              multiline
                              minRows={4}
                              onChange={handleOtherSymptomsChange}
                         />
                    </Box>

                    <Box sx={{ width: "30%", margin: "40px" }}>
                         <FormLabel sx={{ marginBottom: "10px" }}>
                              Select the specialization of the doctor you want to consult with
                         </FormLabel>
                         <TextField
                              sx={{ width: "100%" }}
                              select
                              label="Specialization"
                              value={specialization}
                              onChange={handleSpecializationChange}
                              variant="outlined"
                         >
                              {specialties.map((option) => (
                                   <MenuItem key={option[1]} value={option[0]}>
                                        {option[0]}
                                   </MenuItem>
                              ))}
                         </TextField>
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                         Submit
                    </Button>
               </form>

          </Box>



          // </div>
     )
}

export default Consult