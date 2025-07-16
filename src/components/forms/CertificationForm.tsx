import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, Award, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  image: string;
  description: string;
}

const CertificationForm = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    category: "",
    image: "",
    description: "",
  });
  const { toast } = useToast();

  // Default certifications
  const defaultCertifications: Certification[] = [
    {
      id: "1",
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2023-12-15",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
      description: "Comprehensive certification covering React fundamentals, hooks, state management, and modern patterns."
    },
    {
      id: "2",
      title: "Advanced JavaScript Certification",
      issuer: "freeCodeCamp",
      date: "2023-11-20",
      category: "JavaScript",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&q=80",
      description: "Deep dive into JavaScript ES6+, async programming, and advanced language features."
    },
    {
      id: "3",
      title: "TypeScript Fundamentals",
      issuer: "Microsoft",
      date: "2023-10-10",
      category: "TypeScript",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
      description: "Complete TypeScript training covering types, interfaces, generics, and best practices."
    }
  ];

  useEffect(() => {
    const savedCertifications = JSON.parse(localStorage.getItem("certifications") || "[]");
    if (savedCertifications.length === 0) {
      setCertifications(defaultCertifications);
      localStorage.setItem("certifications", JSON.stringify(defaultCertifications));
    } else {
      setCertifications(savedCertifications);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.issuer || !formData.date || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const certificationData: Certification = {
      id: editingCertification?.id || Date.now().toString(),
      title: formData.title,
      issuer: formData.issuer,
      date: formData.date,
      category: formData.category,
      image: formData.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
      description: formData.description,
    };

    let updatedCertifications;
    if (editingCertification) {
      updatedCertifications = certifications.map(cert => 
        cert.id === editingCertification.id ? certificationData : cert
      );
    } else {
      updatedCertifications = [...certifications, certificationData];
    }

    // Sort by date (newest first)
    updatedCertifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setCertifications(updatedCertifications);
    localStorage.setItem("certifications", JSON.stringify(updatedCertifications));
    
    toast({
      title: "Success",
      description: editingCertification ? "Certification updated successfully" : "Certification added successfully",
    });

    resetForm();
  };

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification);
    setFormData({
      title: certification.title,
      issuer: certification.issuer,
      date: certification.date,
      category: certification.category,
      image: certification.image,
      description: certification.description,
    });
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    const updatedCertifications = certifications.filter(cert => cert.id !== id);
    setCertifications(updatedCertifications);
    localStorage.setItem("certifications", JSON.stringify(updatedCertifications));
    
    toast({
      title: "Success",
      description: "Certification deleted successfully",
    });
  };

  const resetForm = () => {
    setEditingCertification(null);
    setIsAddingNew(false);
    setFormData({
      title: "",
      issuer: "",
      date: "",
      category: "",
      image: "",
      description: "",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      TypeScript: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Design: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      Performance: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Tools: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    };
    return colors[category as keyof typeof colors] || colors.Tools;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Manage Certifications</h3>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Certification
        </Button>
      </div>

      {isAddingNew && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>
              {editingCertification ? "Edit Certification" : "Add New Certification"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Certification Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="React Developer Certification"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issuer">Issuer *</Label>
                  <Input
                    id="issuer"
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleInputChange}
                    required
                    placeholder="Meta"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="TypeScript">TypeScript</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/certificate.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description of the certification..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  <Save className="w-4 h-4 mr-2" />
                  {editingCertification ? "Update" : "Add"} Certification
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
        {certifications.map((cert) => (
          <Card key={cert.id} className="group hover:shadow-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <Badge className={getCategoryColor(cert.category)}>
                    {cert.category}
                  </Badge>
                </div>
              </div>

              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />

              <h4 className="font-semibold mb-1">{cert.title}</h4>
              <p className="text-primary font-medium mb-2">{cert.issuer}</p>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" />
                {formatDate(cert.date)}
              </div>
              
              {cert.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {cert.description}
                </p>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(cert)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(cert.id)}
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

export default CertificationForm;