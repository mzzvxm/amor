
import DaysCounter from '../components/DaysCounter';
import PoemSection from '../components/PoemSection';
import MemoriesGallery from '../components/MemoriesGallery';
import SpotifyPlayer from '../components/SpotifyPlayer';
import LoveQuestions from '../components/LoveQuestions';
import FloatingHearts from '../components/FloatingHearts';
import { Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-16">
        {/* Header */}
        <header className="text-center py-16">
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

        {/* Days Counter */}
        <section className="max-w-md mx-auto">
          <DaysCounter />
        </section>

        {/* Poem Section */}
        <section className="max-w-4xl mx-auto">
          <PoemSection />
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
      </div>
    </div>
  );
};

export default Index;
