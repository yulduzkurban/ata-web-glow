import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    gitlabUrl: "",
    liveUrl: "",
    techStack: [] as string[],
  });
  const [currentTech, setCurrentTech] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.gitlabUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Get existing projects from localStorage
    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    
    // Add new project with unique ID
    const newProject = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    
    toast({
      title: "Success!",
      description: "Project added successfully",
    });
    
    navigate("/");
  };

  const addTechStack = () => {
    if (currentTech.trim() && !formData.techStack.includes(currentTech.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, currentTech.trim()],
      });
      setCurrentTech("");
    }
  };

  const removeTechStack = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    });
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Add New Project
            </h1>
          </div>

          <Card className="backdrop-blur-sm bg-card/80 border-border/20 shadow-glass">
            <CardHeader>
              <CardTitle className="text-2xl">Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., AutoFinder - Car Selling Platform"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of your project..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Project Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/project-image.jpg"
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gitlabUrl">GitLab Repository URL *</Label>
                  <Input
                    id="gitlabUrl"
                    value={formData.gitlabUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, gitlabUrl: e.target.value })
                    }
                    placeholder="https://gitlab.com/username/project"
                    type="url"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live Demo URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    placeholder="https://project.vercel.app"
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="techStack">Tech Stack</Label>
                  <div className="flex gap-2">
                    <Input
                      id="techStack"
                      value={currentTech}
                      onChange={(e) => setCurrentTech(e.target.value)}
                      placeholder="e.g., React"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechStack())}
                    />
                    <Button
                      type="button"
                      onClick={addTechStack}
                      variant="outline"
                      size="icon"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.techStack.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechStack(tech)}
                            className="text-primary hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  Add Project
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProject;