import React from 'react';
import { Modal, Tab, Tabs, Box, Typography, TextField, Button, AppBar, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import './PatientDashboard.css'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#3C9A8D',
    },
  },
});

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  width: 800px; /* Increased width */
  padding: 20px;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #3C9A8D; /* Changed background color */
    color: #fff;
    &:hover {
      background-color: #2b7268; /* Darker color on hover */
    }
  }
`;

const SmallButton = styled(StyledButton)`
  && {
    padding: 8px 16px;
    font-size: 0.875rem;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const CalendarModal = ({ onClose, date }) => {
     const [value, setValue] = React.useState(0);

     const handleFocus = (e) => {
          console.log(e);
     }

     const handleChange = (event, newValue) => {
          setValue(newValue);
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          // Handle form submission
     };

     // Sample data for upcoming appointments
     const sampleAppointments = [
          { time: "9:00 AM", description: "Dentist Appointment" },
          { time: "11:30 AM", description: "Meeting with Client" },
          { time: "2:00 PM", description: "Team Standup" }
     ];

     return (
          // <ThemeProvider theme={customTheme}>
               <StyledModal open={true} onClose={onClose} closeAfterTransition>
                    <StyledPaper>
                         <CloseButton onClick={onClose}>
                              <CloseIcon />
                         </CloseButton>
                         <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
                              <Tabs value={value} onChange={handleChange} aria-label="modal tabs">
                                   <Tab className='tab-label' label="Upcoming Appointments" sx={{ fontSize: '1rem', color: "#3C9A8D" }} />
                                   <Tab className='tab-label' label="Book Appointment" sx={{ fontSize: '1rem',  color: "#3C9A8D"}} />
                              </Tabs>
                         </AppBar>
                         <Box p={2}>
                              {value === 0 && (
                                   <Box>
                                        {/* <Typography variant="h6">Upcoming Appointments on {date}</Typography> */}
                                        <TableContainer>
                                             <Table>
                                                  <TableHead>
                                                       <TableRow>
                                                            <TableCell>Time</TableCell>
                                                            <TableCell>Description</TableCell>
                                                       </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                       {sampleAppointments.map((appointment, index) => (
                                                            <TableRow key={index}>
                                                                 <TableCell>{appointment.time}</TableCell>
                                                                 <TableCell>{appointment.description}</TableCell>
                                                            </TableRow>
                                                       ))}
                                                  </TableBody>
                                             </Table>
                                        </TableContainer>
                                   </Box>
                              )}
                              {value === 1 && (
                                   <Box sx={{ margin:"auto" }}>
                                        {/* <Typography variant="h6">Book Appointment on {date}</Typography> */}
                                        <StyledForm onSubmit={handleSubmit} sx={{}}>
                                             <TextField label="Name" variant="outlined" />
                                             <TextField label="Email" variant="outlined" />
                                             <Box sx={{margin:"auto"}}>
                                                  <SmallButton sx={{ width: "30%" }} type="submit" variant="contained">Book</SmallButton>
                                             </Box>
                                        </StyledForm>
                                   </Box>
                              )}
                         </Box>
                    </StyledPaper>
               </StyledModal>
     );
};

export default CalendarModal;
