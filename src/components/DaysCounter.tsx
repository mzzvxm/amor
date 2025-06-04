
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const DaysCounter = () => {
  const [days, setDays] = useState(0);
  
  // Defina aqui a data de início do relacionamento
  const startDate = new Date('2024-01-01'); // Substitua pela data real
  
  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    };
    
    calculateDays();
    const interval = setInterval(calculateDays, 86400000); // Atualiza diariamente
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-effect rounded-xl p-8 text-center animate-fadeInUp">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Heart className="text-blood-red-500 animate-pulse-heart fill-current" size={24} />
        <h2 className="text-2xl font-bold text-shadow">Estou te amando há</h2>
        <Heart className="text-blood-red-500 animate-pulse-heart fill-current" size={24} />
      </div>
      <div className="text-6xl font-bold text-blood-red-400 mb-2 text-shadow">
        {days}
      </div>
      <div className="text-xl text-gray-300">
        {days === 1 ? 'dia' : 'dias'}
      </div>
    </div>
  );
};

export default DaysCounter;
