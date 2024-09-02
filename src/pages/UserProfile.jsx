export const UserProfile = () => {
    return (
        <>
             <div className="container card my-4">
                <h2 className="text-center mb-4">Mi Perfil</h2>
                <form>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input
                                type="text"
                                className="form-control"
                                id="apellido"
                                name="apellido"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                            <label
                                type="date"
                                className="form-control"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dni"
                                name="dni"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="provincia" className="form-label">Provincia</label>
                            <input
                                type="text"
                                className="form-control"
                                id="provincia"
                                name="provincia"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="ciudad" className="form-label">Ciudad</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ciudad"
                                name="ciudad"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="telefono" className="form-label">Teléfono</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="telefono"
                                name="telefono"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="peso" className="form-label">Peso</label>
                            <input
                                type="number"
                                className="form-control"
                                id="peso"
                                name="peso"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grupoSanguineo" className="form-label">Grupo Sanguíneo</label>
                        <input
                                type="text"
                                className="form-control"
                                id="grupo-sanguineo"
                                name="gs"
                            />
                    </div>
                    
                </form>
            </div>
        </>
    );
};
