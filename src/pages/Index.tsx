import { useState } from 'react';
import { Wind, Droplets, Thermometer, CloudRain, Sun, ArrowUpDown } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { CoordinateInput } from '@/components/CoordinateInput';
import { Map } from '@/components/Map';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface WeatherData {
  temperature: string;
  humidity: string;
  windSpeed: string;
  rainfall: string;
}

interface NASAPowerData {
  temperature: string;
  temperatureMax: string;
  temperatureMin: string;
  precipitation: string;
  humidity: string;
  windSpeed: string;
  solarRadiation: string;
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [nasaData, setNasaData] = useState<NASAPowerData | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const { toast } = useToast();

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
  };

  const handleSubmitCoordinates = async (lat: string, lng: string, date: Date) => {
    try {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        throw new Error('Invalid coordinates');
      }

      const dateStr = date.toISOString().split('T')[0];
      const apiKey = '8e13f89df921e28f391bc7c22ddf572d';
      
      // Call OpenWeather API directly
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      
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

      // Fetch NASA POWER data only for non-future dates to avoid NASA API errors
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(0, 0, 0, 0);

      if (selectedDate > today) {
        console.warn('NASA POWER not available for future dates, skipping call');
        toast({
          title: 'NASA POWER data unavailable for future dates',
          description: 'Please select today or a past date for NASA climate data. OpenWeather data is still shown.',
          variant: 'default',
        });
      } else {
        const nasaDate = selectedDate.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
        const { data: nasaPowerData, error: nasaError } = await supabase.functions.invoke('fetch-nasa-power', {
          body: { latitude, longitude, date: nasaDate }
        });

        if (nasaError) {
          console.error('NASA POWER API error:', nasaError);
          toast({
            title: 'NASA POWER data unavailable',
            description: 'Using OpenWeather data only',
            variant: 'default',
          });
        } else if (nasaPowerData) {
          setNasaData({
            temperature: nasaPowerData.temperature?.toFixed?.(1) ?? '--',
            temperatureMax: nasaPowerData.temperatureMax?.toFixed?.(1) ?? '--',
            temperatureMin: nasaPowerData.temperatureMin?.toFixed?.(1) ?? '--',
            precipitation: nasaPowerData.precipitation?.toFixed?.(2) ?? '--',
            humidity: nasaPowerData.humidity?.toFixed?.(1) ?? '--',
            windSpeed: nasaPowerData.windSpeed?.toFixed?.(1) ?? '--',
            solarRadiation: nasaPowerData.solarRadiation?.toFixed?.(2) ?? '--',
          });
        }
      }


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
          <CoordinateInput onSubmit={handleSubmitCoordinates} selectedCoordinates={selectedPosition} />
        </div>

        <div className="mb-8">
          <Map onCoordinateSelect={handleMapClick} selectedPosition={selectedPosition} />
        </div>

        {weatherData && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-card-foreground mb-2">OpenWeather Data</h2>
              <p className="text-muted-foreground text-sm">Real-time current weather conditions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
          </>
        )}

        {nasaData && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-card-foreground mb-2">NASA POWER Data</h2>
              <p className="text-muted-foreground text-sm">Satellite-derived daily climate data</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Avg Temperature"
                subtitle="Daily Average"
                value={nasaData.temperature}
                unit="°C"
                icon={Thermometer}
                iconColor="text-temp"
                iconBg="bg-temp-light"
              />

              <MetricCard
                title="Temp Range"
                subtitle="Min to Max"
                value={`${nasaData.temperatureMin} - ${nasaData.temperatureMax}`}
                unit="°C"
                icon={ArrowUpDown}
                iconColor="text-temp"
                iconBg="bg-temp-light"
              />

              <MetricCard
                title="Solar Radiation"
                subtitle="Daily Average"
                value={nasaData.solarRadiation}
                unit="kW-hr/m²/day"
                icon={Sun}
                iconColor="text-yellow-500"
                iconBg="bg-yellow-100 dark:bg-yellow-950"
              />

              <MetricCard
                title="Precipitation"
                subtitle="Daily Total"
                value={nasaData.precipitation}
                unit="mm/day"
                icon={CloudRain}
                iconColor="text-sky"
                iconBg="bg-sky-light"
              />
            </div>
          </>
        )}

        <footer className="text-center py-6 text-muted-foreground text-sm">
          <p>© 2025 ClearHorizons Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
