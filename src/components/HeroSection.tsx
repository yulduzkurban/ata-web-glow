import { Button } from "@/components/ui/button";
import { ChevronDown, ExternalLink, Mail } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center bg-gradient-bg overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="block text-foreground">Hi, I'm</span>
          <span className="block bg-gradient-primary bg-clip-text text-transparent">
            Yulduzxon
          </span>
          <span className="block text-2xl md:text-3xl text-muted-foreground font-normal mt-2">
            Frontend Developer
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          I build user-focused, modern web applications with cutting-edge technologies 
          and beautiful, responsive designs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={() => scrollToSection("projects")}
            className="bg-gradient-primary hover:opacity-90 transition-opacity text-white px-8 py-6 text-lg"
          >
            View Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={() => scrollToSection("contact")}
            variant="outline"
            className="backdrop-blur-sm bg-card/50 border-border/20 hover:bg-card/80 px-8 py-6 text-lg"
          >
            Contact Me
            <Mail className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="animate-bounce">
          <Button
            variant="ghost"
            onClick={() => scrollToSection("projects")}
            className="p-2 rounded-full hover:bg-card/20"
          >
            <ChevronDown className="h-8 w-8 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;