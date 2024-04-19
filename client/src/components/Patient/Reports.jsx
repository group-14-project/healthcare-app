import React from 'react'
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
     [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#3ec7d1",
          color: theme.palette.common.white,
          fontSize: 16,
     },
     [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
     },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
     "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
     },
     // hide last border
     "&:last-child td, &:last-child th": {
          border: 0,
     },
}));

function createData(repordId, reportName, reportLink, date) {
     return { repordId, reportName, reportLink, date};
}

const rows = [
     createData(1, "Blood Test", "Download", "25 May 2024"),
     createData(2, "Blood Test", "Download", "25 May 2024"),
     createData(3, "Blood Test", "Download", "25 May 2024"),
     createData(4, "Blood Test", "Download", "25 May 2024"),
];



const Reports = (props) => {


     return (
          // <div style={{ margin: "5% auto", width: "100%", display: "flex", flexDirection:"column", alignItems:"center"}}>
          //      <div style={{marginBottom: "2%",}}>
          //           <DataGrid
          //                rows={rows}
          //                columns={columns}
          //                initialState={{
          //                     pagination: {
          //                          paginationModel: { page: 0, pageSize: 5 },
          //                     },
          //                }}
          //                pageSizeOptions={[5, 10]}
          //           />
          //      </div>
          //      <div>
          //           <Button
          //                variant="contained"
          //                component="label"
          //                color='success'
          //           >
          //                Upload A new  Report
          //                <input
          //                     type="file"
          //                     hidden
          //                />
          //           </Button>
          //      </div>
          // </div>
          <Box sx={{ display: "flex", marginLeft: "65px", padding: "20px" }}>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <StyledTableCell align='center'>Report ID</StyledTableCell>
                                   <StyledTableCell align="center">Report Name</StyledTableCell>
                                   <StyledTableCell align="center">Report Link</StyledTableCell>
                                   <StyledTableCell align="center">
                                        Date
                                   </StyledTableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {rows.map((row) => (
                                   <StyledTableRow key={row.repordId}>
                                        <StyledTableCell component="td" scope="row" align="center">
                                             {row.repordId}
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row"  align="center">
                                             {row.reportName}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                             <Button
                                                  style={{ backgroundColor: "#00ACB9" }}
                                                  variant="contained"
                                             >
                                                  Download
                                             </Button>
                                        </StyledTableCell>
                                        <StyledTableCell component="td" scope="row" align="center">
                                             {row.date}
                                        </StyledTableCell>
                                   </StyledTableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>
          </Box>
     )
}

export default Reports;