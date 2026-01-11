import React, { useState } from 'react';
import { Search, MapPin, Wind, Droplets, Thermometer } from 'lucide-react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cidade) => {
    if (!cidade) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${}`
      );
      if (!res.ok) throw new Error('Cidade não encontrada');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md border border-white/30 text-white">
        
        {/* Barra de Busca */}
        <form onSubmit={handleSearch} className="relative mb-8">
          <input
            type="text"
            placeholder="Buscar cidade..."
            className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 transition-all"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-white/70" size={20} />
        </form>

        {loading && <p className="text-center text-white/80">Carregando...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {weather && (
          <>
            {/* Informações Principais */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin size={20} className="text-blue-200" />
                <h1 className="text-3xl font-bold tracking-wide">{weather.name}</h1>
              </div>
              <p className="text-blue-100 opacity-80 uppercase tracking-widest text-sm">
                {new Date(weather.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
              
              <div className="mt-6 flex flex-col items-center relative">
                <div className="w-32 h-32 bg-yellow-300 rounded-full blur-2xl absolute opacity-20 animate-pulse"></div>
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                  alt={weather.weather[0].description} 
                  className="w-32 h-32 relative z-10"
                />
                <span className="text-7xl font-extrabold mt-2 tracking-tighter">
                  {Math.round(weather.main.temp)}°C
                </span>
                <span className="text-xl font-medium text-blue-100 mt-1">
                  {weather.weather[0].description}
                </span>
              </div>
            </div>

            {/* Grid de Detalhes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10">
                <Droplets className="text-blue-300" />
                <div>
                  <p className="text-xs text-blue-200 uppercase">Umidade</p>
                  <p className="font-bold text-lg">{weather.main.humidity}%</p>
                </div>
              </div>
              
              <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10">
                <Wind className="text-blue-300" />
                <div>
                  <p className="text-xs text-blue-200 uppercase">Vento</p>
                  <p className="font-bold text-lg">{weather.wind.speed} km/h</p>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10 col-span-2">
                <Thermometer className="text-blue-300" />
                <div>
                  <p className="text-xs text-blue-200 uppercase">Sensação Térmica</p>
                  <p className="font-bold text-lg">{Math.round(weather.main.feels_like)}°C</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
