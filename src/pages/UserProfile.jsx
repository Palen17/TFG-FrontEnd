import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UserProfile = ({ id }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/usuarios/${id}`);
                setUsuario(response.data[0]);  // Tomar el primer elemento de la respuesta
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos del usuario');
                setLoading(false);
            }
        };

        if (id) {
            fetchUsuario();
        }
    }, [id]);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>{error}</p>;

    if (!usuario) return <p>No se encontró el usuario.</p>;

    // Lógica para mostrar el tipo de usuario
    const userType = usuario.user_type === 1 ? "Donante" : "Receptor";

    return (
        <div className="card w-50 my-4">
            <div className="card-body">
                <h5 className="card-title">Perfil de Usuario</h5>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Apellido:</strong> {usuario.apellido}</p>
                <p><strong>Email:</strong> {usuario.correo_electronico}</p>
                <p><strong>DNI:</strong> {usuario.dni}</p>
                <p><strong>Género:</strong> {usuario.genero}</p>
                <p><strong>Fecha de Nacimiento:</strong> {new Date(usuario.fecha_nacimiento).toLocaleDateString()}</p>
                <p><strong>Peso:</strong> {usuario.peso} kg</p>
                <p><strong>Provincia:</strong> {usuario.provincia}</p>
                <p><strong>Ciudad:</strong> {usuario.ciudad}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                <p><strong>Factor Sanguíneo:</strong> {usuario.factor_sanguineo}</p>
                <p><strong>Tipo de Usuario:</strong> {userType}</p>
            </div>
        </div>
    );
};
