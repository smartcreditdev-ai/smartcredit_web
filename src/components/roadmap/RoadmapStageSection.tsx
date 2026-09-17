import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RoadmapCardItem } from "@/data/roadmap";

interface RoadmapStageSectionProps {
  id: string;
  badgeLabel?: string;
  badgeClassName?: string;
  title: string;
  description?: string;
  notes?: string[];
  items: RoadmapCardItem[];
  gridClassName?: string;
  sectionClassName?: string;
  /**
   * Cuando es true, reemplaza el grid por flex-wrap + justify-center para
   * poder centrar una última fila incompleta (ej. Etapa 2 con 7 ítems en 4+3).
   */
  centerLastRow?: boolean;
  /** Ancho de cada card por breakpoint cuando centerLastRow=true. */
  itemClassName?: string;
}

/**
 * Sección de grilla de cards reutilizada por Etapa 1, Etapa 2, Horizontes 2027-2030
 * y Compromisos. Sigue el mismo patrón visual que FeaturesSection (card + ícono con
 * gradiente + motion/useInView).
 */
const RoadmapStageSection = ({
  id,
  badgeLabel,
  badgeClassName,
  title,
  description,
  notes,
  items,
  gridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  sectionClassName = "gradient-subtle",
  centerLastRow = false,
  itemClassName,
}: RoadmapStageSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-16 scroll-mt-24 relative overflow-hidden ${sectionClassName}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {badgeLabel && <Badge className={`mb-4 ${badgeClassName ?? ""}`}>{badgeLabel}</Badge>}
          <h2 className="text-foreground mb-4">{title}</h2>
          {description && <p className="text-xl text-muted-foreground">{description}</p>}
        </motion.div>

        <div className={centerLastRow ? "flex flex-wrap justify-center gap-8" : `grid ${gridClassName} gap-8`}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className={centerLastRow ? itemClassName : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="p-6 h-full border-2 border-border hover:border-primary/30 transition-all duration-300">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {item.eyebrow && (
                    <p className="text-sm font-semibold text-muted-foreground mb-1">{item.eyebrow}</p>
                  )}
                  <h3 className="text-foreground mb-3 font-bold">{item.title}</h3>

                  {item.text && <p className="text-muted-foreground">{item.text}</p>}

                  {item.items && item.items.length > 0 && (
                    <ul className="space-y-2">
                      {item.items.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-muted-foreground">
                          <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {notes && notes.length > 0 && (
          <motion.div
            className="mt-12 max-w-3xl mx-auto text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {notes.map((note) => (
              <p key={note} className="text-sm text-muted-foreground">
                {note}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RoadmapStageSection;
