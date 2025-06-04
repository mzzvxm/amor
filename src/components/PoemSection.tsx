
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const PoemSection = () => {
  const [currentStanza, setCurrentStanza] = useState(0);
  const [showNext, setShowNext] = useState(false);

  const stanzas = [
    "queria que meus olhos fossem capazes de fotografar",
    "capturar com precisão desumana o momento sublime\nem que minha alma se entrelaça com a tua",
    "quero beber da tua boca\nsorver cada gota de tua essência\ne deixar que o mundo desmorone ao redor"
  ];

  useEffect(() => {
    if (currentStanza < stanzas.length - 1) {
      const timer = setTimeout(() => setShowNext(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStanza, stanzas.length]);

  const nextStanza = () => {
    if (currentStanza < stanzas.length - 1) {
      setCurrentStanza(prev => prev + 1);
      setShowNext(false);
    }
  };

  return (
    <div className="glass-effect rounded-xl p-12 text-center min-h-[300px] flex flex-col justify-center">
      <div className="space-y-8">
        {stanzas.slice(0, currentStanza + 1).map((stanza, index) => (
          <div
            key={index}
            className={`text-2xl md:text-3xl font-light leading-relaxed text-shadow animate-fadeInUp ${
              index === currentStanza ? 'text-white' : 'text-gray-400'
            }`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            {stanza.split('\n').map((line, lineIndex) => (
              <div key={lineIndex} className="mb-2">
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {showNext && currentStanza < stanzas.length - 1 && (
        <button
          onClick={nextStanza}
          className="mt-8 mx-auto flex items-center gap-2 text-blood-red-400 hover:text-blood-red-300 transition-colors animate-fadeInUp"
        >
          <span>Continue...</span>
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default PoemSection;
