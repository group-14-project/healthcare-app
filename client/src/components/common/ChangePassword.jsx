import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

function ChangePassword() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    // Add your input change logic here
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Adjust as needed
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} style = {{marginLeft: "25%"}}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              name="password"
              type="password"
              InputProps={{ style: { borderRadius: 16 } }}
              InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6} style = {{marginLeft: "25%"}} >
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              InputProps={{ style: { borderRadius: 16 } }}
              InputLabelProps={{ style: { color: "rgb(38, 122, 107)" } }}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 16,
                backgroundColor: "rgb(38, 122, 107)",
                fontSize: "24px",
                margin: "auto",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ChangePassword;
