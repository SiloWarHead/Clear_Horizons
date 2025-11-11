import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { lat, lng, date, apiKey } = await req.json();

    if (
      typeof lat !== "string" ||
      typeof lng !== "string" ||
      typeof date !== "string" ||
      typeof apiKey !== "string" ||
      !lat || !lng || !date || !apiKey
    ) {
      return new Response(JSON.stringify({ error: "Invalid request body. Provide lat, lng, date, and apiKey." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return new Response(JSON.stringify({ error: "Invalid coordinates" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse the date to get Unix timestamp for the requested date
    const targetDate = new Date(date);
    const timestamp = Math.floor(targetDate.getTime() / 1000);

    // OpenWeather API current weather endpoint
    const cleanApiKey = apiKey.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${encodeURIComponent(cleanApiKey)}&units=metric`;

    const resp = await fetch(url);
    if (!resp.ok) {
      const t = await resp.text();
      console.error("OpenWeather error:", resp.status, t);
      if (resp.status === 401) {
        return new Response(JSON.stringify({ error: "Invalid OpenWeather API key" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "OpenWeather rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Upstream weather API error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    console.log("OpenWeather response:", data);

    const result = {
      average_temperature: data.main?.temp ?? null,
      average_humidity: data.main?.humidity ?? null,
      average_wind_speed: data.wind?.speed ? data.wind.speed * 3.6 : null, // convert m/s to km/h
      total_precipitation: data.rain?.["1h"] ?? 0, // mm in last hour
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("weather function error:", e?.message || e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
