import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education" | "certification";
}

const TimelineForm = () => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    company: "",
    description: "",
    type: "work" as "work" | "education" | "certification",
  });
  const { toast } = useToast();

  // Default timeline items
  const defaultItems: TimelineItem[] = [
    {
      id: "1",
      year: "2024",
      title: "Frontend Developer Intern",
      company: "Tech Company",
      description: "Developed modern web applications using React and TypeScript",
      type: "work"
    },
    {
      id: "2",
      year: "2023",
      title: "Computer Science Degree",
      company: "University",
      description: "Graduated with honors in Computer Science",
      type: "education"
    },
    {
      id: "3",
      year: "2021",
      title: "React Developer Certification",
      company: "Online Academy",
      description: "Completed advanced React development certification",
      type: "certification"
    }
  ];

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("timeline") || "[]");
    if (savedItems.length === 0) {
      setTimelineItems(defaultItems);
      localStorage.setItem("timeline", JSON.stringify(defaultItems));
    } else {
      setTimelineItems(savedItems);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value as "work" | "education" | "certification"
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.year || !formData.title || !formData.company || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const timelineData: TimelineItem = {
      id: editingItem?.id || Date.now().toString(),
      year: formData.year,
      title: formData.title,
      company: formData.company,
      description: formData.description,
      type: formData.type,
    };

    let updatedItems;
    if (editingItem) {
      updatedItems = timelineItems.map(item => 
        item.id === editingItem.id ? timelineData : item
      );
    } else {
      updatedItems = [...timelineItems, timelineData];
    }

    // Sort by year (descending)
    updatedItems.sort((a, b) => parseInt(b.year) - parseInt(a.year));

    setTimelineItems(updatedItems);
    localStorage.setItem("timeline", JSON.stringify(updatedItems));
    
    toast({
      title: "Success",
      description: editingItem ? "Timeline item updated successfully" : "Timeline item added successfully",
    });

    resetForm();
  };

  const handleEdit = (item: TimelineItem) => {
    setEditingItem(item);
    setFormData({
      year: item.year,
      title: item.title,
      company: item.company,
      description: item.description,
      type: item.type,
    });
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    const updatedItems = timelineItems.filter(item => item.id !== id);
    setTimelineItems(updatedItems);
    localStorage.setItem("timeline", JSON.stringify(updatedItems));
    
    toast({
      title: "Success",
      description: "Timeline item deleted successfully",
    });
  };

  const resetForm = () => {
    setEditingItem(null);
    setIsAddingNew(false);
    setFormData({
      year: "",
      title: "",
      company: "",
      description: "",
      type: "work",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-blue-500 text-white";
      case "education":
        return "bg-green-500 text-white";
      case "certification":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Manage Timeline</h3>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Timeline Item
        </Button>
      </div>

      {isAddingNew && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>
              {editingItem ? "Edit Timeline Item" : "Add New Timeline Item"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    placeholder="2024"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="certification">Certification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Frontend Developer"
                />
              </div>

              <div>
                <Label htmlFor="company">Company/Institution *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  placeholder="Tech Company"
                />
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
                  placeholder="Brief description of your role or achievement"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? "Update" : "Add"} Item
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
        {timelineItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-primary">{item.year}</span>
                <Badge className={getTypeColor(item.type)}>
                  {item.type}
                </Badge>
              </div>
              <h4 className="font-semibold mb-1">{item.title}</h4>
              <p className="text-primary font-medium mb-2">{item.company}</p>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
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

export default TimelineForm;