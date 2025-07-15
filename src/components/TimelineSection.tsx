import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

const TimelineSection = () => {
  const timelineItems = [
    {
      year: "2024",
      title: "Frontend Developer Intern",
      company: "Tech Company",
      description: "Developed modern web applications using React and TypeScript",
      type: "work"
    },
    {
      year: "2023",
      title: "Computer Science Degree",
      company: "University",
      description: "Graduated with honors in Computer Science",
      type: "education"
    },
    {
      year: "2021",
      title: "React Developer Certification",
      company: "Online Academy",
      description: "Completed advanced React development certification",
      type: "certification"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-gradient-primary";
      case "certification":
        return "bg-gradient-secondary";
      case "education":
        return "bg-gradient-accent";
      default:
        return "bg-gradient-primary";
    }
  };

  return (
    <section id="timeline" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Professional Timeline
              </span>
            </h2>
            <Button variant="outline" size="sm" className="opacity-70 hover:opacity-100">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="opacity-70 hover:opacity-100">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey so far
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-primary"></div>
            
            {timelineItems.map((item, index) => (
              <div key={index} className="relative mb-12">
                {/* Timeline dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${getTypeColor(item.type)} z-10`}></div>
                
                {/* Timeline item */}
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1/2"></div>
                  <Card className={`w-1/2 backdrop-blur-sm bg-card/80 border-border/20 hover:shadow-glow transition-all duration-300 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-primary font-medium mb-2">{item.company}</p>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;