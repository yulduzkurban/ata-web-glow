import { Card, CardContent } from "@/components/ui/card";

const SkillsSection = () => {
  const skills = [
    { name: "HTML", icon: "🌐", level: "Expert" },
    { name: "CSS", icon: "🎨", level: "Expert" },
    { name: "JavaScript", icon: "💛", level: "Expert" },
    { name: "React", icon: "⚛️", level: "Expert" },
    { name: "Tailwind CSS", icon: "🎯", level: "Expert" },
    { name: "TypeScript", icon: "🔷", level: "Advanced" },
    { name: "Next.js", icon: "▲", level: "Advanced" },
    { name: "Git", icon: "🌿", level: "Advanced" },
    { name: "Figma", icon: "🎨", level: "Intermediate" },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {skills.map((skill) => (
            <Card key={skill.name} className="group hover:shadow-glow transition-all duration-300 backdrop-blur-sm bg-card/80 border-border/20">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <p className="text-sm text-muted-foreground">{skill.level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;