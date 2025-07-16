import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "@/components/forms/ProjectForm";
import SkillForm from "@/components/forms/SkillForm";
import TimelineForm from "@/components/forms/TimelineForm";
import TestimonialForm from "@/components/forms/TestimonialForm";
import CertificationForm from "@/components/forms/CertificationForm";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-card/80 border-border/20">
          <CardHeader>
            <CardTitle className="text-2xl">Manage Portfolio Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-6">
                <ProjectForm />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <SkillForm />
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <TimelineForm />
              </TabsContent>

              <TabsContent value="testimonials" className="mt-6">
                <TestimonialForm />
              </TabsContent>

              <TabsContent value="certifications" className="mt-6">
                <CertificationForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;