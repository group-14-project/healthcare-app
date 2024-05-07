import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { uploadReport } from '../../Store/patientSlice';
import { useDispatch,useSelector } from 'react-redux';


const ReportForm = (props) => {
     const dispatch = useDispatch();
     const handleClose = () => props.setShow(false);
     const doctorList = useSelector((state) => state.patient.doctorList);
     const [doctorName,setDoctorName] = useState("");
     const [reportName, setReportName] = useState("");
     const [doctorEmail, setDoctorEmail] = useState("");
     const [file, setFile] = useState(null);

     const handleChange = (e) =>{
          setDoctorName(e.target.value.firstName + " " + e.target.value.lastName);
          setDoctorEmail(e.target.value.email);
     }

     const handleReportNameChange = (e) => {
          setReportName(e.target.value);
     }

     const handleDoctorNameChange = (e) => {
          setDoctorName(e.target.value);
     }


     const handleFileChange = (e) => {
          setFile(e.target.files[0])
     }

     const handleSubmit = async (e) => {
          e.preventDefault();

          const formData = {
               reportName,
               doctorEmail,
               file
          };

          console.log(formData);

          const res = dispatch(uploadReport(formData));

          props.setShow(false);
          
     }


     return (
          <>
               <Modal show={props.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>Upload Report</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form >
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                   <Form.Label>Report Name</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder="Report Name"
                                        autoFocus
                                        onChange={handleReportNameChange}
                                   />
                              </Form.Group>
                              <Form.Group
                                   className="mb-3"
                                   controlId="exampleForm.ControlTextarea1"
                              >
                                   <Form.Label>Doctor Name</Form.Label>
                                   <FormControl
								// className={styles.patient_name}
								sx={{ m: 1, width: 300, mt: 3 }}
							>
								<Select
									displayEmpty
									value={doctorName}
									onChange={handleChange}
									input={<OutlinedInput />}
									renderValue={(selected) => {
										if (!selected) {
											return <em>Doctor Name</em>;
										}

										return selected;
									}}
									inputProps={{ "aria-label": "Without label" }}
								>
									<MenuItem disabled value="">
										<em>Doctor Name</em>
									</MenuItem>
									{doctorList.map((doctor, index) => (
										<MenuItem
											key={index}
											name={doctor.firstName + doctor.lastName}
											value={doctor}
										>
											{doctor.firstName} {doctor.lastName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
                              </Form.Group>
                              <Form.Group
                                   className="mb-3"
                                   controlId="exampleForm.ControlTextarea1"
                              >
                                   <Form.Label>Upload File</Form.Label>
                                   <Form.Control type="file" rows={3} onChange={handleFileChange} />
                              </Form.Group>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" type="submit" onClick={handleSubmit}>
                              Submit
                         </Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}

export default ReportForm;