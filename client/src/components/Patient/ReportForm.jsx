import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { uploadReport } from '../../Store/patientSlice';
import { useDispatch } from 'react-redux';

const ReportForm = (props) => {
     const dispatch = useDispatch();
     const handleClose = () => props.setShow(false);


     const [reportName, setReportName] = useState("");
     const [doctorEmail, setDoctorName] = useState("");
     const [file, setFile] = useState(null);

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
                                   <Form.Control type="text" placeholder='Doctor Name' rows={3} onChange={handleDoctorNameChange} />
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