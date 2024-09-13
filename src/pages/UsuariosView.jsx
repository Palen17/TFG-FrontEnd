import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';

export const UsuariosView = ({ id }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [sesion, setSesion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/compatible/${id}`);
                setUsuarios(response.data);  // Asumiendo que el backend devuelve los usuarios compatibles.
            } catch (err) {
                setError('Error al cargar los usuarios');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUsuarios();
        }
    }, [id]);

    useEffect(() => {
        // Obtener las solicitudes al montar el componente
        const fetchSesion = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/usuarios/${id}`);
                setSesion(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSesion();
    }, [id]);

    const handleEnviarSolicitud = async (id, usuario) => {
        try {
            const response = await axios.post(`http://localhost:8081/api/contactos`, {
                envia: id, 
                recibe: usuario
            });
           console.log(response);
           window.location.reload();
        } catch (error) {
            console.error('Error al enviar mensaje de WhatsApp:', error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <>
            {sesion.length > 0 ? (
                sesion.map((sesion) => (
                    <div className="card w-50 my-4" key={sesion.id}>
                        <h2>{sesion.user_type === 1 ? 'Receptores disponibles' : 'Donantes disponibles'}</h2>
                    </div>

                ))
            ) : (
                <p> </p>
            )}
            {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                    <div className="card w-50 my-4" key={usuario.id}>
                        <div className="card-body">
                            <h5 className="card-title">{usuario.nombre} {usuario.apellido}</h5>
                            <p className="card-text">{usuario.correo_electronico}</p>
                            <p className="card-text">{usuario.provincia}</p>
                            <p className="card-text">{usuario.ciudad}</p>
                            <p className="card-text fs-5 text-center w-25 p-3 bg-danger text-white rounded-pill">{usuario.factor_sanguineo}</p>
                            <button className="btn btn-primary position-absolute bottom-0 end-0" onClick={() => handleEnviarSolicitud(id, usuario.id)}>Enviar Solicitud</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay usuarios compatibles</p>
            )}
        </>
    );
};
