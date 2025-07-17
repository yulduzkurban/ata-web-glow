import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleLinkClick = (link: { name: string; href: string }) => {
    setIsOpen(false);
    if (link.href.startsWith('/')) {
      window.location.href = link.href;
    } else {
      scrollToSection(link.href.substring(1));
    }
  };

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-background/95 backdrop-blur-sm border-r border-border/20 z-50">
        <div className="flex flex-col w-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 mb-8">
            {quickLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className="text-left text-lg text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="pb-4 border-b border-border/20">
                    <h2 className="text-lg font-semibold">Navigation</h2>
                  </div>
                  {quickLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link)}
                      className="text-left p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;