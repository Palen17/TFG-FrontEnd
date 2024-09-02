import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const SolicitudesView = () => {
    const [solicitudes, setSolicitudes] = useState([]); // Estado para las solicitudes
    const [loading, setLoading] = useState(true); // Estado para el loading
    const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario
    const [newSolicitud, setNewSolicitud] = useState({
        usuario: '',
        nombre: '',
        apellido: '',
        correo_electronico: '',
        provincia: '',
        ciudad: '',
        factor_sanguineo: '',
        fecha_comienzo: '',
        fecha_fin: '',
        descripcion: ''
    }); // Estado para los campos del formulario

    const userId = 4; // Reemplaza esto con el id real del usuario

    useEffect(() => {
        // Obtener las solicitudes al montar el componente
        const fetchSolicitudes = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/solicitudes');
                setSolicitudes(response.data);
            } catch (error) {
                console.error('Error al obtener las solicitudes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitudes();
    }, []);

    const handleInputChange = (e) => {
        setNewSolicitud({
            ...newSolicitud,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar la solicitud al backend
            const response = await axios.post('http://localhost:8081/api/solicitudes', {
                usuario: userId, // El ID del usuario que carga la solicitud
                fecha_comienzo: newSolicitud.fecha_comienzo,
                fecha_fin: newSolicitud.fecha_fin,
                descripcion: newSolicitud.descripcion
            });
            setSolicitudes([...solicitudes, response.data]); // Actualiza la lista de solicitudes
            setShowForm(false); // Cierra el formulario
            setNewSolicitud({ usuario: '', fecha_comienzo: '', fecha_fin: '', descripcion: '' }); // Resetea el formulario
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
        }
    };

    if (loading) {
        return <p>Cargando solicitudes...</p>;
    }

    return (
        <>
            <button className="btn btn-danger pull-right" onClick={() => setShowForm(true)}>
                Nueva Solicitud
            </button>
            
            {showForm && (
                <form onSubmit={handleSubmit} className="my-4">
                    <div className="form-group">
                        <label>Fecha de Comienzo</label>
                        <input
                            type="date"
                            name="fecha_comienzo"
                            value={newSolicitud.fecha_comienzo}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Fin</label>
                        <input
                            type="date"
                            name="fecha_fin"
                            value={newSolicitud.fecha_fin}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="descripcion"
                            value={newSolicitud.descripcion}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar Solicitud</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                        Cancelar
                    </button>
                </form>
            )}

            <div className="my-4">
                {solicitudes.length > 0 ? (
                    solicitudes.map((solicitud) => (
                        <div className="card w-50 my-4" key={solicitud.id}>
                            <div className="card-body">
                                <h5 className="card-title">{solicitud.nombre} {solicitud.apellido}</h5>
                                <p className="card-text">Email: {solicitud.correo_electronico}</p>
                                <p className="card-text">Provincia: {solicitud.provincia}</p>
                                <p className="card-text">Ciudad: {solicitud.ciudad}</p>
                                <p className="card-text">Factor Sanguineo: {solicitud.factor_sanguineo}</p>
                                <p className="card-text">Descripción: {solicitud.descripcion}</p>
                                <button className="btn btn-danger">Enviar mensaje</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay solicitudes disponibles</p>
                )}
            </div>
        </>
    );
};
