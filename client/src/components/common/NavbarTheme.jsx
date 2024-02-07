import { createTheme } from "@mui/material";

const NavbarTheme = createTheme({
     components: {
          MuiAppBar: {
               styleOverrides: {
                    colorPrimary: {
                         backgroundColor: "#F9F9F9",
                         color: "#154B50",
                         boxShadow: "none",
                         // alignItems: "center"
                    }
               }
          }
     }
});

export default NavbarTheme;