import React from "react";
import "./Navbar.css";
// import { AppBar, Box, Button } from '@mui/material';
import logo from "../../assets/logo.png";
import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AppBar } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NavbarTheme from './NavbarTheme';
import { alpha } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";
import CallIcon from '@mui/icons-material/Call';


const Search = styled('div')(({ theme }) => ({
     position: 'relative',
     borderRadius: theme.shape.borderRadius,
     backgroundColor: alpha(theme.palette.common.white, 1),
     '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 1),
     },
     marginRight: theme.spacing(2),
     marginLeft: 0,
     width: '100%',
     [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
     },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
     padding: theme.spacing(0, 2),
     height: '100%',
     position: 'absolute',
     pointerEvents: 'none',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
     color: 'inherit',
     '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
               width: '20ch',
          },
     },
}));


const MidNavbar = () => {
     const theme = useTheme();


     return (
          <Box className="mid-navbar-parent">
               <CssBaseline />
               <ThemeProvider theme={NavbarTheme}>
                    <AppBar position="static" >
                         <Toolbar className="mid-navbar-toolbar">
                              <Search>
                                   <SearchIconWrapper>
                                        <SearchIcon />
                                   </SearchIconWrapper>
                                   <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                   />
                              </Search>

                              <Button variant="outlined" className="call-btn"><CallIcon/>Call</Button>
                         </Toolbar>
                    </AppBar>
               </ThemeProvider>
          </Box>
     );
};


export default MidNavbar;
