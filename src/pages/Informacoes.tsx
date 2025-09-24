// src/pages/Informacoes.tsx

import React from 'react';
import Layout from '../components/Layout';

// Tipagem dos ícones como componentes React
const IconAcessibilidade: React.FC = () => (
  <svg
    className="w-12 h-12 mx-auto text-brand-yellow"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 
         20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 
         20H2v-2a3 3 0 015.356-1.857M7 
         20v-2c0-.656.126-1.283.356-1.857m0 
         0a5.002 5.002 0 019.288 0M15 
         7a3 3 0 11-6 0 3 3 0 016 
         0zm6 3a2 2 0 11-4 0 2 2 
         0 014 0zM7 10a2 2 0 11-4 
         0 2 2 0 014 0z"
    />
  </svg>
);

const IconAprendizado: React.FC = () => (
  <svg
    className="w-12 h-12 mx-auto text-brand-yellow"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 
         3v1m6.364 
         1.636l-.707.707M21 
         12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 
         9.9a5 5 0 117.072 0l-.548.547A3.374 
         3.374 0 0014 18.469V19a2 2 0 
         11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const IconComunidade: React.FC = () => (
  <svg
    className="w-12 h-12 mx-auto text-brand-yellow"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const Informacoes: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* --- Seção 1: Nossa Missão --- */}
          <section className="text-center mb-16">
            <h1 className="text-5xl font-bold text-brand-dark mb-4">
              Sobre o Projeto
            </h1>
            <p className="text-xl text-gray-600">
              Nossa missão é quebrar barreiras de comunicação, tornando o
              aprendizado de Libras acessível, divertido e eficaz para todos.
            </p>
          </section>

          {/* --- Seção 2: O Projeto --- */}
          <section className="bg-white p-8 rounded-2xl shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sobre o Projeto
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Este projeto nasceu da necessidade de criar uma ponte entre a
                comunidade ouvinte e a comunidade surda. Acreditamos que a
                comunicação é a base de tudo, e oferecer uma ferramenta que
                ensina a Língua Brasileira de Sinais de forma interativa não
                apenas educa, mas também promove a inclusão e a empatia.
              </p>
              <p>
                No mercado atual, onde a diversidade e a inclusão são cada vez
                mais valorizadas, capacitar pessoas para se comunicarem em
                Libras é um diferencial humano e profissional. Nosso app busca
                preencher essa lacuna com tecnologia e uma abordagem amigável.
              </p>
            </div>
          </section>

          {/* --- Seção 3: Nossos Pilares --- */}
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Nossos Pilares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-4">
                <IconAcessibilidade />
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                  Acessibilidade
                </h3>
                <p className="text-gray-600">
                  Ensino de qualidade ao alcance de todos, em qualquer lugar.
                </p>
              </div>
              <div className="p-4">
                <IconAprendizado />
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                  Aprendizado Divertido
                </h3>
                <p className="text-gray-600">
                  Usamos a gamificação para tornar o processo de aprender leve e
                  cativante.
                </p>
              </div>
              <div className="p-4">
                <IconComunidade />
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                  Impacto Real
                </h3>
                <p className="text-gray-600">
                  Cada sinal aprendido é um passo em direção a uma sociedade
                  mais inclusiva.
                </p>
              </div>
            </div>
          </section>

          {/* --- Seção 4: Quem Somos --- */}
          <section className="bg-white p-8 rounded-2xl shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Quem Somos
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="https://placehold.co/150x150/FBBF24/FFFFFF?text=+."
                alt="Foto do criador do projeto"
                className="w-36 h-36 rounded-full shadow-md"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800"></h3>
                <p className="text-brand-dark font-semibold mb-2">
                  Idealizador e Desenvolvedor
                </p>
                <p className="text-gray-600">
                  Um entusiasta de tecnologia e apaixonado por criar soluções
                  que conectam pessoas e geram impacto social positivo.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Informacoes;
