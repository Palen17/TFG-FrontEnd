import { useState } from "react";

export const RegisterForm = () => {

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        dni: '',
        provincia: '',
        ciudad: '',
        telefono: '',
        peso: '',
        grupoSanguineo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
    };
    return (
        <>
            <div className="container card my-4">
                <h2 className="text-center mb-4">Formulario de Carga</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input
                                type="text"
                                className="form-control"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dni"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                required
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
                                value={formData.provincia}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="ciudad" className="form-label">Ciudad</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ciudad"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                                required
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
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="peso" className="form-label">Peso</label>
                            <input
                                type="number"
                                className="form-control"
                                id="peso"
                                name="peso"
                                value={formData.peso}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grupoSanguineo" className="form-label">Grupo Sanguíneo</label>
                        <select
                            className="form-select"
                            id="grupoSanguineo"
                            name="grupoSanguineo"
                            value={formData.grupoSanguineo}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Seleccione su grupo sanguíneo</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="text-center" >
                        <button type="submit" className="btn btn-primary">Confirmar</button>
                    </div>
                </form>
            </div>
        </>
    )

}