import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';

export const UsuariosView = ({ id, user_type }) => {
    const [usuarios, setUsuarios] = useState([]);
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

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <>
        <h2>
            {user_type === 1 ? 'Receptores disponibles' : 'Donantes disponibles'}
        </h2>
            {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                    <div className="card w-50 my-4" key={usuario.id}>
                        <div className="card-body">
                            <h5 className="card-title">{usuario.nombre} {usuario.apellido}</h5>
                            <p className="card-text">{usuario.correo_electronico}</p>
                            <p className="card-text">{usuario.provincia}</p>
                            <p className="card-text">{usuario.ciudad}</p>
                            <p className="card-text">{usuario.factor_sanguineo}</p>
                            <button className="btn btn-danger">Enviar mensaje</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay usuarios compatibles</p>
            )}
        </>
    );
};
