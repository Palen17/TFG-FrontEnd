import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { RoutesApp } from "./routes/RoutesApp";
import {jwtDecode} from "jwt-decode";
import { useLocation } from "react-router-dom";

export const BloodApp = () => {
    const [datosUsuario, setDatosUsuario] = useState(null);
    const location = useLocation();
    // Rutas donde no queremos mostrar el Navbar
    const hideNavbarRoutes = ['/login', '/register'];

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setDatosUsuario({
                id: decoded.id,
                user_type: decoded.user_type
            });  // Guardar el ID del usuario
        }
    }, []);

    return (
        <>
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar setDatosUsuario={setDatosUsuario} />}
            <div className="container my-4">
                <RoutesApp datosUsuario={datosUsuario} />
            </div>
        </>
    );
}