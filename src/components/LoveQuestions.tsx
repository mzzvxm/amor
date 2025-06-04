
import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const LoveQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      question: "O que mais me encanta em você?",
      answer: "Sua capacidade de fazer meu mundo parecer mais colorido apenas com seu sorriso."
    },
    {
      question: "Qual é o nosso momento mais especial?",
      answer: "Cada momento ao seu lado se torna especial, mas aquele primeiro olhar que trocamos ficará para sempre gravado em meu coração."
    },
    {
      question: "Como você mudou minha vida?",
      answer: "Você trouxe luz onde havia escuridão, trouxe amor onde havia vazio, e me mostrou que a vida pode ser ainda mais bela."
    },
    {
      question: "O que quero para nosso futuro?",
      answer: "Quero construir uma história ainda mais bonita ao seu lado, cheia de amor, cumplicidade e momentos inesquecíveis."
    }
  ];

  const nextQuestion = () => {
    setShowAnswer(false);
    setTimeout(() => {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 300);
  };

  return (
    <div className="glass-effect rounded-xl p-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-8">
        <MessageCircle className="text-blood-red-500" size={24} />
        <h2 className="text-3xl font-bold text-shadow">Perguntas do Coração</h2>
      </div>

      <div className="space-y-6">
        <div className="text-xl md:text-2xl font-medium text-gray-200 animate-fadeInUp">
          {questions[currentQuestion].question}
        </div>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-blood-red-600 hover:bg-blood-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <Heart size={20} className="fill-current" />
            Revelar resposta
          </button>
        ) : (
          <div className="space-y-6">
            <div className="text-lg text-gray-300 italic animate-fadeInUp leading-relaxed">
              "{questions[currentQuestion].answer}"
            </div>
            <button
              onClick={nextQuestion}
              className="bg-transparent border border-blood-red-500 text-blood-red-400 hover:bg-blood-red-500 hover:text-white px-6 py-3 rounded-lg transition-colors"
            >
              Próxima pergunta
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveQuestions;
