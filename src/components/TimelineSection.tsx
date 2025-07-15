import { Card, CardContent } from "@/components/ui/card";

const TimelineSection = () => {
  const timelineItems = [
    {
      year: "2024",
      title: "Frontend Developer",
      company: "Freelance",
      description: "Building modern web applications with React, TypeScript, and Tailwind CSS for various clients.",
      type: "work"
    },
    {
      year: "2023",
      title: "Frontend Development Certification",
      company: "Various Platforms",
      description: "Completed multiple certifications in React, JavaScript, and modern web development practices.",
      type: "certification"
    },
    {
      year: "2022",
      title: "Web Development Bootcamp",
      company: "Self-Study",
      description: "Intensive learning of HTML, CSS, JavaScript, and modern frameworks through online courses and projects.",
      type: "education"
    },
    {
      year: "2021",
      title: "Computer Science Studies",
      company: "University",
      description: "Studied computer science fundamentals including algorithms, data structures, and programming principles.",
      type: "education"
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
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Professional Timeline
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey in web development and professional growth
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary"></div>
            
            {timelineItems.map((item, index) => (
              <div key={index} className="relative flex items-center mb-12">
                {/* Timeline dot */}
                <div className={`w-4 h-4 rounded-full ${getTypeColor(item.type)} absolute left-6 z-10`}></div>
                
                <Card className="ml-20 flex-1 backdrop-blur-sm bg-card/80 border-border/20 hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-primary">{item.year}</span>
                      <div className="flex-1 h-px bg-gradient-primary opacity-30"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-primary font-medium mb-2">{item.company}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;