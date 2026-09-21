import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RoadmapStageSection from "@/components/roadmap/RoadmapStageSection";
import ContinuousEvolution from "@/components/roadmap/ContinuousEvolution";
import { useSeo } from "@/hooks/use-seo";
import { useRoadmapContent } from "@/hooks/use-roadmap-content";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Roadmap = () => {
  const { data: content } = useRoadmapContent();

  useSeo({
    title: "Roadmap | SmartCredit",
    description:
      "Conoce el roadmap de SmartCredit: funcionalidades disponibles en producción, desarrollo activo 2026 y horizontes de evolución 2027–2030.",
    canonical: "https://www.smartcreditla.com/roadmap",
    ogTitle: "Roadmap | SmartCredit",
    ogDescription:
      "Descubre qué funcionalidades de SmartCredit están disponibles, qué está en desarrollo y cuáles son los próximos horizontes de evolución.",
    ogUrl: "https://www.smartcreditla.com/roadmap",
  });

  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section ref={heroRef} className="pt-24 pb-16 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 select-none">{content.hero.badge}</Badge>
            <h1 className="text-foreground">{content.hero.title}</h1>
            <p className="text-xl text-muted-foreground">{content.hero.description}</p>
            <div className="flex justify-center pt-2">
              <Button variant="cta" size="xl" onClick={() => scrollToId("etapa-1")}>
                {content.hero.ctaLabel}
                <ArrowDown className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Etapa 1 — Disponible en producción */}
      <RoadmapStageSection
        id="etapa-1"
        badgeLabel={content.stage1.status}
        badgeClassName="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10"
        title={content.stage1.title}
        description={content.stage1.description}
        notes={content.stage1.notes}
        items={content.stage1.categories}
        centerLastRow
        itemClassName="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
        sectionClassName="gradient-subtle"
      />

      {/* Etapa 2 — En desarrollo activo */}
      <RoadmapStageSection
        id="etapa-2"
        badgeLabel={content.stage2.status}
        badgeClassName="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/10"
        title={content.stage2.title}
        description={content.stage2.description}
        items={content.stage2.items}
        centerLastRow
        itemClassName="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
        sectionClassName="bg-background"
      />

      {/* Horizontes 2027-2030 */}
      <RoadmapStageSection
        id="horizontes"
        badgeLabel={content.horizons.badge}
        badgeClassName="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/10"
        title={content.horizons.title}
        description={content.horizons.intro}
        items={content.horizons.items}
        gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        sectionClassName="gradient-subtle"
      />

      {/* Evolución continua */}
      <ContinuousEvolution content={content.continuousEvolution} />

      {/* Compromisos */}
      <RoadmapStageSection
        id="compromisos"
        title={content.commitments.title}
        items={content.commitments.items}
        gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        sectionClassName="bg-background"
      />

      {/* CTA final */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-2xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground">{content.finalCta.title}</h2>
            <p className="text-xl text-muted-foreground">{content.finalCta.description}</p>
          </motion.div>
          <motion.div
            className="flex flex-col lg:flex-row flex-wrap gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Button variant="cta" size="xl" asChild>
              <a href="/#contacto">{content.finalCta.buttons.primary}</a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="/#caracteristicas">{content.finalCta.buttons.secondary}</a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="/#contacto">{content.finalCta.buttons.tertiary}</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Roadmap;
