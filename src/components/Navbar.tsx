// src/components/Navbar.tsx
import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        UnoLibras
      </Link>

      <div className="navbar-links">
        <NavLink to="/home" className="nav-link" activeClassName="nav-link-active">
          Home
        </NavLink>
        <NavLink to="/sinais" className="nav-link" activeClassName="nav-link-active">
          Explorar
        </NavLink>
        <NavLink to="/alfabeto" className="nav-link" activeClassName="nav-link-active">
          Alfabeto
        </NavLink>
        <NavLink to="/praticar" className="nav-link" activeClassName="nav-link-active">
          Praticar
        </NavLink>
        <NavLink to="/dicionario" className="nav-link" activeClassName="nav-link-active">
          Dicionário
        </NavLink>
      </div>

      <div className="navbar-user">
        <Link to="/profile">
          <img
            src={currentUser?.photoURL || '/src/assets/usuario.png'}
            alt="Perfil"
            className="navbar-user-avatar"
          />
        </Link>
        <button onClick={handleLogout} className="navbar-logout-button" title="Sair">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;