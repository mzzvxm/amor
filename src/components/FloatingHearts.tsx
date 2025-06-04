
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeartPosition {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartPosition[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: HeartPosition[] = [];
      for (let i = 0; i < 8; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          delay: Math.random() * 4
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  const colors = ['text-purple-600', 'text-blue-600', 'text-pink-500'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-20"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`
          }}
        >
          <Heart 
            size={heart.size} 
            className={`${colors[heart.id % colors.length]} heart-float fill-current`}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
