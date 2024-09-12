import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const SolicitudesView = ({ id }) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [misSolicitudes, setMisSolicitudes] = useState([]);
    const [selectedView, setSelectedView] = useState('all');
    const [filtroFactorSanguineo, setFiltroFactorSanguineo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [sesion, setSesion] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Posibles opciones de factor sanguíneo
    const factoresSanguineos = ['0+', '0-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

   
   
        // Obtener el userType al montar el componente
        const fetchSesion = async (userÏd) => {
            try {
                const response = await axios.get(`http://localhost:8081/api/usuarios/${userÏd}`);
                const response1 = { userType: response.data[0].user_type };
                
                console.log(response1); // Mostrar el valor de response1
                
                setSesion(response1.userType); // Actualizar el estado de sesion
                
                
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            } finally {
                setLoading(false);
            }
        };


    // Monitorear cambios en el estado "sesion"
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded.id); 
            
            fetchSesion(decoded.id);
            fetchSolicutudes(decoded.id)
        }
        if (sesion !== null) {
            console.log('Valor actualizado de sesion:', sesion);
        }
    }, [sesion]);

    

    const fetchSolicutudes = async (userÏd) => {
        try {
            // Traer todas las solicitudes que no son del usuario
        axios.get(`http://localhost:8081/api/solicitudes/getAllSolicitudes/${userÏd}`)
        .then(response => setSolicitudes(response.data))
        .catch(error => console.error(error));
    
    // Traer las solicitudes del usuario en sesión
        axios.get(`http://localhost:8081/api/solicitudes/getMySolicitud/${userÏd}`)
        .then(response => setMisSolicitudes(response.data))
        .catch(error => console.error(error));
            
            
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        setFiltroFactorSanguineo(event.target.value);
    };

    const handleAddSolicitud = () => {
        if (descripcion.trim() === '') return;

        axios.post('http://localhost:8081/api/solicitudes/addSolicitud', { usuario: id, descripcion })
            .then(response => {
                setMisSolicitudes([...misSolicitudes, response.data]);
                setDescripcion(''); // Limpiar el campo de descripción
                window.location.reload()
            })
            .catch(error => console.error(error));
    };

    const filteredSolicitudes = solicitudes.filter(solicitud => 
        !filtroFactorSanguineo || solicitud.factor_sanguineo === filtroFactorSanguineo
    );

    if (loading) return <div>Cargando...</div>;
    

    return (
        <div className="container mt-4">
            <h1>Solicitudes</h1>
            <div className="d-flex justify-content-center mb-3">
                <button 
                    className={`btn ${selectedView === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2`} 
                    onClick={() => setSelectedView('all')}>
                    Todas las Solicitudes
                </button>
                <button 
                    className={`btn ${selectedView === 'mine' ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => setSelectedView('mine')}>
                    Mis Solicitudes
                </button>
            </div>

            {selectedView === 'all' ? (
                <div>
                    <h2>Solicitudes Disponibles</h2>
                    <div className="mb-3">
                        <label>Filtrar por Factor Sanguíneo:</label>
                        <select 
                            className="form-control" 
                            value={filtroFactorSanguineo} 
                            onChange={handleFilterChange}>
                            <option value="">Todos</option>
                            {factoresSanguineos.map(factor => (
                                <option key={factor} value={factor}>{factor}</option>
                            ))}
                        </select>
                    </div>
                    <div className="list-group">
                        {filteredSolicitudes.map(solicitud => (
                            <div key={solicitud.id} className="list-group-item">
                                <h5>{solicitud.nombre} {solicitud.apellido}</h5>
                                <p>{solicitud.descripcion}</p>
                                <p>Factor Sanguíneo: {solicitud.factor_sanguineo}</p>
                                <p>Provincia: {solicitud.provincia}, Ciudad: {solicitud.ciudad}</p>
                                <p>Contacto: {solicitud.correo_electronico}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                
                <div>
                    
                    { sesion === 2 && (
                        <div className="mt-4">
                            <h3>Crear Nueva Solicitud</h3>
                            <div className="mb-3">
                                <label>Descripción</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={descripcion} 
                                    onChange={(e) => setDescripcion(e.target.value)} 
                                    placeholder="Ingrese una descripción"
                                />
                            </div>
                            <button 
                                className="btn btn-success" 
                                onClick={handleAddSolicitud}>
                                Crear Solicitud
                            </button>
                        </div>
                    )}

                    <br />
                    <h2>Mis Solicitudes</h2>
                    <div className="list-group">
                        {misSolicitudes.map(solicitud => (
                            <div key={solicitud.id} className="list-group-item">
                                <h5>{solicitud.nombre} {solicitud.apellido}</h5>
                                <p>{solicitud.solicitud_descripcion}</p>
                                <p>Factor Sanguíneo: {solicitud.factor_sanguineo}</p>
                                <p>Provincia: {solicitud.provincia}, Ciudad: {solicitud.ciudad}</p>
                                <p>Contacto: {solicitud.correo_electronico}</p>
                            </div>
                        ))}
                    </div>
                    
                </div>
            )}
        </div>
    );
};
