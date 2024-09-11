import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';

export const UserProfile = ({ id }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  // Estado para alternar entre vista y edición
    const [updatedUser, setUpdatedUser] = useState({}); // Estado para los cambios

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/usuarios/${id}`);
                setUsuario(response.data[0]);  // Tomar el primer elemento de la respuesta
                setUpdatedUser(response.data[0]); // Iniciar con los datos actuales
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

    const handleInputChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            // Asegurarse de que el campo 'fecha_nacimiento' esté en formato 'YYYY-MM-DD'
            const formattedUser = {
                ...updatedUser,
                fecha_nacimiento: new Date(updatedUser.fecha_nacimiento).toISOString().split('T')[0], // Formato 'YYYY-MM-DD'
            };
    
            await axios.put(`http://localhost:8081/api/usuarios/${id}`, formattedUser);
            setIsEditing(false); // Salir del modo edición después de guardar
            setUsuario(updatedUser); // Actualizar el estado con los datos guardados
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            setError('Error al guardar los cambios');
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;
    if (!usuario) return <p>No se encontró el usuario.</p>;

    return (
        <div className="card w-50 my-4">
            <div className="card-body">
                <h5 className="card-title">Perfil de Usuario</h5>

                {isEditing ? (
                    <>
                        <p><strong>Nombre:</strong> <input type="text" name="nombre" value={updatedUser.nombre} onChange={handleInputChange} className="form-control" /></p>
                        <p><strong>Apellido:</strong> <input type="text" name="apellido" value={updatedUser.apellido} onChange={handleInputChange} className="form-control" /></p>
                        <p><strong>Email:</strong> <input type="email" name="correo_electronico" value={updatedUser.correo_electronico} onChange={handleInputChange} className="form-control" /></p>
                        <p><strong>DNI:</strong> {usuario.dni}</p> {/* No editable */}
                        <p><strong>Género:</strong> {usuario.genero}</p> {/* No editable */}
                        <p><strong>Fecha de Nacimiento:</strong> {new Date(usuario.fecha_nacimiento).toLocaleDateString()}</p> {/* No editable */}
                        <p><strong>Peso:</strong> <input type="number" name="peso" value={updatedUser.peso} onChange={handleInputChange} className="form-control" /></p>
                        <p><strong>Provincia:</strong> <input type="text" name="provincia" value={updatedUser.provincia} onChange={handleInputChange} className="form-control" /></p>
                        <p><strong>Ciudad:</strong> <input type="text" name="ciudad" value={updatedUser.ciudad} onChange={handleInputChange} className="form-control" /></p>
                        <p><strong>Teléfono:</strong> <input type="tel" name="telefono" value={updatedUser.telefono} onChange={handleInputChange} className="form-control" /></p>
                        <p><strong>Factor Sanguíneo:</strong> {usuario.factor_sanguineo}</p> {/* No editable */}

                        {/* Select para tipo de usuario */}
                        <p><strong>Tipo de Usuario:</strong>
                            <select
                                name="user_type"
                                value={updatedUser.user_type}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value={1}>Donante</option>
                                <option value={2}>Receptor</option>
                            </select>
                        </p>

                        <button className="btn btn-primary" onClick={handleSave}>Guardar Cambios</button>
                        <button className="btn btn-secondary mx-2" onClick={() => setIsEditing(false)}>Cancelar</button>
                    </>
                ) : (
                    <>
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
                        <p><strong>Tipo de Usuario:</strong> {usuario.user_type === 1 ? "Donante" : "Receptor"}</p>

                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Editar Perfil</button>
                    </>
                )}
            </div>
        </div>
    );
};
