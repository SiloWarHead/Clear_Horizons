import { useState } from 'react';
import { Wind, Droplets, Thermometer, CloudRain } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { CoordinateInput } from '@/components/CoordinateInput';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  temperature: string;
  humidity: string;
  windSpeed: string;
  rainfall: string;
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { toast } = useToast();

  const handleSubmitCoordinates = async (lat: string, lng: string, date: Date, apiKey: string) => {
    try {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        throw new Error('Invalid coordinates');
      }

      const dateStr = date.toISOString().split('T')[0];
      const cleanApiKey = apiKey.trim();
      
      // Call OpenWeather API directly
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${encodeURIComponent(cleanApiKey)}&units=metric`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Invalid OpenWeather API key');
        }
        if (response.status === 429) {
          throw new Error('OpenWeather rate limit exceeded. Please try again later.');
        }
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const data = await response.json();

      setWeatherData({
        temperature: data.main?.temp?.toFixed?.(1) ?? '--',
        humidity: data.main?.humidity?.toFixed?.(1) ?? '--',
        windSpeed: data.wind?.speed ? (data.wind.speed * 3.6).toFixed(1) : '--', // m/s to km/h
        rainfall: data.rain?.['1h']?.toFixed?.(1) ?? '0',
      });

      toast({
        title: 'Weather data fetched',
        description: `Fetched metrics for ${dateStr}`,
      });
    } catch (error: any) {
      console.error('Error fetching weather data:', error);
      toast({
        title: 'Failed to fetch weather data',
        description: error?.message ?? 'Unexpected error',
        variant: 'destructive',
      });
      setWeatherData({
        temperature: 'Error',
        humidity: 'Error',
        windSpeed: 'Error',
        rainfall: 'Error',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="w-full py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ClearHorizons Dashboard
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Real-time weather metrics powered by NASA Earth observation data
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 max-w-7xl">

        <div className="mb-8">
          <CoordinateInput onSubmit={handleSubmitCoordinates} />
        </div>

        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Temperature"
              subtitle="Current Reading"
              value={weatherData.temperature}
              unit="°C"
              icon={Thermometer}
              iconColor="text-temp"
              iconBg="bg-temp-light"
            />

            <MetricCard
              title="Humidity"
              subtitle="Current Level"
              value={weatherData.humidity}
              unit="%"
              icon={Droplets}
              iconColor="text-sky"
              iconBg="bg-sky-light"
            />

            <MetricCard
              title="Wind Speed"
              subtitle="Current Measurement"
              value={weatherData.windSpeed}
              unit="km/h"
              icon={Wind}
              iconColor="text-wind"
              iconBg="bg-wind-light"
            />

            <MetricCard
              title="Rainfall"
              subtitle="Last Hour"
              value={weatherData.rainfall}
              unit="mm"
              icon={CloudRain}
              iconColor="text-sky"
              iconBg="bg-sky-light"
            />
          </div>
        )}

        <footer className="text-center py-6 text-muted-foreground text-sm">
          <p>© 2025 ClearHorizons Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
