
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { RoutesApp } from "./routes/RoutesApp";
import {jwtDecode} from "jwt-decode";

export const BloodApp = () => {
    const [datosUsuario, setDatosUsuario] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setDatosUsuario(decoded.id);  // Guardar el ID del usuario
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="container my-4">
                <RoutesApp datosUsuario={datosUsuario} />
            </div>
        </>
    );
}