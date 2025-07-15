import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  gitlabUrl: string;
  liveUrl?: string;
  techStack: string[];
  createdAt: string;
}

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  // Default project
  const defaultProject: Project = {
    id: "1",
    title: "AutoFinder – Advanced Car Selling Platform",
    description: "A comprehensive car selling platform with advanced search functionality, user authentication, and real-time messaging system. Built with modern web technologies for optimal performance.",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&q=80",
    gitlabUrl: "https://gitlab.com/alisherz1980/development-of-an-advanced-car-selling-platform",
    liveUrl: "https://development-of-an-advanced-car-selling-platform.vercel.app/",
    techStack: ["React", "Tailwind CSS", "TypeScript", "Node.js", "MongoDB"],
    createdAt: new Date().toISOString()
  };

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    if (savedProjects.length === 0) {
      // Add default project if none exist
      localStorage.setItem("projects", JSON.stringify([defaultProject]));
      setProjects([defaultProject]);
    } else {
      setProjects(savedProjects);
    }
  }, []);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work showcasing modern web development skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-glow transition-all duration-300 backdrop-blur-sm bg-card/80 border-border/20">
              <CardHeader className="p-0">
                {project.image && (
                  <div className="relative overflow-hidden rounded-t-lg h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(project.gitlabUrl, "_blank")}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitLab
                  </Button>
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate("/add-project")}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;