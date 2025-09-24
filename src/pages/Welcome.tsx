// src/pages/Welcome.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import bearWaving from '../assets/Bear-welcome.png';

const Welcome: React.FC = () => {
  return (
    <div className="auth-container">
      <main className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex justify-center">
            <img id="welcome-bear" src={bearWaving} alt="Urso acenando" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Bem-vindo ao UnoLibras!</h1>
            <p className="text-lg lg:text-xl mb-6 leading-relaxed">
              Como nosso TCC, decidimos criar um site para incentivar as pessoas a aprenderem Libras de modo fácil e gratuito!
            </p>
            <p className="text-lg lg:text-xl mb-8 leading-relaxed">
              Com nosso site você vai ter desafios para testar seus conhecimentos e aprender muito mais! Se interessou? Crie uma conta agora e comece a aprender!
            </p>
            <div className="mt-8">
              <Link to="/signup" className="welcome-button">Criar conta!</Link>
              <p className="mt-4">
                Já tem uma conta?{' '}
                <Link to="/login" className="welcome-login-link">Entre agora!</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;