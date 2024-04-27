//Importaciones
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Estado inicial del componente
function SignUp() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    errors: {}
  });

//Maneja los cambios en los formularios
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

//Validar los datos del campo, antes de ser enviados
  const validate = () => {
    let errors = {};
    if (!userData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!userData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!userData.password) {
      errors.password = 'Password is required';
    } else if (userData.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }

    setUserData(prevState => ({
      ...prevState,
      errors: errors
    }));

    return Object.keys(errors).length === 0;
  };

//Manejar el Envío del Formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('Submitting data:', userData);
      toast.success('Registration successful!');
    } else {
      toast.error('Check your form for errors.');
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <form onSubmit={handleSubmit} className="container mt-5">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className="form-control" name="username" value={userData.username} onChange={handleChange} />
          {userData.errors.username && <div className="alert alert-danger">{userData.errors.username}</div>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} />
          {userData.errors.email && <div className="alert alert-danger">{userData.errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" name="password" value={userData.password} onChange={handleChange} />
          {userData.errors.password && <div className="alert alert-danger">{userData.errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </>
  );
}

export default SignUp;
