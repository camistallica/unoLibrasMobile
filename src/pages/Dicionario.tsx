import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

// Type guard para identificar erro do Axios com resposta
// Type guard para identificar erro do Axios com resposta
function isAxiosError(error: unknown): error is { response: { status: number } } {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error
    ) {
      const response = (error as { response?: unknown }).response;
      if (
        typeof response === 'object' &&
        response !== null &&
        'status' in response &&
        typeof (response as { status?: unknown }).status === 'number'
      ) {
        return true;
      }
    }
    return false;
  }
  
  

const DicionarioSinais: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError('Por favor, digite uma palavra para buscar.');
      return;
    }

    setLoading(true);
    setError('');
    setVideoUrl(null);

    try {
      const response = await axios.get<{ videoUrl: string }>(
        `http://localhost:5000/api/search?keyword=${keyword}`
      );
      setVideoUrl(response.data.videoUrl);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response.status === 404) {
          setError('Nenhum vídeo foi encontrado com essa palavra. Tente outra!');
        } else {
          setError('Ocorreu um erro ao conectar com o servidor. Tente novamente mais tarde.');
        }
      } else {
        setError('Ocorreu um erro ao conectar com o servidor. Tente novamente mais tarde.');
      }
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="App w-full mx-auto">
        <header className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            Explorador de sinais
          </h1>
          <p className="text-gray-500 text-center mt-2 mb-6">
            Se atente ao digitar, verifique se a pontuação está correta e a forma de escrever também.
          </p>

          <div className="search-container flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSearch()}
              placeholder="Digite uma tag (ex: cachorro, praia...)"
              disabled={loading}
              className="flex-grow w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 disabled:opacity-60"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-yellow-200 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Buscando...
                </div>
              ) : (
                'Buscar'
              )}
            </button>
          </div>

          {error && (
            <p className="error-message text-red-600 mt-4 text-center bg-red-100 p-3 rounded-lg">
              {error}
            </p>
          )}

          {videoUrl && (
            <div className="video-container mt-8 w-full bg-black rounded-lg overflow-hidden shadow-inner aspect-video">
              <video controls autoPlay muted key={videoUrl} className="w-full h-full object-cover">
                <source src={videoUrl} type="video/mp4" />
                Seu navegador não suporta o player de vídeo.
              </video>
            </div>
          )}
        </header>
      </div>
    </Layout>
  );
};

export default DicionarioSinais;
