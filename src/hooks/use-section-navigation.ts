import { useLocation, useNavigate } from "react-router-dom";

/**
 * Navegación de secciones compartida entre Header y Footer.
 *
 * En "/": scrollea directamente a la sección (smooth scroll, sin navegar,
 * sin reload) — comportamiento histórico intacto.
 * Fuera de "/": navega a "/#id"; el useEffect de hash en Index.tsx hace
 * el scroll una vez que el Home termina de montar.
 */
export const useSectionNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id: string) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/#${id}`);
  };

  const goToRoadmap = () => {
    window.scrollTo({ top: 0, left: 0 });
    navigate("/roadmap");
  };

  return { goToSection, goToRoadmap };
};
