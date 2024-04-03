import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SidebarTheme from "./SidebarTheme";
import { ThemeProvider } from "@emotion/react";
import DuoSharpIcon from "@mui/icons-material/DuoSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import MedicationSharpIcon from "@mui/icons-material/MedicationSharp";
import UndoSharpIcon from "@mui/icons-material/UndoSharp";
import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

function SideBar() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box className="sidebar-parent">
			<CssBaseline />
      
			<ThemeProvider theme={SidebarTheme}>
				<Drawer variant="permanent" open={open}>
					<DrawerHeader>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className="burger-btn"
							sx={{
								...(open && { display: "none", color: "black" }),
							}}
						>
							<MenuIcon />
						</IconButton>
						
					</DrawerHeader>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						{[
							"Consult",
							"Reports",
							"Prescriptions",
							"Past Appointments",
							"Upcoming Appointments",
							"Logout",
						].map((text, index) => (
							<ListItem key={text}  disablePadding className="sidebar-list-item">
								<ListItemButton
									className="sidebar-btn"
									sx={{
										justifyContent: open ? "initial" : "center",
									}}
									component={Link}
									to={"patient/"+text.toLowerCase()}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : "auto",
											justifyContent: "center",
										}}
									>
										{index == 0 ? (
											<DuoSharpIcon />
										) : index == 1 ? (
											<SummarizeSharpIcon />
										) : index == 2 ? (
											<MedicationSharpIcon />
										) : index == 3 ? (
											<UndoSharpIcon />
										) : index == 4 ? (
											<UpdateSharpIcon />
										) : (
											<LogoutSharpIcon />
										)}
									</ListItemIcon>
									<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
			</ThemeProvider>
		</Box>
	);
}

export default SideBar;
