import React, { useState } from 'react';
import Layout from '../components/Layout';

// Define o tipo de cada pergunta
interface PracticeQuestion {
  id: number;
  videoPlaceholder: string;
  options: string[];
  correctAnswer: string;
}

// Dados de exemplo para a prática
const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    videoPlaceholder: 'Vídeo do sinal "Olá"',
    options: ['Olá', 'Obrigado'],
    correctAnswer: 'Olá',
  },
  {
    id: 2,
    videoPlaceholder: 'Vídeo do sinal "Tudo bem?"',
    options: ['Com licença', 'Tudo bem?'],
    correctAnswer: 'Tudo bem?',
  },
  {
    id: 3,
    videoPlaceholder: 'Vídeo do sinal "De nada"',
    options: ['De nada', 'Por favor'],
    correctAnswer: 'De nada',
  },
];

const Praticar: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const currentQuestion = practiceQuestions[currentQuestionIndex];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;

  // Função chamada quando o usuário clica em uma das opções
  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setUserAnswer(answer);
    setShowFeedback(true);
  };

  // Função para ir para a próxima pergunta
  const handleNext = () => {
    setShowFeedback(false);
    setUserAnswer(null);
    const nextIndex = (currentQuestionIndex + 1) % practiceQuestions.length;
    setCurrentQuestionIndex(nextIndex);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <h1 className="text-5xl font-bold text-brand-dark mb-8">Praticar</h1>

        {/* 1. Player de Vídeo (Placeholder) */}
        <div className="w-full aspect-video bg-gray-800 rounded-2xl shadow-lg flex justify-center items-center mb-8">
          <span className="text-white text-2xl font-semibold">{currentQuestion.videoPlaceholder}</span>
        </div>

        {/* 2. Opções de Resposta */}
        {!showFeedback && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full bg-white text-brand-dark font-bold text-xl py-4 px-6 rounded-xl shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* 3. Feedback e Botão "Próximo" */}
        {showFeedback && (
          <div
            className={`p-6 rounded-2xl text-center transition-all duration-300 ${
              isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
            }`}
          >
            <h2 className={`text-3xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Você acertou!' : 'Resposta Incorreta!'}
            </h2>
            <p className="text-lg mt-1 mb-6">
              A resposta certa é: <span className="font-bold">{currentQuestion.correctAnswer}</span>
            </p>
            <button
              onClick={handleNext}
              className="w-full md:w-auto bg-brand-yellow text-white font-bold text-xl py-3 px-10 rounded-xl shadow-lg hover:opacity-90 transition-opacity"
            >
              Próximo
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Praticar;
