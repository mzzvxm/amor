
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const PoemSection = () => {
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'poem'>('welcome');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const welcomeLines = [
    "oi meu amor",
    "hoje é dia 12",
    "eu fiz esse site pra tentar demonstrar todo o meu amor por você, mesmo que apenas assim seja pouco",
    "eu provavelmente estou na sua frente agora",
    "eu te amo. aproveite um de seus presentes!"
  ];

  const poemLines = [
    "sinto um fervor subir do peito quando penso em ti",
    "e não desses que queimam e somem",
    "mas um que se espalha devargarinho",
    "do coração até a ponta dos dedos",
    "como se teu nome tivesse acendido uma estrela dentro de mim",
    "e transformasse cada célula do meu corpo",
    "num altar aceso",
    "só pra te receber",
    "você é um feitiço bordado a mão",
    "o universo te costurou do avesso do tempo",
    "só pra caber no meu destino",
    "você é mística",
    "te amar é ter a alma lavada toda vez que seus olhos",
    "(seus olhos que são só teus)",
    "se debruçam sobre mim",
    "e fazem o mundo desaparecer",
    "somos nós dois",
    "sempre."
  ];

  const getCurrentLines = () => {
    return currentPhase === 'welcome' ? welcomeLines : poemLines;
  };

  const getCurrentLine = () => {
    const lines = getCurrentLines();
    return lines[currentLineIndex] || '';
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const lines = getCurrentLines();
    if (currentLineIndex < lines.length) {
      const timer = setTimeout(() => setShowNext(true), 3000);
      return () => clearTimeout(timer);
    } else if (currentPhase === 'welcome') {
      // Passou por todas as linhas de boas-vindas, vai para o poema
      const timer = setTimeout(() => {
        setCurrentPhase('poem');
        setCurrentLineIndex(0);
        setShowNext(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Terminou o poema
      setIsComplete(true);
    }
  }, [currentLineIndex, currentPhase, isFullscreen]);

  const nextLine = () => {
    const lines = getCurrentLines();
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
      setShowNext(false);
    }
  };

  const startExperience = () => {
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    setCurrentPhase('welcome');
    setCurrentLineIndex(0);
    setShowNext(false);
    setIsComplete(false);
  };

  if (!isFullscreen) {
    return (
      <div className="glass-effect rounded-xl p-12 text-center min-h-[300px] flex flex-col justify-center">
        <h2 className="text-3xl font-light mb-8 text-white">Para Você</h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Uma experiência especial criada com amor
        </p>
        <button
          onClick={startExperience}
          className="mx-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Começar
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 backdrop-blur-lg flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <div className="min-h-[200px] flex items-center justify-center">
          <div
            className="transition-all duration-1000 text-white opacity-100 transform translate-y-0"
            key={`${currentPhase}-${currentLineIndex}`}
          >
            <div className={`leading-relaxed ${
              currentPhase === 'welcome' 
                ? 'text-2xl md:text-3xl lg:text-4xl font-light' 
                : 'text-xl md:text-2xl lg:text-3xl font-light'
            } ${
              getCurrentLine().includes('(seus olhos') 
                ? 'text-amber-300 italic text-lg' 
                : ''
            }`}>
              {getCurrentLine()}
            </div>
          </div>
        </div>
        
        {showNext && !isComplete && (
          <button
            onClick={nextLine}
            className="mt-12 flex items-center gap-3 mx-auto text-purple-300 hover:text-purple-200 transition-colors animate-fadeInUp group"
          >
            <span className="text-lg">Continue...</span>
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {isComplete && (
          <button
            onClick={exitFullscreen}
            className="mt-12 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 animate-fadeInUp"
          >
            Continuar para o site
          </button>
        )}
      </div>

      <button
        onClick={exitFullscreen}
        className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors text-xl"
      >
        ✕
      </button>
    </div>
  );
};

export default PoemSection;
