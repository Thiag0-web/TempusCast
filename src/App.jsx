import React, { useState } from 'react';
import { Search, MapPin, Wind, Droplets, Thermometer } from 'lucide-react';

const WeatherApp = () => {
  const [city, setCity] = useState('');

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center p-4 font-sans">
      {/* Container Principal com Efeito de Vidro */}
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md border border-white/30 text-white">
        
        {/* Barra de Busca */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Buscar cidade..."
            className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 transition-all"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-white/70" size={20} />
        </div>

        {/* Informações Principais */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin size={20} className="text-blue-200" />
            <h1 className="text-3xl font-bold tracking-wide">São Paulo, BR</h1>
          </div>
          <p className="text-blue-100 opacity-80 uppercase tracking-widest text-sm">Sábado, 10 de Jan</p>
          
          <div className="mt-6 flex flex-col items-center">
            {/* Ícone de Clima (Exemplo: Sol) */}
            <div className="w-32 h-32 bg-yellow-300 rounded-full blur-2xl absolute opacity-20 animate-pulse"></div>
            <img 
              src="https://openweathermap.org/img/wn/01d@4x.png" 
              alt="Weather Icon" 
              className="w-32 h-32 relative z-10"
            />
            <span className="text-7xl font-extrabold mt-2 tracking-tighter">24°C</span>
            <span className="text-xl font-medium text-blue-100 mt-1">Céu Limpo</span>
          </div>
        </div>

        {/* Grid de Detalhes (Cards Inferiores) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10">
            <Droplets className="text-blue-300" />
            <div>
              <p className="text-xs text-blue-200 uppercase">Umidade</p>
              <p className="font-bold text-lg">65%</p>
            </div>
          </div>
          
          <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10">
            <Wind className="text-blue-300" />
            <div>
              <p className="text-xs text-blue-200 uppercase">Vento</p>
              <p className="font-bold text-lg">12 km/h</p>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10 col-span-2">
            <Thermometer className="text-blue-300" />
            <div>
              <p className="text-xs text-blue-200 uppercase">Sensação Térmica</p>
              <p className="font-bold text-lg">26°C</p>
            </div>
          </div>
        </div>

        {/* Footer Informativo */}
        <p className="text-center text-xs mt-8 text-white/40 italic">
          Dados providos por OpenWeather API
        </p>
      </div>
    </div>
  );
};

export default WeatherApp;