import { NavLink } from "react-router-dom"

export const Navbar = () => {
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
                                <NavLink className={"nav-link"} to={"/"}>Mi perfil</NavLink>
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
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}