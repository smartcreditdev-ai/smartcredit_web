import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import logo from "@/assets/logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { goToSection, goToRoadmap } = useSectionNavigation();

  const handleSectionClick = (id: string) => {
    goToSection(id);
    setMobileMenuOpen(false);
  };

  const handleRoadmapClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isModifiedClick = event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModifiedClick) return;

    event.preventDefault();
    goToRoadmap();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="SmartCredit Logo" className="h-16 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => handleSectionClick("inicio")} className="text-foreground hover:text-primary transition-smooth">
              Inicio
            </button>
            <button onClick={() => handleSectionClick("caracteristicas")} className="text-foreground hover:text-primary transition-smooth">
              Características
            </button>
            <button onClick={() => handleSectionClick("rutas-inteligentes")} className="text-foreground hover:text-primary transition-smooth">
              Rutas
            </button>
            <button onClick={() => handleSectionClick("tecnologia")} className="text-foreground hover:text-primary transition-smooth">
              Tecnología
            </button>
            <button onClick={() => handleSectionClick("beneficios")} className="text-foreground hover:text-primary transition-smooth">
              Beneficios
            </button>
            <Link to="/roadmap" onClick={handleRoadmapClick} className="text-foreground hover:text-primary transition-smooth">
              SM Roadmap
            </Link>
            <button onClick={() => handleSectionClick("contacto")} className="text-foreground hover:text-primary transition-smooth">
              Contacto
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="cta" size="lg" onClick={() => handleSectionClick("contacto")}>
              Solicitar Demo
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open("https://app.smartcreditla.com/login", "_blank")} className="shadow-lg hover:shadow-glow">
              Iniciar Sesión
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button onClick={() => handleSectionClick("inicio")} className="text-foreground hover:text-primary transition-smooth text-left">
              Inicio
            </button>
            <button onClick={() => handleSectionClick("caracteristicas")} className="text-foreground hover:text-primary transition-smooth text-left">
              Características
            </button>
            <button onClick={() => handleSectionClick("rutas-inteligentes")} className="text-foreground hover:text-primary transition-smooth text-left">
              Rutas
            </button>
            <button onClick={() => handleSectionClick("tecnologia")} className="text-foreground hover:text-primary transition-smooth text-left">
              Tecnología
            </button>
            <button onClick={() => handleSectionClick("beneficios")} className="text-foreground hover:text-primary transition-smooth text-left">
              Beneficios
            </button>
            <Link
              to="/roadmap"
              onClick={(e) => {
                handleRoadmapClick(e);
                setMobileMenuOpen(false);
              }}
              className="text-foreground hover:text-primary transition-smooth text-left"
            >
              SM Roadmap
            </Link>
            <button onClick={() => handleSectionClick("contacto")} className="text-foreground hover:text-primary transition-smooth text-left">
              Contacto
            </button>
            <Button variant="cta" size="lg" onClick={() => handleSectionClick("contacto")} className="w-full">
              Solicitar Demo
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open("https://app.smartcreditla.com/login", "_blank")} className="w-full shadow-lg hover:shadow-glow">
              Iniciar Sesión
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
