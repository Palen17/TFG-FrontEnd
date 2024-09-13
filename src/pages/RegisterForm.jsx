import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const RegisterForm = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo_electronico: '',
    contraseña: '',
    nombre: '',
    apellido: '',
    dni: '',
    genero: '',
    fecha_nacimiento: '',
    peso: '',
    provincia: '',
    ciudad: '',
    telefono: '',
    factor_sanguineo: '',
    user_type: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  };

  const validarDatosDonante = () => {
    const edad = calcularEdad(form.fecha_nacimiento);
    const peso = parseInt(form.peso);

    if (edad < 18 || edad > 65) {
      setMessage("Los donantes deben tener entre 18 y 65 años.");
      return false;
    }

    if (peso <= 50) {
      setMessage("Los donantes deben pesar más de 50 kg.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si el tipo de usuario es Donante
    if (form.user_type === "1") {
      if (!validarDatosDonante()) {
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:8081/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Usuario registrado exitosamente');
        Swal.fire({
          title: "Registrado Correctamente!",
          text: "Su cuenta ha sido creada",
          icon: "success"
        });
        navigate('/login')
      } else {
        setMessage('Error en el registro');
      }
    } catch (error) {
      setMessage('Error al intentar registrar el usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="correo_electronico" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="correo_electronico"
            name="correo_electronico"
            value={form.correo_electronico}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="contraseña"
            name="contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        {/* Añadir más campos aquí para el resto de la información */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">DNI</label>
          <input
            type="number"
            className="form-control"
            id="dni"
            name="dni"
            value={form.dni}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Genero</label>
          <select 
            className="form-select" 
            id="genero" 
            name="genero" 
            value={form.genero} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Seleccione su genero</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div className="mb-3">
        <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={form.fecha_nacimiento}
          onChange={handleChange}
          className="form-control"
          required
        />
        </div>
        <div className="mb-3">
          <label htmlFor="peso" className="form-label">Peso</label>
          <input
            type="number"
            className="form-control"
            id="peso"
            name="peso"
            value={form.peso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
        <label htmlFor="provincia" className="form-label">Provincia</label>
        <select 
            className="form-select" 
            id="provincia" 
            name="provincia" 
            value={form.provincia} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Selecione una provincia</option>
            <option value="Córdoba">Córdoba</option>
          </select>
        </div>

        <div className="mb-3">
        <label htmlFor="ciudad" className="form-label">Ciudad</label>
        <input
          type="text"
          name="ciudad"
          value={form.ciudad}
          onChange={handleChange}
          className="form-control"
          required
        />
        </div>
        <div className="mb-3">
        <label htmlFor="telefono" className="form-label">Telefono</label>
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          className="form-control"
          required
        />
        </div>

        <div className="mb-3">
          <label htmlFor="factor_sanguineo" className="form-label">Grupo Sanguíneo</label>
          <select 
            className="form-select" 
            id="factor_sanguineo" 
            name="factor_sanguineo" 
            value={form.factor_sanguineo} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Seleccione su grupo sanguíneo</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="0+">0+</option>
            <option value="0-">0-</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="user_type" className="form-label">Soy</label>
          <select 
            className="form-select" 
            id="user_type" 
            name="user_type" 
            value={form.user_type} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Seleccione un tipo de usuario</option>
            <option value="1">Donante</option>
            <option value="2">Requirente</option>
          </select>
        </div>

        <button type="submit" className="btn btn-danger">Registrarse</button>
      </form>
      {message && <div className="mt-3 alert alert-danger" role="alert">{message}</div>}
    </div>
  );
}
