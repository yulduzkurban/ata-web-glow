import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image?: string;
  gitlab_url: string;
  live_url?: string;
  tech_stack: string[];
  created_at: string;
  updated_at: string;
}

const ProjectForm = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    gitlabUrl: "",
    liveUrl: "",
    techStack: "",
  });
  const { toast } = useToast();

  // Load projects from Supabase
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading projects:', error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.gitlabUrl) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const techStackArray = formData.techStack.split(",").map(tech => tech.trim()).filter(Boolean);
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        image: formData.image || null,
        gitlab_url: formData.gitlabUrl,
        live_url: formData.liveUrl || null,
        tech_stack: techStackArray,
        user_id: (await supabase.auth.getUser()).data.user?.id
      };

      let error;
      if (editingProject) {
        // Update existing project
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        error = updateError;
      } else {
        // Create new project
        const { error: insertError } = await supabase
          .from('projects')
          .insert([projectData]);
        error = insertError;
      }

      if (error) {
        console.error('Error saving project:', error);
        toast({
          title: "Error",
          description: "Failed to save project. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: editingProject ? "Project updated successfully" : "Project added successfully",
      });

      resetForm();
      loadProjects(); // Reload projects from database
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || "",
      gitlabUrl: project.gitlab_url,
      liveUrl: project.live_url || "",
      techStack: project.tech_stack.join(", "),
    });
    setIsAddingNew(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        toast({
          title: "Error",
          description: "Failed to delete project. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      loadProjects(); // Reload projects from database
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setIsAddingNew(false);
    setFormData({
      title: "",
      description: "",
      image: "",
      gitlabUrl: "",
      liveUrl: "",
      techStack: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Manage Projects</h3>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {isAddingNew && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>
              {editingProject ? "Edit Project" : "Add New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gitlabUrl">GitLab URL *</Label>
                  <Input
                    id="gitlabUrl"
                    name="gitlabUrl"
                    value={formData.gitlabUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://gitlab.com/username/project"
                  />
                </div>
                <div>
                  <Label htmlFor="liveUrl">Live Demo URL</Label>
                  <Input
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://project.vercel.app"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                <Input
                  id="techStack"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-gradient-primary hover:opacity-90"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : editingProject ? "Update" : "Add"} Project
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-glow transition-all duration-300">
            <CardContent className="p-4">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
              )}
              <h4 className="font-semibold mb-2">{project.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech_stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(project)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;