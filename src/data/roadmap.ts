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
  Circle,
} from "lucide-react";
import { z } from "zod";
import rawFallbackContent from "./roadmap-content.json";

// Fuente: src/data/roadmap-content.json
// Colores/gradientes viven en código (STAGE1_COLORS, etc.), nunca en JSON.
// Whitelist de íconos: el JSON sólo puede referenciar por string clave.

// Whitelist de íconos

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  "file-text": FileText,
  "shield-check": ShieldCheck,
  wallet: Wallet,
  brain: Brain,
  sparkles: Sparkles,
  workflow: Workflow,
  "trending-up": TrendingUp,
  smartphone: Smartphone,
  "building-2": Building2,
  lightbulb: Lightbulb,
  search: Search,
  vote: Vote,
  rocket: Rocket,
  clock: Clock,
  eye: Eye,
  trophy: Trophy,
  "key-round": KeyRound,
};

/** Ícono seguro para claves desconocidas (contenido remoto con un icon key nuevo/typo). */
const FALLBACK_ICON: LucideIcon = Circle;

const resolveIcon = (key: string): LucideIcon => ICON_MAP[key] ?? FALLBACK_ICON;

// Schema Zod — valida remoto, texto-only rendering
const textField = (max: number) => z.string().trim().min(1).max(max);

/** Slug en minúsculas (a-z, 0-9, guiones): sanitiza el campo, no depende de la whitelist. */
const iconKeyField = z
  .string()
  .trim()
  .min(1)
  .max(40)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'icon debe ser un slug en minúsculas, ej. "file-text"');

const cardItemSchema = z.object({
  icon: iconKeyField,
  eyebrow: textField(60).optional(),
  title: textField(150),
  text: textField(400).optional(),
  items: z.array(textField(200)).min(1).optional(),
});

const roadmapContentSchema = z.object({
  hero: z.object({
    badge: textField(80),
    title: textField(200),
    description: textField(500),
    ctaLabel: textField(80),
  }),
  stage1: z.object({
    title: textField(150),
    status: textField(100),
    description: textField(300),
    categories: z.array(cardItemSchema).min(1),
    notes: z.array(textField(400)),
  }),
  stage2: z.object({
    title: textField(150),
    status: textField(100),
    description: textField(400),
    items: z.array(cardItemSchema).min(1),
  }),
  horizons: z.object({
    badge: textField(80),
    title: textField(150),
    intro: textField(500),
    items: z.array(cardItemSchema).min(1),
  }),
  continuousEvolution: z.object({
    title: textField(150),
    intro: textField(500),
    steps: z
      .array(
        z.object({
          number: textField(4),
          icon: iconKeyField,
          title: textField(100),
          description: textField(300),
        }),
      )
      .min(1),
  }),
  commitments: z.object({
    title: textField(150),
    items: z.array(cardItemSchema).min(1),
  }),
  finalCta: z.object({
    title: textField(150),
    description: textField(300),
    buttons: z.object({
      primary: textField(60),
      secondary: textField(60),
      tertiary: textField(60),
    }),
  }),
});

export type RoadmapContentDocument = z.infer<typeof roadmapContentSchema>;
type RoadmapContentCardItem = z.infer<typeof cardItemSchema>;

/** Valida un payload arbitrario (típicamente `await response.json()`). null si no cumple el schema. */
export const parseRoadmapContent = (data: unknown): RoadmapContentDocument | null => {
  const result = roadmapContentSchema.safeParse(data);
  return result.success ? result.data : null;
};

// URL controlada por código: el contenido remoto/local nunca puede definir destinos propios.
export const SUGGESTION_LINK = "https://respond.canny.io/feature-request";

// ---------------------------------------------------------------------------
// Colores/gradientes por posición — viven en código, nunca en el JSON.
// ---------------------------------------------------------------------------

const STAGE1_COLORS = [
  "from-emerald-500 to-green-500",
  "from-green-500 to-teal-500",
  "from-teal-500 to-emerald-600",
  "from-emerald-600 to-green-600",
  "from-green-600 to-teal-600",
];
const STAGE2_COLORS = ["from-amber-500 to-orange-500"];
const HORIZON_COLORS = [
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-purple-500",
  "from-cyan-500 to-blue-500",
  "from-orange-500 to-red-500",
];
const COMMITMENT_COLORS = [
  "from-blue-500 to-cyan-500",
  "from-cyan-500 to-teal-500",
  "from-teal-500 to-emerald-500",
  "from-emerald-500 to-green-500",
];
/** Fallback defensivo si algún día el contenido trae más ítems que colores definidos. */
const DEFAULT_COLOR = "from-primary to-secondary";

const colorAt = (colors: string[], index: number) => colors[index] ?? colors[colors.length - 1] ?? DEFAULT_COLOR;

export interface RoadmapCardItem {
  icon: LucideIcon;
  eyebrow?: string;
  title: string;
  text?: string;
  items?: string[];
  color: string;
}

export interface RoadmapHero {
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
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
  badge: string;
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

export interface RoadmapFinalCta {
  title: string;
  description: string;
  buttons: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export interface RoadmapContent {
  hero: RoadmapHero;
  stage1: RoadmapStage1;
  stage2: RoadmapStage2;
  horizons: RoadmapHorizonsSection;
  continuousEvolution: ContinuousEvolutionContent;
  commitments: CommitmentsSection;
  finalCta: RoadmapFinalCta;
}

const hydrateCardItems = (items: RoadmapContentCardItem[], colors: string[]): RoadmapCardItem[] =>
  items.map((item, index) => ({
    icon: resolveIcon(item.icon),
    eyebrow: item.eyebrow,
    title: item.title,
    text: item.text,
    items: item.items,
    color: colorAt(colors, index),
  }));

export const hydrateRoadmapContent = (doc: RoadmapContentDocument): RoadmapContent => ({
  hero: {
    badge: doc.hero.badge,
    title: doc.hero.title,
    description: doc.hero.description,
    ctaLabel: doc.hero.ctaLabel,
  },
  stage1: {
    title: doc.stage1.title,
    status: doc.stage1.status,
    description: doc.stage1.description,
    categories: hydrateCardItems(doc.stage1.categories, STAGE1_COLORS),
    notes: doc.stage1.notes,
  },
  stage2: {
    title: doc.stage2.title,
    status: doc.stage2.status,
    description: doc.stage2.description,
    items: hydrateCardItems(doc.stage2.items, STAGE2_COLORS),
  },
  horizons: {
    badge: doc.horizons.badge,
    title: doc.horizons.title,
    intro: doc.horizons.intro,
    items: hydrateCardItems(doc.horizons.items, HORIZON_COLORS),
  },
  continuousEvolution: {
    title: doc.continuousEvolution.title,
    intro: doc.continuousEvolution.intro,
    steps: doc.continuousEvolution.steps.map((step) => ({
      number: step.number,
      title: step.title,
      description: step.description,
      icon: resolveIcon(step.icon),
    })),
    suggestionLink: SUGGESTION_LINK,
  },
  commitments: {
    title: doc.commitments.title,
    items: hydrateCardItems(doc.commitments.items, COMMITMENT_COLORS),
  },
  finalCta: {
    title: doc.finalCta.title,
    description: doc.finalCta.description,
    buttons: {
      primary: doc.finalCta.buttons.primary,
      secondary: doc.finalCta.buttons.secondary,
      tertiary: doc.finalCta.buttons.tertiary,
    },
  },
});

// Fallback local: snapshot en bundle
const parsedFallback = parseRoadmapContent(rawFallbackContent);

if (!parsedFallback) {
  // Sólo puede pasar si roadmap-content.json se edita con un shape roto.
  // Falla rápido (build/arranque) en vez de silenciosamente en producción.
  throw new Error(
    "src/data/roadmap-content.json no cumple el schema de RoadmapContent. Revisar su estructura.",
  );
}

export const fallbackRoadmapContent: RoadmapContent = hydrateRoadmapContent(parsedFallback);
