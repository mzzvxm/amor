
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface PoemSectionProps {
  onProgressUpdate?: (progress: number) => void;
}

const PoemSection = ({ onProgressUpdate }: PoemSectionProps) => {
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'poem'>('welcome');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showDaysCounter, setShowDaysCounter] = useState(false);
  const [showEyesPhoto, setShowEyesPhoto] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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

  // Calculate time difference
  useEffect(() => {
    const startDate = new Date('2024-01-03');
    
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const totalMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const totalSeconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setDays(totalDays);
      setHours(totalHours);
      setMinutes(totalMinutes);
      setSeconds(totalSeconds);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

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

  const shouldShowDaysCounter = () => {
    return currentPhase === 'poem' && currentLineIndex >= 8; // Aparece na linha "você é um feitiço..."
  };

  const shouldShowEyesPhoto = () => {
    return currentPhase === 'poem' && (currentLineIndex === 12 || currentLineIndex === 13); // Linhas sobre os olhos
  };

  useEffect(() => {
    if (isComplete) return;

    const lines = getCurrentLines();
    const currentLine = getCurrentLine();
    const duration = getLineDuration(currentLine);

    // Show elements based on progress
    setShowDaysCounter(shouldShowDaysCounter());
    setShowEyesPhoto(shouldShowEyesPhoto());

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
        setCurrentPhase('poem');
        setCurrentLineIndex(0);
      } else {
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 backdrop-blur-lg flex items-center justify-center overflow-hidden">
      {/* Subtle blood-red overlay with animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-blood-red-900/20 via-transparent to-blood-red-900/20 animate-pulse"></div>
      
      {/* Floating hearts with blood-red tones */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            <Heart 
              size={Math.random() * 8 + 4} 
              className="text-blood-red-400 heart-float fill-current"
            />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 w-full px-6 text-center">
        {/* Eyes photo popup */}
        {showEyesPhoto && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-fade-in">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-blood-red-400/30">
              <div className="w-72 h-16 bg-gradient-to-r from-blood-red-900/20 to-purple-900/20 rounded flex items-center justify-center text-blood-red-200 text-sm">
                Foto dos olhos dela (1200x200)
              </div>
            </div>
          </div>
        )}

        {/* Main poem content */}
        <div className="min-h-[200px] flex items-center justify-center">
          <div
            className="transition-all duration-1000 text-white opacity-100 transform translate-y-0"
            key={`${currentPhase}-${currentLineIndex}`}
          >
            <div className={`leading-relaxed ${
              currentPhase === 'welcome' 
                ? 'text-xl md:text-2xl lg:text-3xl font-light' 
                : 'text-lg md:text-xl lg:text-2xl font-light'
            } ${
              getCurrentLine().includes('(seus olhos') 
                ? 'text-blood-red-300 italic text-base' 
                : ''
            } ${
              getCurrentLine().includes('seus olhos')
                ? 'text-blood-red-200'
                : ''
            }`}>
              {getCurrentLine()}
            </div>
          </div>
        </div>

        {/* Days Counter Popup */}
        {showDaysCounter && (
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 z-20 animate-scale-in">
            <div className="bg-black/90 backdrop-blur-lg rounded-xl p-6 border border-blood-red-400/30 shadow-2xl">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={20} />
                <h3 className="text-lg font-bold text-blood-red-200">Estou te amando há</h3>
                <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={20} />
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-blood-red-900/20 rounded-lg p-2">
                  <div className="text-2xl font-bold text-blood-red-300">{days}</div>
                  <div className="text-xs text-blood-red-400">dias</div>
                </div>
                <div className="bg-blood-red-900/20 rounded-lg p-2">
                  <div className="text-2xl font-bold text-blood-red-300">{hours}</div>
                  <div className="text-xs text-blood-red-400">horas</div>
                </div>
                <div className="bg-blood-red-900/20 rounded-lg p-2">
                  <div className="text-2xl font-bold text-blood-red-300">{minutes}</div>
                  <div className="text-xs text-blood-red-400">minutos</div>
                </div>
                <div className="bg-blood-red-900/20 rounded-lg p-2">
                  <div className="text-2xl font-bold text-blood-red-300">{seconds}</div>
                  <div className="text-xs text-blood-red-400">segundos</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemSection;
