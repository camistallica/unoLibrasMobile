// src/pages/Alfabeto.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import imagemAlfabeto from '../assets/imagemAlfabeto.jpg'; // Certifique-se que este caminho está correto

const Alfabeto: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        
        <h1 className="text-5xl font-bold text-brand-dark mb-4">
          Alfabeto em Libras
        </h1>

        <p className="text-lg text-gray-700 mb-12">
          Bem-vindo à seção do alfabeto! Aqui você encontrará uma imagem completa com todas as letras do alfabeto manual em Libras para praticar e consultar.
        </p>

        {/* Container da Imagem */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex justify-center items-center">
          <img 
            src={imagemAlfabeto}
            alt="Alfabeto completo em Libras"
            className="w-full h-auto rounded-lg object-contain cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal de Imagem em Tela Cheia */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors"
            title="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <img 
            src={imagemAlfabeto} 
            alt="Alfabeto completo em Libras - Visualização em tela cheia"
            onClick={(e: React.MouseEvent<HTMLImageElement>) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </Layout>
  );
};

export default Alfabeto;
