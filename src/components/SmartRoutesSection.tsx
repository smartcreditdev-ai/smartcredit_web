import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";

const items = [
  { emoji: "🗺️", text: "Rutas por ubicación del cliente (menos traslados, más eficiencia)" },
  { emoji: "💰", text: "Prioridad por impacto: mora, promesas de pago y vencimientos" },
  {
    emoji: "📥",
    text: "Rutas para todo el ciclo: cobranza, solicitudes, prospección, renovaciones y deserciones",
  },
  { emoji: "🔎", text: "Trazabilidad por visita: qué se hizo, resultado y evidencia" },
  {
    emoji: "📊",
    text: "Seguimiento y métricas: productividad por asesor/zona y efectividad de gestiones",
  },
  { emoji: "🚨", text: "Alertas tempranas: casos críticos primero (sin perder control)" },
];

const SmartRoutesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <section
      id="rutas-inteligentes"
      ref={sectionRef}
      className="py-20 bg-muted/30 relative overflow-hidden border-y border-border/50"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 right-0 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-12 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <h2 className="text-foreground mb-4">
            Rutas Inteligentes para Gestión en Campo
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Optimice recorridos, priorice impacto y mantenga trazabilidad completa del trabajo en terreno con SmartCredit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <Card className="overflow-hidden border-2 border-border/80 shadow-lg bg-card/80 backdrop-blur-sm p-2 sm:p-3">
              <div className="rounded-xl overflow-hidden bg-black/5 aspect-video">
                <video
                  src="/rutero.mp4"
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                >
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-3 px-2">
                Cómo se generan las rutas en la plataforma
              </p>
            </Card>
          </motion.div>

          <motion.ul
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 * index }}
              >
                <div className="flex gap-3 sm:gap-4 p-4 rounded-xl bg-card/60 border border-border hover:border-primary/25 transition-colors">
                  <span className="text-2xl shrink-0 leading-none pt-0.5" aria-hidden>
                    {item.emoji}
                  </span>
                  <p className="text-foreground text-[15px] sm:text-base leading-snug pt-0.5">
                    {item.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default SmartRoutesSection;
