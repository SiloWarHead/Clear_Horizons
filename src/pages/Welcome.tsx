import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Gauge, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Welcome() {
  const navigate = useNavigate();

  const teamMembers = [
    { name: "Mayukh Das", initials: "MD" },
    { name: "Eiliyah Sahar", initials: "ES" },
    { name: "Aariyal Hassan", initials: "AH" },
    { name: "Antorip Paul", initials: "AP" },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Interactive Mapping",
      description: "Pin locations, draw boundaries, or search by name",
    },
    {
      icon: Gauge,
      title: "Weather Parameters",
      description: "Temperature, precipitation, air quality, wind speed & more",
    },
    {
      icon: TrendingUp,
      title: "Probability Analysis",
      description: "Statistical insights and threshold probability calculations",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm text-primary">NASA Space Apps Challenge 2025</span>
          </div>
        </div>

        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <img src={logo} alt="ClearHorizons Logo" className="w-48 h-48 mx-auto object-contain" />
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground">
                Beyond the Clouds presents
              </p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                ClearHorizons
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Personalized Weather Insights Powered by NASA Earth Observation Data
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Launch Dashboard
            <ArrowRight className="ml-2" />
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">The Challenge</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Our mission is to develop an innovative application that leverages NASA's Earth observation data to empower users with personalized weather condition forecasts. Users can create custom dashboards to analyze the probability of specific weather events at their chosen locations and times.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Summary Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Project Summary</h2>
          <p className="text-lg text-muted-foreground mb-8">
            ClearHorizons transforms complex NASA Earth observation data into accessible, actionable weather insights. Our platform enables users to:
          </p>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Create personalized dashboards with customizable weather parameters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Visualize probability distributions for specific weather conditions at any location</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Understand mean values over time and threshold exceedance probabilities</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Download relevant data subsets for further analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Make informed decisions based on reliable NASA satellite data</span>
            </li>
          </ul>
          <p className="text-lg text-muted-foreground mt-8">
            Whether you're planning outdoor events, managing agricultural operations, or simply curious about future weather patterns, ClearHorizons provides the clarity you need to see what's on the horizon.
          </p>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Project Details</h2>
          <div className="space-y-6 text-muted-foreground text-lg">
            <p>
              ClearHorizons is built using modern web technologies to deliver a fast, responsive, and intuitive user experience. The frontend is developed with React and TypeScript, providing type-safe code and component-based architecture. We leverage Vite for lightning-fast development and build processes, while Tailwind CSS ensures a beautiful, consistent design system throughout the application.
            </p>
            <p>
              The interface is designed with user experience at its core. Users can input geographical coordinates and area parameters through an intuitive form interface. Once submitted, the dashboard fetches real-time weather data from NASA's POWER (Prediction Of Worldwide Energy Resources) API, which provides comprehensive Earth observation datasets including temperature, humidity, wind speed, air quality, rainfall, and snowfall measurements.
            </p>
            <p>
              The backend functionality processes user requests and communicates with NASA's APIs to retrieve relevant climate data. Data is then processed and visualized through interactive metric cards that display current readings in an easy-to-understand format. Each weather parameter is color-coded and accompanied by intuitive icons for quick recognition. The responsive design ensures seamless functionality across desktop, tablet, and mobile devices, making weather insights accessible anywhere, anytime.
            </p>
            <p>
              The entire codebase follows best practices for maintainability and scalability, with modular components, efficient state management using React hooks, and clean separation of concerns. This architecture allows for easy feature additions and ensures the application can grow alongside user needs.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Our Team</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            We're a team of seventh-grade science enthusiasts from <a href="https://www.rajukcollege.edu.bd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Rajuk Uttara Model College</a> (RUMC) and <a href="https://bitschool.edu.bd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bangladesh International Tutorial Limited</a> (BITL). We're passionate about the deeper realms of science especially space exploration, physics, and programming but we're always eager to pursue knowledge across all fields of science. We've been exploring every branch of science we can get our hands on for quite some time, and we're strongly motivated to innovate and contribute to the world through science to make it a better place. That's why the NASA Space Apps program has been a great opportunity for us to showcase our skills.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => {
              const gradients = [
                'from-primary via-accent to-secondary',
                'from-secondary via-primary to-accent',
                'from-accent via-secondary to-primary',
                'from-primary via-secondary to-accent'
              ];
              const glowColors = [
                'shadow-[0_0_40px_rgba(66,153,225,0.5)]',
                'shadow-[0_0_40px_rgba(16,185,129,0.5)]',
                'shadow-[0_0_40px_rgba(168,85,247,0.5)]',
                'shadow-[0_0_40px_rgba(66,153,225,0.5)]'
              ];
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border-2 border-primary/30 hover:border-primary transition-all hover:-translate-y-2 hover:scale-105 duration-300"
                  style={{
                    boxShadow: '0 8px 32px -8px rgba(66, 153, 225, 0.3)'
                  }}
                >
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-2xl font-bold text-white mb-4 ${glowColors[index]} hover:scale-110 transition-transform duration-300 animate-pulse`}>
                    {member.initials}
                  </div>
                  <h3 className="text-lg font-semibold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{member.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Explore Dashboard
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
