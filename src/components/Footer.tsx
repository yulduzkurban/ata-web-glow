import { Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/yulduzxon-atajonova-77b186261/",
      icon: Linkedin
    },
    {
      name: "GitLab",
      url: "https://gitlab.com/alisherz1980",
      icon: Github
    },
    {
      name: "Email",
      url: "mailto:yulduzkurban@gmail.com",
      icon: Mail
    },
    {
      name: "Telegram",
      url: "https://t.me/yulduzxon",
      icon: Send
    }
  ];

  const quickLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Timeline", href: "#timeline" },
    { name: "Contact", href: "#contact" },
    { name: "Settings", href: "/settings" }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Yulduzxon Atajonova
              </span>
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Frontend Developer passionate about creating beautiful, functional, and user-friendly web experiences using modern technologies.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(social.url, "_blank")}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href.substring(1))}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Frontend Development</li>
              <li>React Applications</li>
              <li>Responsive Design</li>
              <li>UI/UX Implementation</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} Built with ❤️ by Yulduzxon Atajonova. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;