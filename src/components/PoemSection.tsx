
import { useEffect, useState } from 'react';

interface PoemSectionProps {
  onProgressUpdate?: (progress: number) => void;
}

const PoemSection = ({ onProgressUpdate }: PoemSectionProps) => {
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'poem'>('welcome');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
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

  const getLineDuration = (line: string) => {
    return line.length > 50 ? 5000 : 3000;
  };

  const getTotalLines = () => {
    return welcomeLines.length + poemLines.length;
  };

  const getCurrentProgress = () => {
    const totalWelcomeLines = welcomeLines.length;
    if (currentPhase === 'welcome') {
      return currentLineIndex + 1;
    } else {
      return totalWelcomeLines + currentLineIndex + 1;
    }
  };

  useEffect(() => {
    if (isComplete) return;

    const lines = getCurrentLines();
    const currentLine = getCurrentLine();
    const duration = getLineDuration(currentLine);

    // Notify parent about progress
    if (onProgressUpdate) {
      const progress = getCurrentProgress();
      const total = getTotalLines();
      onProgressUpdate((progress / total) * 100);
    }

    const timer = setTimeout(() => {
      if (currentLineIndex < lines.length - 1) {
        setCurrentLineIndex(prev => prev + 1);
      } else if (currentPhase === 'welcome') {
        // Passou por todas as linhas de boas-vindas, vai para o poema
        setCurrentPhase('poem');
        setCurrentLineIndex(0);
      } else {
        // Terminou o poema
        setIsComplete(true);
        if (onProgressUpdate) {
          onProgressUpdate(100);
        }
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentPhase, isComplete, onProgressUpdate]);

  if (isComplete) {
    return null;
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
      </div>
    </div>
  );
};

export default PoemSection;
