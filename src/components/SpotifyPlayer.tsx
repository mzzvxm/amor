
import { Music } from 'lucide-react';

const SpotifyPlayer = () => {
  // Substitua esta URL pela URL do embed da sua música/playlist do Spotify
  const spotifyEmbedUrl = "https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh?utm_source=generator&theme=0";

  return (
    <div className="glass-effect rounded-xl p-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Music className="text-blood-red-500" size={24} />
        <h2 className="text-3xl font-bold text-center text-shadow">Nossa Música</h2>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <iframe
          src={spotifyEmbedUrl}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
