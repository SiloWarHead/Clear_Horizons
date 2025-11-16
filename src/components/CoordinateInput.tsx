import { useState } from 'react';
import { MapPin, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CoordinateInputProps {
  onSubmit: (lat: string, lng: string, date: Date) => void;
}

export const CoordinateInput = ({ onSubmit }: CoordinateInputProps) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  const validateRange = (value: string, min: number, max: number, name: string): boolean => {
    const trimmed = value.trim();
    
    // Check if it's a range (contains " to ")
    if (trimmed.includes(' to ')) {
      const parts = trimmed.split(' to ').map(p => p.trim());
      if (parts.length !== 2) {
        toast({
          title: `Invalid ${name}`,
          description: `${name} range must be in format: "value1 to value2"`,
          variant: "destructive"
        });
        return false;
      }
      
      const [start, end] = parts.map(p => parseFloat(p));
      if (isNaN(start) || isNaN(end)) {
        toast({
          title: `Invalid ${name}`,
          description: `${name} values must be numbers`,
          variant: "destructive"
        });
        return false;
      }
      
      if (start < min || start > max || end < min || end > max) {
        toast({
          title: `Invalid ${name}`,
          description: `${name} must be between ${min} and ${max}`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    }
    
    // Single value
    const val = parseFloat(trimmed);
    if (isNaN(val) || val < min || val > max) {
      toast({
        title: `Invalid ${name}`,
        description: `${name} must be between ${min} and ${max}`,
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!validateRange(latitude, -90, 90, "Latitude")) {
      return;
    }

    if (!validateRange(longitude, -180, 180, "Longitude")) {
      return;
    }

    if (!date) {
      toast({
        title: "Invalid Date",
        description: "Please select a date",
        variant: "destructive"
      });
      return;
    }

    onSubmit(latitude.trim(), longitude.trim(), date);
    
    toast({
      title: "Coordinates Submitted",
      description: `Fetching weather data for (${latitude.trim()}, ${longitude.trim()}) on ${format(date, 'PPP')}...`
    });
  };

  return (
    <div className="metric-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-card-foreground">Enter Coordinates</h2>
          <p className="text-sm text-muted-foreground">Select coordinates and date for weather data</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="text"
              placeholder="40 or 40 to 45"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="text"
              placeholder="-74 or -74 to -70"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Fetch Weather Data
        </Button>
      </form>
    </div>
  );
};
