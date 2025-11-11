import { useState } from 'react';
import { Wind, Droplets, Thermometer, CloudRain } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { CoordinateInput } from '@/components/CoordinateInput';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface WeatherData {
  temperature: string;
  humidity: string;
  windSpeed: string;
  rainfall: string;
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { toast } = useToast();

  const handleSubmitCoordinates = async (lat: string, lng: string, date: Date) => {
    try {
const dateStr = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
const { data, error } = await supabase.functions.invoke('weather', {
  body: { lat, lng, date: dateStr },
});
if (error || (data && (data as any).error)) {
  throw new Error((data as any)?.error || (error as any)?.message || 'Unknown error');
}

      setWeatherData({
        temperature: data?.average_temperature?.toFixed?.(1) ?? '--',
        humidity: data?.average_humidity?.toFixed?.(1) ?? '--',
        windSpeed: data?.average_wind_speed?.toFixed?.(1) ?? '--',
        rainfall: data?.total_precipitation?.toFixed?.(1) ?? '--',
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
