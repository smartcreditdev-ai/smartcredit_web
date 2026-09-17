import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContinuousEvolutionContent } from "@/data/roadmap";

interface ContinuousEvolutionProps {
  content: ContinuousEvolutionContent;
}

/**
 * Flujo 01 -> 02 -> 03 -> 04 del programa de mejoras continuas.
 * Horizontal en desktop, apilado en mobile (sin conector, para mantenerlo simple).
 *
 * Recibe el contenido por props: el único consumo de useRoadmapContent()
 * vive en Roadmap.tsx.
 */
const ContinuousEvolution = ({ content }: ContinuousEvolutionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { title, intro, steps, suggestionLink } = content;

  return (
    <section
      id="evolucion-continua"
      ref={sectionRef}
      className="py-16 scroll-mt-24 bg-card relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-foreground mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground">{intro}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Fragment key={step.number}>
                <motion.div
                  className="lg:flex-1 h-full bg-background border-2 border-border rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="w-12 h-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                    {step.number}
                  </div>
                  <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <h3 className="text-foreground font-bold mb-2 text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>

                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block w-6 h-6 text-primary shrink-0 mx-auto" />
                )}
              </Fragment>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button variant="outline" asChild>
            <a href={suggestionLink} target="_blank" rel="noopener noreferrer">
              Proponer una mejora
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContinuousEvolution;
