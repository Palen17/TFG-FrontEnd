import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';
import { jwtDecode } from 'jwt-decode';

export const ContactoView = () => {
    const [pendientes, setPendientes] = useState([]);
    const [aceptadas, setAceptadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('pendientes'); // Estado para controlar la vista actual

    const fetchSolicitudes = async (id) => {
        try {
            // Obtener las solicitudes pendientes
            const pendientesResponse = await axios.get(`http://localhost:8081/api/contactos/pendientes/${id}`);
            setPendientes(pendientesResponse.data);

            // Obtener las solicitudes aceptadas
            const aceptadasResponse = await axios.get(`http://localhost:8081/api/contactos/aceptadas/${id}`);
            setAceptadas(aceptadasResponse.data);
        } catch (error) {
            console.error('Error al cargar las solicitudes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            fetchSolicitudes(decoded.id);
        }
    }, []);

    const handleAceptar = async (solicitudId) => {
        try {
            await axios.put(`http://localhost:8081/api/contactos/${solicitudId}`, { estado: 2 });
            setPendientes(pendientes.filter(s => s.id !== solicitudId)); // Remover de pendientes
            window.location.reload();
        } catch (error) {
            console.error('Error al aceptar la solicitud:', error);
        }
    };

    const handleRechazar = async (solicitudId) => {
        try {
            await axios.put(`http://localhost:8081/api/contactos/${solicitudId}`, { estado: 3 });
            setPendientes(pendientes.filter(s => s.id !== solicitudId)); // Remover de pendientes
        } catch (error) {
            console.error('Error al rechazar la solicitud:', error);
        }
    };

    const handleEnviarWhatsapp = async (telefono) => {
        try {
            const response = await axios.post(`http://localhost:8081/api/contactos/whatsapp`, {
                telefono: telefono,
            });
            window.open(response.data); // Abrir enlace de WhatsApp
        } catch (error) {
            console.error('Error al enviar mensaje de WhatsApp:', error);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container my-4">
            {/* Botones para cambiar de vista */}
            <div className="d-flex justify-content-center mb-4">
                <button
                    className={`btn ${view === 'pendientes' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
                    onClick={() => setView('pendientes')}
                >
                    Pendientes
                </button>
                <button
                    className={`btn ${view === 'aceptadas' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
                    onClick={() => setView('aceptadas')}
                >
                    Contactos
                </button>
            </div>

            {/* Mostrar solicitudes pendientes o aceptadas según la vista seleccionada */}
            {view === 'pendientes' && (
                <>
                    <h2>Quieren contactar contigo</h2>
                    {pendientes.length > 0 ? (
                        pendientes.map(solicitud => (
                            <div className="card w-50 my-4" key={solicitud.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{solicitud.nombre} {solicitud.apellido}</h5>
                                    <p className="card-text">Email: {solicitud.correo_electronico}</p>
                                    <p className="card-text">Provincia: {solicitud.provincia}</p>
                                    <p className="card-text">Ciudad: {solicitud.ciudad}</p>
                                    <p className="card-text fs-5 text-center w-25 p-3 bg-danger text-white rounded-pill">{solicitud.factor_sanguineo}</p>
                                    <div className='position-absolute bottom-0 end-0'>
                                    <button className="btn btn-primary me-2" onClick={() => handleAceptar(solicitud.id)}>Aceptar</button>
                                    <button className="btn btn-warning" onClick={() => handleRechazar(solicitud.id)}>Rechazar</button>
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay solicitudes pendientes</p>
                    )}
                </>
            )}

            {view === 'aceptadas' && (
                <>
                    <h2>Tus contactos</h2>
                    {aceptadas.length > 0 ? (
                        aceptadas.map(solicitud => (
                            <div className="card w-50 my-4" key={solicitud.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{solicitud.nombre} {solicitud.apellido}</h5>
                                    <p className="card-text">Email: {solicitud.correo_electronico}</p>
                                    <p className="card-text">Provincia: {solicitud.provincia}</p>
                                    <p className="card-text">Ciudad: {solicitud.ciudad}</p>
                                    <p className="fs-5 text-center w-25 p-3 bg-danger text-white rounded-pill">{solicitud.factor_sanguineo}</p>
                                    <button className="btn btn-primary position-absolute bottom-0 end-0" onClick={() => handleEnviarWhatsapp(solicitud.telefono)}>
                                        Enviar WhatsApp
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay solicitudes aceptadas</p>
                    )}
                </>
            )}
        </div>
    );
};
