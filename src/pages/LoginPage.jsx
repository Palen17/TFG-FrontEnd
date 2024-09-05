import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo_electronico: email, contraseña: password }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                setMessage('Login exitoso');
                // Aquí puedes redirigir a otra página 
                navigate('/usuario')
                window.location.reload();

            } else {
                setMessage('Credenciales incorrectas');
            }
        } catch (error) {
            setMessage('Error al intentar iniciar sesión');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
            <br />
            <div className="position-absolute top-30 start-20">
                No tienes cuenta? <a href="http://localhost:5173/register">Registrate</a>
            </div>
        </div>
    );
}