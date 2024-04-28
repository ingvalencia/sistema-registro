import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
    const [user, setUser] = useState({ username: '', email: '' });
    const { id } = useParams(); // Obtener el ID del URL
    const navigate = useNavigate();

    useEffect(() => {
        // Función para cargar los datos del usuario a editar
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost/sistema-registro/api/user.php?id=${id}`);
                setUser(response.data); // Suponiendo que la respuesta contiene los campos del usuario
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost/sistema-registro/api/update_user.php`, JSON.stringify(user), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.message === 'User updated successfully.') {
                navigate('/users');
            } else {
                alert('Update failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Update failed: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditUser;
