import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserList from './pages/UserList';
import EditUser from './pages/EditUser';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de incluir los estilos de Bootstrap

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Mi App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Sign In</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit/:id" element={<EditUser />} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
