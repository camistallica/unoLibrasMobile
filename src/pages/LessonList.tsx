// src/pages/LessonList.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import bearIcon from '../assets/bear-icon.png';

// Tipo para os dados da lição
interface Lesson {
  id: string;
  titulo: string;
  descricao: string;
  videoUrl: string;
  ordem?: number;
}

// Tipo para os dados da categoria
interface Category {
  titulo: string;
  [key: string]: unknown;
}

// Props do componente LessonItem
interface LessonItemProps extends Lesson {
  categoryId: string;
}

// Função para extrair o ID do vídeo do YouTube
const getYouTubeIdFromUrl = (url: string): string | null => {
  if (!url) return null;
  let videoId: string | null = null;

  try {
    const urlObj = new URL(url);
    videoId = urlObj.searchParams.get('v');
    if (!videoId) {
      videoId = urlObj.pathname.split('/').pop() || null;
    }
  } catch (e) {
    console.error("URL inválida, não foi possível extrair o ID:", url, e);
    return null;
  }

  return videoId && videoId.length === 11 ? videoId : null;
};

const LessonItem: React.FC<LessonItemProps> = ({ id, categoryId, titulo, descricao, videoUrl }) => {
  const isCompleted = false;

  const videoId = getYouTubeIdFromUrl(videoUrl);
  const thumbnailUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : bearIcon;

  return (
    <Link
      to={`/categoria/${categoryId}/licao/${id}`}
      className="bg-brand-yellow p-4 rounded-xl shadow-md flex items-center gap-5 transform hover:scale-105 transition-transform duration-300"
    >
      <img
        src={thumbnailUrl}
        alt={`Miniatura da lição ${titulo}`}
        className="w-32 h-20 object-cover bg-black text-white text-xs flex items-center justify-center rounded-lg shadow-md"
        onError={(e) => {
          e.currentTarget.src = bearIcon;
        }}
      />

      <div className="flex-1 text-white">
        <h4 className="font-bold text-lg">{titulo}</h4>
        <p className="text-sm">{descricao}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg text-sm">
          Começar
        </div>
        <div className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-green-400' : 'bg-gray-600'}`} />
      </div>
    </Link>
  );
};

const LessonList: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (!categoryId) return;

        const categoryDocRef = doc(db, "categorias", categoryId);
        const categoryDocSnap = await getDoc(categoryDocRef);
        if (categoryDocSnap.exists()) {
          setCategory(categoryDocSnap.data() as Category);
        }

        const lessonsColRef = collection(db, "categorias", categoryId, "licoes");
        const q = query(lessonsColRef, orderBy("ordem"));
        const lessonsSnapshot = await getDocs(q);

        const lessonsData: Lesson[] = lessonsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Lesson, 'id'>),
        }));
        setLessons(lessonsData);
      } catch (error) {
        console.error("Erro ao buscar lições: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [categoryId]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-10 text-xl">Carregando lições...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/sinais" className="text-brand-yellow hover:opacity-80">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <h1 className="text-4xl font-bold text-brand-dark">{category?.titulo || 'Lições'}</h1>
        </div>

        <main className="flex flex-col gap-6">
          {lessons.map((lesson) => (
            <LessonItem key={lesson.id} categoryId={categoryId!} {...lesson} />
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default LessonList;
