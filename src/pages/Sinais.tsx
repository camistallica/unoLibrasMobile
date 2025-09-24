// src/pages/Sinais.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';

import cotidianoImage from '../assets/Bear-sinais.png';
import saudacoesImage from '../assets/Bear-star.png';
import geografiaImage from '../assets/Bear-frases.png';
import adjetivosImage from '../assets/Bear-join.png';
import profissoesImage from '../assets/Bear-cumprimentos.png';
import locaisImage from '../assets/Bear-family.png';
import defaultIcon from '../assets/bear-icon.png';
import animalsImage from '../assets/bear-icon.png';
import coresNumerosImage from '../assets/bear-icon.png';
import alimentosImage from '../assets/bear-icon.png';
import frasesIniciaisImage from '../assets/bear-icon.png';

const categoryImages: Record<string, string> = {
  cotidiano: cotidianoImage,
  saudacoes: saudacoesImage,
  geografia: geografiaImage,
  adjetivos: adjetivosImage,
  profissoes: profissoesImage, 
  locais: locaisImage,
  default: defaultIcon,
  animals: animalsImage,
  coresNumeros: coresNumerosImage,
  alimentos: alimentosImage,
  frasesIniciais: frasesIniciaisImage,
};

interface Category {
  id: string;
  titulo: string;
  subtitulo: string;
  totalLicoes: number;
  imageKey: string;
}

const CategoryCard: React.FC<Category> = ({ id, titulo, subtitulo, totalLicoes, imageKey }) => {
  const imageSrc = categoryImages[imageKey] || categoryImages.default;

  return (
    <div className="category-card">
      <img
        src={imageSrc}
        alt={`Ícone da categoria ${titulo}`}
        className="category-card-image"
      />
      <div className="category-card-content">
        <h3 className="category-card-title">{titulo}</h3>
        <p className="category-card-subtitle">{subtitulo}</p>
        <div className="category-card-footer">
          <Link to={`/categoria/${id}`} className="category-card-button">
            Começar
          </Link>
          <span className="category-card-progress">{`0/${totalLicoes} feito`}</span>
        </div>
      </div>
    </div>
  );
};

const Sinais: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categorias"));
        const categoriesData: Category[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, 'id'>),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao buscar categorias: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <Layout><div>Carregando categorias...</div></Layout>;
  }

  return (
    <Layout>
      <div>
        <h1 className="page-title">Explorar Sinais</h1>
        <main className="category-grid">
          {categories.map(cat => <CategoryCard key={cat.id} {...cat} />)}
        </main>
      </div>
    </Layout>
  );
};

export default Sinais;