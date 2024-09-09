import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';

export const ContactoView = ({ id }) => {
    const [pendientes, setPendientes] = useState([]);
    const [aceptadas, setAceptadas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSolicitudes = async () => {
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

        fetchSolicitudes();
    }, [id]);

    const handleAceptar = async (solicitudId) => {
        try {
            console.log(id);
            
            await axios.put(`http://localhost:8081/api/contactos/${solicitudId}`, { estado: 2 });
            setPendientes(pendientes.filter(s => s.id !== solicitudId));  // Remover de pendientes
        } catch (error) {
            console.error('Error al aceptar la solicitud:', error);
        }
    };

    const handleRechazar = async (solicitudId) => {
        try {
            await axios.put(`http://localhost:8081/api/contactos/${solicitudId}`, { estado: 3 });
            setPendientes(pendientes.filter(s => s.id !== solicitudId));  // Remover de pendientes
        } catch (error) {
            console.error('Error al rechazar la solicitud:', error);
        }
    };

    const handleEnviarWhatsapp = async (telefono) => {
        try {
            const response = await axios.post(`http://localhost:8081/api/contactos/whatsapp`, {
                telefono: telefono, 
            });
            window.open(response.data);  // Abrir enlace de WhatsApp
        } catch (error) {
            console.error('Error al enviar mensaje de WhatsApp:', error);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="card w-50 my-4 ">
            {/* Vista de solicitudes pendientes */}
            <h2>Solicitudes Pendientes</h2>
            {pendientes.length > 0 ? (
                pendientes.map(solicitud => (
                    <div className="card w-50 my-4" key={solicitud.id}>
                        <div className="card-body">
                            <h5 className="card-title">{solicitud.nombre} {solicitud.apellido}</h5>
                            <p className="card-text">Email: {solicitud.correo_electronico}</p>
                            <p className="card-text">Factor Sanguineo: {solicitud.factor_sanguineo}</p>
                            <button className="btn btn-success" onClick={() => handleAceptar(solicitud.id)}>Aceptar</button>
                            <button className="btn btn-danger" onClick={() => handleRechazar(solicitud.id)}>Rechazar</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay solicitudes pendientes</p>
            )}

            {/* Vista de solicitudes aceptadas */}
            <h2>Solicitudes Aceptadas</h2>
            {aceptadas.length > 0 ? (
                aceptadas.map(solicitud => (
                    <div className="card w-50 my-4" key={solicitud.id}>
                        <div className="card-body">
                            <h5 className="card-title">{solicitud.nombre} {solicitud.apellido}</h5>
                            <p className="card-text">Email: {solicitud.correo_electronico}</p>
                            <p className="card-text">Factor Sanguineo: {solicitud.factor_sanguineo}</p>
                            <button className="btn btn-primary" onClick={() => handleEnviarWhatsapp(solicitud.telefono)}>
                                Enviar WhatsApp
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay solicitudes aceptadas</p>
            )}
        </div>
    );
};
