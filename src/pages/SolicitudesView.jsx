import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';

export const SolicitudesView = ({ id }) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [viewUserSolicitudes, setViewUserSolicitudes] = useState(false); // Controla qué vista mostrar
    const [newSolicitud, setNewSolicitud] = useState({
        usuario: '',
        descripcion: ''
    });
    const [filterFactor, setFilterFactor] = useState(''); // Filtro de factor sanguíneo
    const [sesion, setSesion] = useState([]);

    const userId = id; // ID del usuario actual

    // Obtener todas las solicitudes
    useEffect(() => {
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

    // Obtener datos de la sesión del usuario
    useEffect(() => {
        const fetchSesion = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/usuarios/${id}`);
                setSesion(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };
        fetchSesion();
    }, [id]);

    // Manejar cambios en el formulario de solicitud
    const handleInputChange = (e) => {
        setNewSolicitud({
            ...newSolicitud,
            [e.target.name]: e.target.value
        });
    };

    // Enviar solicitud al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/solicitudes', {
                usuario: userId,
                descripcion: newSolicitud.descripcion
            });
            setSolicitudes([...solicitudes, response.data]);
            setShowForm(false);
            setNewSolicitud({ usuario: '', descripcion: '' });
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
        }
    };

    // Eliminar solicitud
    const handleDelete = async (solicitudId) => {
        try {
            await axios.delete(`http://localhost:8081/api/solicitudes/${solicitudId}`);
            setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== solicitudId)); // Remover del estado
        } catch (error) {
            console.error('Error al eliminar la solicitud:', error);
        }
    };

    // Filtrar solicitudes por factor sanguíneo
    const filteredSolicitudes = solicitudes.filter(solicitud =>
        solicitud.factor_sanguineo.includes(filterFactor)
    );

    if (loading) {
        return <Loading />;
    }

    // Filtrar las solicitudes según el usuario
    const userSolicitudes = solicitudes.filter(solicitud => solicitud.usuario === userId);
    const otherSolicitudes = solicitudes.filter(solicitud => solicitud.usuario !== userId);

    return (
        <>
            {/* Botón para alternar vistas */}
            <div className="my-4">
                <button className="btn btn-primary" onClick={() => setViewUserSolicitudes(false)}>
                    Todas las Solicitudes
                </button>
                <button className="btn btn-secondary" onClick={() => setViewUserSolicitudes(true)}>
                    Mis Solicitudes
                </button>
            </div>

            {/* Botón para crear nueva solicitud */}
            {sesion.length > 0 && (
                sesion.map((sesion) => (
                    <div className="card w-50 my-4" key={sesion.id}>
                        {sesion.user_type !== 1 && (
                            <button className="btn btn-danger pull-right" onClick={() => setShowForm(true)}>
                                Nueva Solicitud
                            </button>
                        )}
                    </div>
                ))
            )}

            {/* Formulario para nueva solicitud */}
            {showForm && (
                <form onSubmit={handleSubmit} className="my-4">
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

            {/* Filtro por factor sanguíneo */}
            <div className="form-group">
                <label>Filtrar por Factor Sanguíneo</label>
                <select className="form-control" value={filterFactor} onChange={(e) => setFilterFactor(e.target.value)}>
                    <option value="">Todos</option>
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

            {/* Mostrar solicitudes filtradas */}
            <div className="my-4">
                {viewUserSolicitudes ? (
                    userSolicitudes.length > 0 ? (
                        userSolicitudes.map((solicitud) => (
                            <div className="card w-50 my-4" key={solicitud.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{solicitud.nombre} {solicitud.apellido}</h5>
                                    <p className="card-text">Descripción: {solicitud.descripcion}</p>
                                    <button className="btn btn-danger" onClick={() => handleDelete(solicitud.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tienes solicitudes</p>
                    )
                ) : (
                    filteredSolicitudes.length > 0 ? (
                        otherSolicitudes.map((solicitud) => (
                            <div className="card w-50 my-4" key={solicitud.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{solicitud.nombre} {solicitud.apellido}</h5>
                                    <p className="card-text">Email: {solicitud.correo_electronico}</p>
                                    <p className="card-text">Provincia: {solicitud.provincia}</p>
                                    <p className="card-text">Ciudad: {solicitud.ciudad}</p>
                                    <p className="card-text">Factor Sanguíneo: {solicitud.factor_sanguineo}</p>
                                    <p className="card-text">Descripción: {solicitud.descripcion}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay solicitudes disponibles</p>
                    )
                )}
            </div>
        </>
    );
};
