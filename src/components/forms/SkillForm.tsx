import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
  icon: string;
  proficiency: number;
}

const SkillForm = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    proficiency: 50,
  });
  const { toast } = useToast();

  // Default skills
  const defaultSkills: Skill[] = [
    { id: "1", name: "HTML", icon: "🌐", proficiency: 95 },
    { id: "2", name: "CSS", icon: "🎨", proficiency: 94 },
    { id: "3", name: "JavaScript", icon: "💛", proficiency: 88 },
    { id: "4", name: "React", icon: "⚛️", proficiency: 92 },
    { id: "5", name: "Tailwind", icon: "🎯", proficiency: 90 },
    { id: "6", name: "TypeScript", icon: "🔷", proficiency: 85 },
    { id: "7", name: "Git", icon: "🌿", proficiency: 88 },
    { id: "8", name: "Figma", icon: "🎨", proficiency: 78 },
    { id: "9", name: "Next.js", icon: "▲", proficiency: 82 },
  ];

  useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem("skills") || "[]");
    if (savedSkills.length === 0) {
      setSkills(defaultSkills);
      localStorage.setItem("skills", JSON.stringify(defaultSkills));
    } else {
      setSkills(savedSkills);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProficiencyChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      proficiency: value[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.icon) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const skillData: Skill = {
      id: editingSkill?.id || Date.now().toString(),
      name: formData.name,
      icon: formData.icon,
      proficiency: formData.proficiency,
    };

    let updatedSkills;
    if (editingSkill) {
      updatedSkills = skills.map(skill => 
        skill.id === editingSkill.id ? skillData : skill
      );
    } else {
      updatedSkills = [...skills, skillData];
    }

    setSkills(updatedSkills);
    localStorage.setItem("skills", JSON.stringify(updatedSkills));
    
    toast({
      title: "Success",
      description: editingSkill ? "Skill updated successfully" : "Skill added successfully",
    });

    resetForm();
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      icon: skill.icon,
      proficiency: skill.proficiency,
    });
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    localStorage.setItem("skills", JSON.stringify(updatedSkills));
    
    toast({
      title: "Success",
      description: "Skill deleted successfully",
    });
  };

  const resetForm = () => {
    setEditingSkill(null);
    setIsAddingNew(false);
    setFormData({
      name: "",
      icon: "",
      proficiency: 50,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Manage Skills</h3>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Skill
        </Button>
      </div>

      {isAddingNew && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Skill Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="React"
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon (emoji or text) *</Label>
                  <Input
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    required
                    placeholder="⚛️"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="proficiency">Proficiency: {formData.proficiency}%</Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.proficiency]}
                    onValueChange={handleProficiencyChange}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  <Save className="w-4 h-4 mr-2" />
                  {editingSkill ? "Update" : "Add"} Skill
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
        {skills.map((skill) => (
          <Card key={skill.id} className="group hover:shadow-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{skill.icon}</span>
                <h4 className="font-semibold">{skill.name}</h4>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Proficiency</span>
                  <span className="text-sm font-medium">{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-primary rounded-full transition-all duration-300"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(skill)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(skill.id)}
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

export default SkillForm;