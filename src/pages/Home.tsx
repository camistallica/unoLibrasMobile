// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import Layout from "../components/Layout";

import bearLifting from "../assets/Bear-training2.png";
import bearIcon from "../assets/Bear-sinais.png";
import bearMagnifyingGlass from "../assets/Bear-lupa.png";
import fogo from "../assets/Fire-icon.png";
import mao from "../assets/hand-black.png";
import estrela from "../assets/estrela.png";

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <div>
        <h1 className="home-title">
          Olá, {currentUser?.displayName || "Usuário"}!
        </h1>

        {/* Pontos */}
        <div className="stats-container">
          <div className="stat-item">
            <img src={estrela} alt="Estrela" className="stat-icon" />
            <p className="stat-label">Pontos</p>
            <p className="stat-value">0</p>
          </div>
          <div className="stat-item">
            <img src={fogo} alt="Fogo" className="stat-icon" />
            <p className="stat-label">Ofensiva</p>
            <p className="stat-value">0</p>
          </div>
          <div className="stat-item">
            <img src={mao} alt="Mão" className="stat-icon" />
            <p className="stat-label">Sinais</p>
            <p className="stat-value">0</p>
          </div>
        </div>

        {/* Saiba mais */}
        <div className="info-banner">
          <p className="info-banner-text">Saiba mais</p>
          <div className="info-buttons">
            <Link to="/informacoes" className="info-button">
              Informações
            </Link>
            <Link to="/alfabeto" className="info-button">
              Alfabeto
            </Link>
          </div>
        </div>

        {/* Navegação principal */}
        <div className="nav-grid">
          <Link to="/praticar" className="nav-card">
            <img src={bearLifting} alt="Praticar" className="nav-card-image" />
            <p className="nav-card-title">Praticar</p>
          </Link>
          <Link to="/sinais" className="nav-card">
            <img src={bearIcon} alt="Sinais" className="nav-card-image" />
            <p className="nav-card-title">Explorar</p>
          </Link>
          <Link to="/dicionario" className="nav-card">
            <img src={bearMagnifyingGlass} alt="Buscar Sinais" className="nav-card-image" />
            <p className="nav-card-title">Dicionário de Sinais</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;