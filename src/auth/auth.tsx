import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRouter({ children }: { children: JSX.Element }) {
    const auth = true; // TO-DO add auth logic
    const location = useLocation();

    return auth ? children : <Navigate to="/" state={{ from: location }} />;
}

export default PrivateRouter;
