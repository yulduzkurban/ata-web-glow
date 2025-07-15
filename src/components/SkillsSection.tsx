import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    { name: "HTML", icon: "🌐", proficiency: 95 },
    { name: "CSS", icon: "🎨", proficiency: 94 },
    { name: "JavaScript", icon: "💛", proficiency: 88 },
    { name: "React", icon: "⚛️", proficiency: 92 },
    { name: "Tailwind", icon: "🎯", proficiency: 90 },
    { name: "TypeScript", icon: "🔷", proficiency: 85 },
    { name: "Git", icon: "🌿", proficiency: 88 },
    { name: "Figma", icon: "🎨", proficiency: 78 },
    { name: "Next.js", icon: "▲", proficiency: 82 },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Skills Matrix
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
            Technologies I work with
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-3 min-w-[150px]">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold text-lg">{skill.name}</span>
                  </div>
                  <div className="flex-1 bg-muted/30 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                    {skill.proficiency}% proficiency
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;