
import { useState, useEffect } from 'react';
import DaysCounter from '../components/DaysCounter';
import PoemSection from '../components/PoemSection';
import MemoriesGallery from '../components/MemoriesGallery';
import SpotifyPlayer from '../components/SpotifyPlayer';
import LoveQuestions from '../components/LoveQuestions';
import FloatingHearts from '../components/FloatingHearts';
import { Heart } from 'lucide-react';

const Index = () => {
  const [poemProgress, setPoemProgress] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [showDaysCounter, setShowDaysCounter] = useState(false);
  const [showLoveQuestions, setShowLoveQuestions] = useState(false);
  const [showMemoriesGallery, setShowMemoriesGallery] = useState(false);
  const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handlePoemProgress = (progress: number) => {
    setPoemProgress(progress);
    
    // Show elements progressively based on poem progress
    if (progress >= 20 && !showHeader) {
      setShowHeader(true);
    }
    if (progress >= 35 && !showDaysCounter) {
      setShowDaysCounter(true);
    }
    if (progress >= 50 && !showLoveQuestions) {
      setShowLoveQuestions(true);
    }
    if (progress >= 70 && !showMemoriesGallery) {
      setShowMemoriesGallery(true);
    }
    if (progress >= 85 && !showSpotifyPlayer) {
      setShowSpotifyPlayer(true);
    }
    if (progress >= 100 && !showFooter) {
      setShowFooter(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Poem Section - Always visible when not complete */}
        {poemProgress < 100 && (
          <section className="max-w-4xl mx-auto mb-16">
            <PoemSection onProgressUpdate={handlePoemProgress} />
          </section>
        )}

        {/* Main Content - Shows progressively */}
        <div className="space-y-16">
          {/* Header */}
          {showHeader && (
            <header className={`text-center py-16 transition-all duration-1000 ${
              showHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Heart className="text-purple-400 animate-pulse-heart fill-current" size={40} />
                <h1 className="text-5xl md:text-7xl font-bold text-shadow bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Para Você
                </h1>
                <Heart className="text-purple-400 animate-pulse-heart fill-current" size={40} />
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Um lugar especial onde guardo todos os momentos, sentimentos e memórias que construímos juntos
              </p>
            </header>
          )}

          {/* Days Counter */}
          {showDaysCounter && (
            <section className={`max-w-md mx-auto transition-all duration-1000 ${
              showDaysCounter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <DaysCounter />
            </section>
          )}

          {/* Love Questions */}
          {showLoveQuestions && (
            <section className={`max-w-3xl mx-auto transition-all duration-1000 ${
              showLoveQuestions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <LoveQuestions />
            </section>
          )}

          {/* Memories Gallery */}
          {showMemoriesGallery && (
            <section className={`max-w-6xl mx-auto transition-all duration-1000 ${
              showMemoriesGallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <MemoriesGallery />
            </section>
          )}

          {/* Spotify Player */}
          {showSpotifyPlayer && (
            <section className={`max-w-2xl mx-auto transition-all duration-1000 ${
              showSpotifyPlayer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <SpotifyPlayer />
            </section>
          )}

          {/* Footer */}
          {showFooter && (
            <footer className={`text-center py-16 transition-all duration-1000 ${
              showFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="text-purple-400 fill-current animate-pulse-heart" size={24} />
                  <Heart className="text-blue-400 fill-current animate-pulse-heart" size={20} />
                  <Heart className="text-purple-400 fill-current animate-pulse-heart" size={24} />
                </div>
                <p className="text-lg text-gray-300 italic">
                  "Em cada batida do meu coração, há uma sílaba do seu nome"
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Feito com muito amor ❤️
                </p>
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
