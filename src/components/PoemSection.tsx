
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const PoemSection = () => {
  const [currentStanza, setCurrentStanza] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const stanzas = [
    "sinto um fervor subir do peito quando penso em ti\ne não desses que queimam e somem\nmas um que se espalha devargarinho",
    "do coração até a ponta dos dedos\ncomo se teu nome tivesse acendido uma estrela dentro de mim\ne transformasse cada célula do meu corpo",
    "num altar aceso\nsó pra te receber\nvocê é um feitiço bordado a mão",
    "o universo te costurou do avesso do tempo\nsó pra caber no meu destino\nvocê é mística",
    "te amar é ter a alma lavada toda vez que seus olhos\n(seus olhos que são só teus)\nse debruçam sobre mim",
    "e fazem o mundo desaparecer\nsomos nós dois\nsempre."
  ];

  useEffect(() => {
    if (currentStanza < stanzas.length - 1) {
      const timer = setTimeout(() => setShowNext(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStanza, stanzas.length]);

  const nextStanza = () => {
    if (currentStanza < stanzas.length - 1) {
      setCurrentStanza(prev => prev + 1);
      setShowNext(false);
    }
  };

  const startPoem = () => {
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    setCurrentStanza(0);
    setShowNext(false);
  };

  if (!isFullscreen) {
    return (
      <div className="glass-effect rounded-xl p-12 text-center min-h-[300px] flex flex-col justify-center">
        <h2 className="text-3xl font-light mb-8 text-white">Para Você</h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Um poema especial escrito do coração
        </p>
        <button
          onClick={startPoem}
          className="mx-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Ler o Poema
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-lg flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <div className="space-y-12">
          {stanzas.slice(0, currentStanza + 1).map((stanza, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                index === currentStanza 
                  ? 'text-white opacity-100 transform translate-y-0' 
                  : 'text-gray-400 opacity-60 transform -translate-y-4'
              }`}
              style={{ 
                animationDelay: `${index * 0.3}s`,
                filter: index < currentStanza ? 'blur(1px)' : 'none'
              }}
            >
              <div className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
                {stanza.split('\n').map((line, lineIndex) => (
                  <div 
                    key={lineIndex} 
                    className={`mb-3 ${line.includes('(seus olhos') ? 'text-amber-300 italic text-lg' : ''}`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {showNext && currentStanza < stanzas.length - 1 && (
          <button
            onClick={nextStanza}
            className="mt-12 flex items-center gap-3 mx-auto text-purple-300 hover:text-purple-200 transition-colors animate-fadeInUp group"
          >
            <span className="text-lg">Continue...</span>
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {currentStanza === stanzas.length - 1 && (
          <button
            onClick={exitFullscreen}
            className="mt-12 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 animate-fadeInUp"
          >
            Voltar
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
