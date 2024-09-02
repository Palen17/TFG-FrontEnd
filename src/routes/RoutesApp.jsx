import { Navigate, Route, Routes } from "react-router-dom"
import { RegisterForm } from "../pages/RegisterForm"
import { UsuariosView } from "../pages/UsuariosView"
import { UserProfile } from "../pages/UserProfile"
import { SolicitudesView } from "../pages/SolicitudesView"

export const RoutesApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={'/usuario'} />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="usuario" element={<UserProfile />} />
                <Route path="buscar" element={<UsuariosView />} />
                <Route path="solicitudes" element={<SolicitudesView />} />
            </Routes>
        </>
    )
}