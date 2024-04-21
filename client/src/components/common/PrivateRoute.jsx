import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute(props) {
    const isAuthenticated = useSelector(
        (state) => state.login.user.isAuthenticated
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return <>{props.children}</>;
}
export default PrivateRoute;
