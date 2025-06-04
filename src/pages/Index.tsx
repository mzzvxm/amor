
import { useState } from 'react';
import DaysCounter from '../components/DaysCounter';
import PoemSection from '../components/PoemSection';
import MemoriesGallery from '../components/MemoriesGallery';
import SpotifyPlayer from '../components/SpotifyPlayer';
import LoveQuestions from '../components/LoveQuestions';
import FloatingHearts from '../components/FloatingHearts';
import { Heart } from 'lucide-react';

const Index = () => {
  const [poemProgress, setPoemProgress] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);

  const handlePoemProgress = (progress: number) => {
    setPoemProgress(progress);
    
    // Show main content only after poem is complete
    if (progress >= 100 && !showMainContent) {
      setShowMainContent(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-blood-red-950/10 to-black">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Poem Section - Always visible when not complete */}
        {poemProgress < 100 && (
          <section className="w-full">
            <PoemSection onProgressUpdate={handlePoemProgress} />
          </section>
        )}

        {/* Main Content - Shows only after poem is complete */}
        {showMainContent && (
          <div className="space-y-16 animate-fade-in">
            {/* Header */}
            <header className="text-center py-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={40} />
                <h1 className="text-4xl md:text-6xl font-bold text-shadow bg-gradient-to-r from-white via-blood-red-200 to-white bg-clip-text text-transparent">
                  Para Você
                </h1>
                <Heart className="text-blood-red-400 animate-pulse-heart fill-current" size={40} />
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Um lugar especial onde guardo todos os momentos, sentimentos e memórias que construímos juntos
              </p>
            </header>

            {/* Days Counter */}
            <section className="max-w-md mx-auto">
              <DaysCounter />
            </section>

            {/* Love Questions */}
            <section className="max-w-3xl mx-auto">
              <LoveQuestions />
            </section>

            {/* Memories Gallery */}
            <section className="max-w-6xl mx-auto">
              <MemoriesGallery />
            </section>

            {/* Spotify Player */}
            <section className="max-w-2xl mx-auto">
              <SpotifyPlayer />
            </section>

            {/* Footer */}
            <footer className="text-center py-16">
              <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto border border-blood-red-900/20">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="text-blood-red-400 fill-current animate-pulse-heart" size={24} />
                  <Heart className="text-purple-400 fill-current animate-pulse-heart" size={20} />
                  <Heart className="text-blood-red-400 fill-current animate-pulse-heart" size={24} />
                </div>
                <p className="text-lg text-gray-300 italic">
                  "Em cada batida do meu coração, há uma sílaba do seu nome"
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Feito com muito amor ❤️
                </p>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
