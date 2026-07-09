import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import famaLogo from "@/assets/logos/logo_fama.png";
import finacreditLogo from "@/assets/logos/logo_finacredit.png";
import puenteDeAmistadLogo from "@/assets/logos/logo_puente_de_amistad.png";
import yamnonhLogo from "@/assets/logos/logo_yamnonh.png";

const InstitutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const institutions = [
    { name: "FAMA", logo: famaLogo },
    { name: "Finacredit", logo: finacreditLogo },
    { name: "Puente de Amistad", logo: puenteDeAmistadLogo },
    { name: "Yamanonh", logo: yamnonhLogo },
  ];

  return (
    <section id="instituciones" ref={sectionRef} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-foreground mb-4">
            Impulsando la transformación digital de instituciones financieras
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SmartCredit acompaña a instituciones financieras en la digitalización de sus procesos de crédito, evaluación, rutas y gestión operativa.
          </p>
        </motion.div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {institutions.map((institution, index) => (
            <motion.div
              key={institution.name}
              className="flex flex-col items-center p-5 bg-white border border-border rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="h-28 w-full flex items-center justify-center mb-2">
                <img
                  src={institution.logo}
                  alt={`Logo de ${institution.name}`}
                  className="max-h-full max-w-full w-auto object-contain"
                />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground text-center">{institution.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionsSection;
