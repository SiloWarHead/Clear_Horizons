import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NASAPowerRequest {
  latitude: number;
  longitude: number;
  date: string; // YYYYMMDD format
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude, date }: NASAPowerRequest = await req.json();
    
    console.log('Fetching NASA POWER data for:', { latitude, longitude, date });

    // NASA POWER API endpoint for daily data
    // Parameters: T2M (Temperature at 2m), PRECTOTCORR (Precipitation), RH2M (Relative Humidity), WS10M (Wind Speed at 10m), ALLSKY_SFC_SW_DWN (Solar radiation)
    const nasaUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR,RH2M,WS10M,ALLSKY_SFC_SW_DWN,T2M_MAX,T2M_MIN&community=AG&longitude=${longitude}&latitude=${latitude}&start=${date}&end=${date}&format=JSON`;

    console.log('NASA POWER API URL:', nasaUrl);

    const response = await fetch(nasaUrl);
    
    if (!response.ok) {
      throw new Error(`NASA POWER API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('NASA POWER response:', JSON.stringify(data, null, 2));

    // Extract the parameters from the response
    const parameters = data.properties?.parameter;
    
    if (!parameters) {
      throw new Error('No parameter data in NASA POWER response');
    }

    // Get the values for the requested date
    const dateKey = date;
    
    const result = {
      temperature: parameters.T2M?.[dateKey] || null,
      temperatureMax: parameters.T2M_MAX?.[dateKey] || null,
      temperatureMin: parameters.T2M_MIN?.[dateKey] || null,
      precipitation: parameters.PRECTOTCORR?.[dateKey] || null,
      humidity: parameters.RH2M?.[dateKey] || null,
      windSpeed: parameters.WS10M?.[dateKey] || null,
      solarRadiation: parameters.ALLSKY_SFC_SW_DWN?.[dateKey] || null,
      latitude: data.geometry?.coordinates[1],
      longitude: data.geometry?.coordinates[0],
    };

    console.log('Processed NASA POWER data:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in fetch-nasa-power function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch NASA POWER data';
    const errorDetails = error instanceof Error ? error.toString() : String(error);
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: errorDetails
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
