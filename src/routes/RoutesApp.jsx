import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RegisterForm } from "../pages/RegisterForm";
import { UsuariosView } from "../pages/UsuariosView";
import { UserProfile } from "../pages/UserProfile";
import { SolicitudesView } from "../pages/SolicitudesView";
import { LoginPage } from "../pages/LoginPage";
import { ContactoView } from "../pages/ContactoView";


export const RoutesApp = ({ datosUsuario }) => {
    
   

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={'/login'} />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="usuario" element={<UserProfile id={datosUsuario}/>} />
                <Route path="buscar" element={<UsuariosView id={datosUsuario}/>} />  {/* Pasar el ID */}
                <Route path="solicitudes" element={<SolicitudesView id={datosUsuario}/>} />
                <Route path="contacto" element={<ContactoView id={datosUsuario} />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </>
    );
};