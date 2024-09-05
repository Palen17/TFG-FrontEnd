import { NavLink, useNavigate } from "react-router-dom"

export const Navbar = ({ setDatosUsuario }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token de autenticación del almacenamiento local
        localStorage.removeItem('token'); // O sessionStorage.removeItem('token');

        // Limpiar los datos del usuario en el estado global
        setDatosUsuario(null);

        // Redirigir a la página de inicio de sesión
        navigate('/login');
        window.location.reload();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">BloodApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="active" aria-current="page"></a>
                                <NavLink className={"nav-link"} to={"/usuario"}>Mi perfil</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to={"/buscar"}>Buscar</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to={"/solicitudes"}>Solicitudes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to={"/contactos"}>Contactos</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}