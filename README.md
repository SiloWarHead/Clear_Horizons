# ClearHorizons Dashboard

<div align="center">
  <img src="src/assets/logo.png" alt="ClearHorizons Logo" width="200"/>
  
  ### Personalized Weather Insights Powered by NASA Earth Observation Data
  
  **Built for NASA Space Apps Challenge 2025**
  
  By Team **Beyond the Clouds**
</div>

---

## 📋 About

ClearHorizons is an innovative weather dashboard application that leverages NASA's Earth observation data to provide users with personalized weather condition forecasts. The application allows users to input coordinates and dates to retrieve real-time weather metrics including temperature, humidity, wind speed, and rainfall data.

## ✨ Features

- **Interactive Coordinate Input**: Enter latitude and longitude coordinates with validation
- **Date Selection**: Choose specific dates for weather data retrieval
- **Real-time Weather Metrics**:
  - Temperature (°C)
  - Humidity (%)
  - Wind Speed (km/h)
  - Rainfall (mm)
- **Beautiful UI**: Modern, responsive design with gradient effects and smooth animations
- **Error Handling**: Comprehensive error messages and validation

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following content:
   ```env
   VITE_SUPABASE_PROJECT_ID="pwexilkmtxazbcyvoqbh"
   VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZXhpbGttdHhhemJjeXZvcWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNjU0ODAsImV4cCI6MjA3NTc0MTQ4MH0.W7xpLdFurbqnbP-ot1U7CCQB4aav0IveYM7K_NvcpxE"
   VITE_SUPABASE_URL="https://pwexilkmtxazbcyvoqbh.supabase.co"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   The application will be available at `http://localhost:5173` (or the URL shown in your terminal)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage Guide

### Accessing the Dashboard

1. **Welcome Page**: When you first open the application, you'll see the welcome page with project information
2. **Launch Dashboard**: Click the "Launch Dashboard" button to access the main interface

### Fetching Weather Data

1. **Enter Coordinates**:
   - Input latitude (between -90 and 90)
   - Input longitude (between -180 and 180)
   - Coordinates can be single values or ranges (e.g., "40 to 45")

2. **Select Date**:
   - Click the calendar icon to open the date picker
   - Choose your desired date

3. **Fetch Data**:
   - Click "Fetch Weather Data" button
   - Wait for the data to load

4. **View Results**:
   - Temperature displayed in Celsius
   - Humidity as a percentage
   - Wind speed in kilometers per hour
   - Rainfall in millimeters (last hour)

### Coordinate Input Format

- **Single value**: `40.7128` (for latitude) or `-74.0060` (for longitude)
- **Range**: `40 to 45` (fetches data for coordinate range)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (via shadcn/ui)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Backend**: Lovable Cloud (Supabase)
- **Weather API**: OpenWeather API

## 👥 Team - Beyond the Clouds

- **Mayukh Das**
- **Eiliyah Sahar**
- **Aariyal Hassan**
- **Antorip Paul**

## 📁 Project Structure

```
clearhorizons/
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── MetricCard.tsx
│   │   └── CoordinateInput.tsx
│   ├── pages/          # Page components
│   │   ├── Index.tsx
│   │   ├── Welcome.tsx
│   │   └── NotFound.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── integrations/   # API integrations
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Public assets
├── .env               # Environment variables
└── package.json       # Dependencies
```

## 🌐 API Integration

This project uses the OpenWeather API to fetch real-time weather data. The API key is configured in the application code for seamless operation.

## 💻 Development

### Using Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/bfbf5145-28e3-4e23-a4aa-908545cfe4f7) and start prompting. Changes made via Lovable will be committed automatically to this repo.

### Using GitHub Codespaces

- Navigate to the main page of your repository
- Click on the "Code" button (green button) near the top right
- Select the "Codespaces" tab
- Click on "New codespace" to launch a new Codespace environment
- Edit files directly within the Codespace and commit and push your changes once you're done

## 🚀 Deployment

### Deploy via Lovable

Simply open [Lovable](https://lovable.dev/projects/bfbf5145-28e3-4e23-a4aa-908545cfe4f7) and click on Share → Publish.

### Deploy to Render

You can deploy this application to Render using a **Static Site** service:

#### Step-by-Step Instructions:

1. **Create a Render Account**
   - Go to [render.com](https://render.com) and sign up/log in

2. **Connect Your GitHub Repository**
   - Click "New +" → "Static Site"
   - Connect your GitHub account if not already connected
   - Select this repository

3. **Configure Build Settings**
   
   Use the following settings:
   
   | Setting | Value |
   |---------|-------|
   | **Name** | `clearhorizons-dashboard` (or your preferred name) |
   | **Root Directory** | `.` (leave blank or use root) |
   | **Build Command** | `npm install && npm run build` |
   | **Publish Directory** | `dist` |

4. **Add Environment Variables**
   
   In the "Environment" section, add these variables:
   
   ```
   VITE_SUPABASE_PROJECT_ID=pwexilkmtxazbcyvoqbh
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZXhpbGttdHhhemJjeXZvcWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNjU0ODAsImV4cCI6MjA3NTc0MTQ4MH0.W7xpLdFurbqnbP-ot1U7CCQB4aav0IveYM7K_NvcpxE
   VITE_SUPABASE_URL=https://pwexilkmtxazbcyvoqbh.supabase.co
   ```

5. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your application
   - Wait for the build to complete (usually 2-5 minutes)

6. **Access Your App**
   - Once deployed, Render will provide you with a URL like: `https://clearhorizons-dashboard.onrender.com`
   - Your app is now live!

#### Important Notes:

- **Automatic Deploys**: Render automatically redeploys your site whenever you push to the main branch
- **Edge Functions**: The Supabase edge functions (like `fetch-nasa-power`) are hosted on Lovable Cloud and will continue to work from your Render deployment
- **Free Tier**: Render offers a free tier for static sites with some limitations
- **Build Time**: Initial builds may take 3-5 minutes

#### Troubleshooting:

If your build fails:
1. Check that the build command is correct: `npm install && npm run build`
2. Verify environment variables are set correctly
3. Check the build logs in Render dashboard for specific errors
4. Ensure your `package.json` has the correct Node.js version (18+)

### Custom Domain

To connect a custom domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🤝 Contributing

This project was created for the NASA Space Apps Challenge 2025. If you'd like to contribute or have suggestions, feel free to open an issue or submit a pull request.

## 📄 License

This project is created for educational and competition purposes as part of NASA Space Apps Challenge 2025.

## 🙏 Acknowledgments

- NASA for providing Earth observation data
- OpenWeather for weather API services
- Space Apps Challenge organizers
- Lovable platform for development tools

---

<div align="center">
  Made with ❤️ by Team Beyond the Clouds
  
  **NASA Space Apps Challenge 2025**
</div>
