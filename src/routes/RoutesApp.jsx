import { Navigate, Route, Routes } from "react-router-dom"
import { RegisterForm } from "../components/RegisterForm"
import { UsuariosView } from "../components/UsuariosView"
import { UserProfile } from "../components/UserProfile"
import { SolicitudesView } from "../components/SolicitudesView"

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