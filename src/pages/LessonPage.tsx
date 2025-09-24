// src/pages/LessonPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';

// Tipagem para os dados da lição
interface Lesson {
  titulo: string;
  descricao: string;
  videoUrl?: string;
}

// Função para gerar URL de embed do YouTube
const getYouTubeEmbedUrl = (url: string | undefined): string => {
  if (!url) return '';

  try {
    const urlObj = new URL(url);
    let videoId = urlObj.searchParams.get('v'); // Links "...watch?v=VIDEO_ID"

    if (!videoId) {
      // Links curtos ou embed
      videoId = urlObj.pathname.split('/').pop() || '';
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (error) {
    console.error('Erro ao processar a URL do vídeo:', error);
    return '';
  }

  console.error('Não foi possível extrair um ID de vídeo válido da URL:', url);
  return '';
};

const LessonPage: React.FC = () => {
  const { categoryId, lessonId } = useParams<{ categoryId: string; lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (!categoryId || !lessonId) return;

        const lessonDocRef = doc(db, 'categorias', categoryId, 'licoes', lessonId);
        const docSnap = await getDoc(lessonDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          setLesson({
            titulo: data.titulo,
            descricao: data.descricao,
            videoUrl: data.videoUrl,
          });
        } else {
          console.log('Nenhuma lição encontrada!');
        }
      } catch (error) {
        console.error('Erro ao buscar a lição: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [categoryId, lessonId]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-10 text-xl">Carregando lição...</div>
      </Layout>
    );
  }

  if (!lesson) {
    return (
      <Layout>
        <div className="text-center mt-10 text-xl">Lição não encontrada.</div>
      </Layout>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/categoria/${categoryId}`} className="text-brand-yellow hover:opacity-80">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 
                   3.293a1 1 0 01-1.414 1.414l-4-4a1 1 
                   0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <h1 className="text-4xl font-bold text-brand-dark">{lesson.titulo}</h1>
        </div>

        <main>
          <div
            className="relative mb-6 shadow-lg bg-black rounded-lg overflow-hidden"
            style={{ paddingTop: '56.25%' }}
          >
            {embedUrl ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={embedUrl}
                title={lesson.titulo || 'Player de Vídeo'}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <p className="text-white text-center p-4">
                  URL do vídeo inválida ou não foi possível processá-la.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Descrição</h2>
            <p className="text-gray-700 leading-relaxed">{lesson.descricao}</p>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default LessonPage;
