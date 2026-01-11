import { Search, MapPin, Wind, Droplets, Thermometer } from "lucide-react";
import Loader from "./components/Loader/Loader";
import { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cidade) => {
    if (!cidade) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://wttr.in/${cidade}?format=j1&lang=pt`);
      if (!res.ok) throw new Error("Cidade não encontrada");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error("Erro na busca:", err);
      setError("Cidade não encontrada. Tente novamente.");
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
        {/* TEXTO DINÂMICO DE STATUS */}
        {!loading && (
          <div className="mb-4 text-center animate-fade-in">
            {error ? (
              <p className="text-red-200 font-medium">Ops! Algo deu errado.</p>
            ) : weather ? (
              <p className="text-blue-100 text-sm font-light flex items-center justify-center gap-1">
                <MapPin size={14} /> Exibindo resultados para{" "}
                <span className="font-bold">
                  {weather.nearest_area[0].areaName[0].value}
                </span>
              </p>
            ) : (
              <p className="text-white/80 text-sm">
                Digite o nome de uma cidade para começar
              </p>
            )}
          </div>
        )}

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

        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader />
            <p className="mt-4 text-white/70 animate-pulse">
              Buscando clima...
            </p>
          </div>
        )}

        {weather && !loading && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin size={20} className="text-blue-200" />
                <h1 className="text-3xl font-bold tracking-wide text-white">
                  {`${weather.nearest_area[0].areaName[0].value}, ${weather.nearest_area[0].region[0].value}`}
                </h1>
              </div>

              <p className="text-blue-100 opacity-80 uppercase tracking-widest text-xs font-semibold">
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>

              <div className="mt-6 flex flex-col items-center relative">
                <div className="w-32 h-32 bg-yellow-300 rounded-full blur-2xl absolute opacity-20 animate-pulse"></div>
                <Thermometer
                  size={80}
                  className="relative z-10 text-yellow-300 drop-shadow-lg"
                />

                <span className="text-7xl font-extrabold mt-2 tracking-tighter">
                  {weather.current_condition[0].temp_C}°C
                </span>

                <span className="text-xl font-medium text-blue-100 mt-1 capitalize">
                  {weather.current_condition[0].lang_pt
                    ? weather.current_condition[0].lang_pt[0].value
                    : weather.current_condition[0].weatherDesc[0].value}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10 hover:bg-white/20 transition-colors">
                <Droplets className="text-blue-300" />
                <div>
                  <p className="text-[10px] text-blue-200 uppercase font-bold">
                    Umidade
                  </p>
                  <p className="font-bold text-lg">
                    {weather.current_condition[0].humidity}%
                  </p>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 border border-white/10 hover:bg-white/20 transition-colors">
                <Wind className="text-blue-300" />
                <div>
                  <p className="text-[10px] text-blue-200 uppercase font-bold">
                    Vento
                  </p>
                  <p className="font-bold text-lg">
                    {weather.current_condition[0].windspeedKmph} km/h
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
