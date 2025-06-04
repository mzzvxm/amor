
import { useState } from 'react';
import { Camera, Heart } from 'lucide-react';

const MemoriesGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Adicione aqui as URLs das suas fotos ou use placeholders
  const memories = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&h=400&fit=crop",
      title: "Nosso primeiro encontro",
      date: "Janeiro 2024"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
      title: "Jantar romântico",
      date: "Fevereiro 2024"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      title: "Viagem especial",
      date: "Março 2024"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=400&fit=crop",
      title: "Momento de felicidade",
      date: "Abril 2024"
    }
  ];

  return (
    <div className="glass-effect rounded-xl p-8">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Camera className="text-blood-red-500" size={24} />
        <h2 className="text-3xl font-bold text-center text-shadow">Nossas Memórias</h2>
        <Heart className="text-blood-red-500 fill-current" size={24} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {memories.map((memory, index) => (
          <div
            key={memory.id}
            className="relative group cursor-pointer animate-fadeInUp"
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => setSelectedPhoto(memory.url)}
          >
            <div className="aspect-square overflow-hidden rounded-lg glass-effect">
              <img
                src={memory.url}
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{memory.title}</p>
                  <p className="text-xs text-gray-300">{memory.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img
              src={selectedPhoto}
              alt="Memória selecionada"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoriesGallery;
