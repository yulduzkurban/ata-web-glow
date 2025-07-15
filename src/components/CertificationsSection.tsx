import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const CertificationsSection = () => {
  const certifications = [
    {
      id: 1,
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2023-12-15",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
      description: "Comprehensive certification covering React fundamentals, hooks, state management, and modern patterns."
    },
    {
      id: 2,
      title: "Advanced JavaScript Certification",
      issuer: "freeCodeCamp",
      date: "2023-11-20",
      category: "JavaScript",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&q=80",
      description: "Deep dive into JavaScript ES6+, async programming, and advanced language features."
    },
    {
      id: 3,
      title: "TypeScript Fundamentals",
      issuer: "Microsoft",
      date: "2023-10-10",
      category: "TypeScript",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
      description: "Complete TypeScript training covering types, interfaces, generics, and best practices."
    },
    {
      id: 4,
      title: "Responsive Web Design",
      issuer: "Google",
      date: "2023-09-05",
      category: "Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
      description: "Modern responsive design techniques using CSS Grid, Flexbox, and mobile-first approaches."
    },
    {
      id: 5,
      title: "Web Performance Optimization",
      issuer: "Coursera",
      date: "2023-08-18",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80",
      description: "Advanced techniques for optimizing web performance, loading times, and user experience."
    },
    {
      id: 6,
      title: "Git & Version Control",
      issuer: "GitHub",
      date: "2023-07-12",
      category: "Tools",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=300&q=80",
      description: "Mastering Git workflows, branching strategies, and collaborative development practices."
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
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

  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development through industry certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <Card key={cert.id} className="group hover:shadow-glow transition-all duration-300 backdrop-blur-sm bg-card/80 border-border/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge className={getCategoryColor(cert.category)}>
                        {cert.category}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-4">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(cert.date)}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {cert.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;