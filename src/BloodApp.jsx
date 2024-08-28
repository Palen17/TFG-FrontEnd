
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { RoutesApp } from "./routes/RoutesApp";

export const BloodApp = () => {
    const [datosUsuario, setDatosUsuario] = useState(null);
    return (
        <>
        <Navbar />
            <div className="container my-4">
                <RoutesApp datosUsuario={datosUsuario}/>
            </div>
        </>
    )

}