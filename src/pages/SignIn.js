import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Importación de estilos para las alertas

function SignIn() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate(); // Hook de React Router para la navegación programática

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            // Solicitud GET para iniciar sesión (ajusta la URL según tu configuración)
            const response = await axios.get(`http://localhost/sistema-registro/api/index.php?username=${encodeURIComponent(credentials.username)}&password=${encodeURIComponent(credentials.password)}`);
            if (response.data.message) {
                if (response.data.message.includes("Successful")) {
                    toast.success(response.data.message); // Muestra una notificación de éxito
                    navigate('/users'); // Redirige al usuario a la página de lista de usuarios
                } else {
                    toast.error(response.data.message); // Muestra una notificación de error
                }
            } else {
                toast.error("No response message received."); // Gestión de no recibir mensaje
            }
        } catch (error) {
            toast.error('Login failed due to network or server error.'); // Gestión de errores de red o servidor
            console.error('Login error:', error);
        }
    };

    // Estructura del formulario de inicio de sesión
    return (
        <div className="container mt-4">
            <ToastContainer position="top-center" autoClose={5000} />
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={credentials.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
