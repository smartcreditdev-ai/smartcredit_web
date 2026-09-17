import type { LucideIcon } from "lucide-react";
import {
  Users,
  FileText,
  ShieldCheck,
  Wallet,
  Brain,
  Sparkles,
  Workflow,
  TrendingUp,
  Smartphone,
  Building2,
  Lightbulb,
  Search,
  Vote,
  Rocket,
  Clock,
  Eye,
  Trophy,
  KeyRound,
} from "lucide-react";

/**
 * Contenido estructurado del Roadmap de Producto.
 *
 * Fuente funcional: Roadmap_SmartCredit_v3.
 * Este archivo es contenido estático (sin fetch/CMS) para el Bloque 1.
 * El bloque siguiente conectará una fuente actualizable sin redeploy
 * respetando esta misma forma de datos.
 */

export interface RoadmapCardItem {
  icon: LucideIcon;
  /** Etiqueta corta sobre el título, ej. "Etapa 3" */
  eyebrow?: string;
  title: string;
  /** Párrafo único (usado por ej. en Compromisos) */
  text?: string;
  /** Lista de funcionalidades (usado en Etapa 1 y Horizontes) */
  items?: string[];
  /** Clases de gradiente Tailwind para el ícono, ej. "from-emerald-500 to-green-500" */
  color: string;
}

export interface RoadmapStage1 {
  title: string;
  status: string;
  description: string;
  categories: RoadmapCardItem[];
  notes: string[];
}

export interface RoadmapStage2 {
  title: string;
  status: string;
  description: string;
  items: RoadmapCardItem[];
}

export interface RoadmapHorizonsSection {
  title: string;
  intro: string;
  items: RoadmapCardItem[];
}

export interface EvolutionStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ContinuousEvolutionContent {
  title: string;
  intro: string;
  steps: EvolutionStep[];
  suggestionLink: string;
}

export interface CommitmentsSection {
  title: string;
  items: RoadmapCardItem[];
}

export const stage1: RoadmapStage1 = {
  title: "Digitalización del Ciclo Crediticio",
  status: "Disponible hoy en producción",
  description: "Utilizado por instituciones activas en Centroamérica.",
  categories: [
    {
      icon: Users,
      title: "Gestión Comercial",
      color: "from-emerald-500 to-green-500",
      items: [
        "Prospectos y gestión comercial",
        "Agenda y seguimiento comercial",
        "Conversión de prospecto a solicitud",
        "Geolocalización y gestión de campo",
      ],
    },
    {
      icon: FileText,
      title: "Originación del Crédito",
      color: "from-green-500 to-teal-500",
      items: [
        "Solicitud de crédito digital",
        "Expediente electrónico",
        "Gestión documental",
        "Garantías y fiadores",
        "Información económica y financiera",
        "Documentación fotográfica",
        "App móvil — online y offline",
        "OCR: lectura inteligente de documentos",
        "Firma y captura en campo",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Evaluación Crediticia",
      color: "from-teal-500 to-emerald-600",
      items: [
        "Bandejas de análisis",
        "Flujo de aprobación configurable",
        "Comité de crédito",
        "Motor de scoring configurable",
        "Reglas de negocio por institución",
        "Gestión de excepciones",
        "Preaprobación automática",
        "Control inteligente del expediente",
        "Resumen automático con IA",
      ],
    },
    {
      icon: Wallet,
      title: "Gestión de Cartera",
      color: "from-emerald-600 to-green-600",
      items: [
        "Desembolso",
        "Gestión de cartera activa",
        "Cobranza preventiva",
        "Promesas de pago",
        "Renovaciones",
        "Deserciones",
        "Rutero inteligente con IA",
        "KPI de cobranza en tiempo real",
        "Metas por promotor",
      ],
    },
    {
      icon: Brain,
      title: "Inteligencia y Plataforma",
      color: "from-green-600 to-teal-600",
      items: [
        "Dashboard con analítica en tiempo real",
        "Inteligencia Artificial integrada",
        "Integraciones mediante API REST",
        "Documentación interactiva de API",
        "Administración multi-tenant",
        "Facturación automática por roles",
        "Registro de actividad y logs globales",
        "Simulador de préstamos configurable",
        "Fórmulas de cálculo personalizables",
        "Formularios dinámicos por institución",
        "Notificaciones por correo",
        "Chatbot institucional (add-on)",
      ],
    },
  ],
  notes: [
    "Integraciones con bureaus de crédito: disponibles según la oferta de cada país e institución, configuradas como integración de datos.",
    "Chatbot institucional: disponible como módulo complementario con equipo y precio propios.",
  ],
};

export const stage2: RoadmapStage2 = {
  title: "Automatización Inteligente",
  status: "En desarrollo activo · 2026",
  description:
    "Reducir tiempos operativos mediante la automatización de validaciones, controles y procesos del ciclo crediticio.",
  items: [
    { icon: Sparkles, title: "Validaciones inteligentes antes de crear la solicitud", color: "from-amber-500 to-orange-500" },
    { icon: ShieldCheck, title: "Validación automática de políticas de crédito", color: "from-amber-500 to-orange-500" },
    { icon: FileText, title: "Control inteligente del expediente y documentos", color: "from-amber-500 to-orange-500" },
    { icon: Smartphone, title: "Integración con WhatsApp para notificaciones", color: "from-amber-500 to-orange-500" },
    { icon: Sparkles, title: "Alertas y notificaciones automáticas", color: "from-amber-500 to-orange-500" },
    { icon: Workflow, title: "Integración con nuevas fuentes de información", color: "from-amber-500 to-orange-500" },
    { icon: Users, title: "Crédito Grupal", color: "from-amber-500 to-orange-500" },
  ],
};

export const horizonsSection: RoadmapHorizonsSection = {
  title: "Horizontes de Evolución",
  intro:
    "Los siguientes horizontes definen la dirección estratégica de SmartCredit. Las funcionalidades específicas se definen de forma continua a través del proceso de sugerencias de las instituciones.",
  items: [
    {
      icon: Workflow,
      eyebrow: "Etapa 3",
      title: "Inteligencia Operativa",
      color: "from-purple-500 to-pink-500",
      items: [
        "Recomendaciones automáticas para asesores y analistas",
        "Análisis de riesgo avanzado",
        "Indicadores de impacto social",
      ],
    },
    {
      icon: TrendingUp,
      eyebrow: "Etapa 4",
      title: "Analítica Predictiva",
      color: "from-indigo-500 to-purple-500",
      items: [
        "Predicción de mora, renovación y deserción",
        "Segmentación avanzada",
        "Análisis geográfico de cartera",
      ],
    },
    {
      icon: Smartphone,
      eyebrow: "Etapa 5",
      title: "Experiencia Digital",
      color: "from-cyan-500 to-blue-500",
      items: [
        "Portal de autoservicio",
        "Solicitudes y renovaciones digitales",
        "Atención mediante asistentes virtuales",
      ],
    },
    {
      icon: Building2,
      eyebrow: "Etapa 6",
      title: "Inteligencia Institucional",
      color: "from-orange-500 to-red-500",
      items: [
        "Análisis de rentabilidad",
        "Simulación de políticas",
        "Benchmarking sectorial",
        "Indicadores estratégicos",
      ],
    },
  ],
};

export const continuousEvolution: ContinuousEvolutionContent = {
  title: "Evolución Continua — Programa de Mejoras con Instituciones",
  intro:
    "SmartCredit evoluciona junto con las instituciones que la usan. Cada trimestre evaluamos las sugerencias de nuestras instituciones activas y definimos qué nuevas funcionalidades y mejoras ingresan al plan de desarrollo.",
  steps: [
    {
      number: "01",
      title: "Sugerencia",
      description: "La institución registra una mejora o funcionalidad desde el portal de SmartCredit.",
      icon: Lightbulb,
    },
    {
      number: "02",
      title: "Evaluación",
      description: "El equipo analiza impacto, viabilidad técnica y alineación estratégica en máximo 30 días.",
      icon: Search,
    },
    {
      number: "03",
      title: "Votación",
      description: "Las sugerencias aprobadas se publican para que las instituciones puedan votar y priorizar.",
      icon: Vote,
    },
    {
      number: "04",
      title: "Ejecución",
      description:
        "Las más votadas entran al sprint. Se comunica el avance a quien la propuso y a la comunidad.",
      icon: Rocket,
    },
  ],
  suggestionLink: "https://respond.canny.io/feature-request",
};

export const commitmentsSection: CommitmentsSection = {
  title: "Nuestros compromisos con las instituciones participantes",
  items: [
    {
      icon: Clock,
      title: "Ciclo trimestral",
      text: "Toda sugerencia recibe respuesta en máximo 90 días.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Eye,
      title: "Transparencia",
      text: "Las sugerencias aprobadas son visibles para todas las instituciones.",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: Trophy,
      title: "Reconocimiento",
      text: "Quienes proponen mejoras implementadas son reconocidos como co-creadores.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: KeyRound,
      title: "Prioridad de acceso",
      text: "Las instituciones participantes acceden primero a nuevas funcionalidades.",
      color: "from-emerald-500 to-green-500",
    },
  ],
};
