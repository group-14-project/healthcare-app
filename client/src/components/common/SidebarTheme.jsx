import { createTheme } from "@mui/material";

const SidebarTheme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: 'linear-gradient(to bottom, #3DAFBC, #00b2bd 1%,#00b1bc 2%,#0099a9 99%,#009faf 100%,#2fb8c3 100%,#7AD2DA 100%,#9adfe4 100%, #3198A8 100%)',
                }
            }
        }
    }
});

export default SidebarTheme;