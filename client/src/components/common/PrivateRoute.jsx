import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute(props) {
	const isAuthenticated = useSelector(
		(state) => state.login.user.isAuthenticated
	);
	const role = useSelector((state) => state.login.user.role); // Add this line to get the user's role
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login", { replace: true });
		}
		if (
			(role === "doctor" &&
				(window.location.pathname.includes("/patient") ||
					window.location.pathname.includes("/admin"))) ||
			(role === "patient" &&
				(window.location.pathname.includes("/doctor") ||
					window.location.pathname.includes("/admin"))) ||
			(role === "admin" &&
				(window.location.pathname.includes("/patient") ||
					window.location.pathname.includes("/doctor")))
		) {
			navigate("/access-denied");
		}
	}, [isAuthenticated, navigate, role, window.location.pathname]); // Add role and props.location.pathname to the dependency array

	return <>{props.children}</>;
}
export default PrivateRoute;
