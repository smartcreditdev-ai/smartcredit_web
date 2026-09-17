import { useQuery } from "@tanstack/react-query";
import { fallbackRoadmapContent, hydrateRoadmapContent, parseRoadmapContent, type RoadmapContent } from "@/data/roadmap";

/**
 * Contenido del Roadmap "actualizable sin redeploy".
 *
 * El mismo roadmap-content.json vive en dos lugares:
 * - horneado en el bundle (fallbackRoadmapContent), garantiza que la página
 *   siempre tenga contenido, sin red.
 * - servido desde GitHub Raw en la rama `main`: si ese archivo cambia, la
 *   web puede leer el cambio en runtime sin un nuevo build.
 *
 * Mientras `feat/sm-roadmap-web` no esté mergeada a `main`, esta URL puede
 * responder 404 — es esperado (ver docs/roadmap-contenido.md), no un bug:
 * el hook cae al fallback local automáticamente en ese caso.
 */
const REMOTE_CONTENT_URL =
  "https://raw.githubusercontent.com/smartcreditdev-ai/smartcredit_web/main/src/data/roadmap-content.json";

const FETCH_TIMEOUT_MS = 8000;
const STALE_TIME_MS = 5 * 60 * 1000; // 5 minutos: el contenido del roadmap cambia poco.

const fetchRoadmapContent = async (): Promise<RoadmapContent> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(REMOTE_CONTENT_URL, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Respuesta HTTP no OK (${response.status})`);
    }

    const json = await response.json();
    const parsed = parseRoadmapContent(json);

    if (!parsed) {
      throw new Error("El JSON remoto no cumple el schema de RoadmapContent.");
    }

    return hydrateRoadmapContent(parsed);
  } catch (error) {
    // Diagnóstico para desarrollo/soporte; nunca se expone al visitante
    // (ni toast, ni mensaje de error) — la página sigue con el fallback local.
    console.warn(
      "[useRoadmapContent] No se pudo obtener el contenido remoto del Roadmap, se usa el snapshot local.",
      error,
    );
    return fallbackRoadmapContent;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Devuelve el contenido del Roadmap. Pinta con el fallback local desde el
 * primer render (`placeholderData`) y dispara el fetch remoto de inmediato
 * en background para reemplazarlo si está disponible y es válido.
 *
 * `placeholderData` (a diferencia de `initialData`) no se persiste en la
 * caché de la query ni cuenta como dato "fresco": la query sigue en estado
 * pending hasta que `queryFn` resuelve, así que `staleTime` no puede impedir
 * ese primer fetch.
 *
 * Con `placeholderData`, TypeScript tipa `query.data` como `RoadmapContent |
 * undefined` (no hay overload de useQuery que lo garantice no-undefined,
 * a diferencia de `initialData`). El `?? fallbackRoadmapContent` de abajo
 * hace ese contrato explícito en el tipo de retorno del hook, sin depender
 * de `strict: false` del tsconfig ni de que Vite no type-chequee el build.
 */
export const useRoadmapContent = () => {
  const query = useQuery<RoadmapContent>({
    queryKey: ["roadmap-content"],
    queryFn: fetchRoadmapContent,
    placeholderData: fallbackRoadmapContent,
    staleTime: STALE_TIME_MS,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    ...query,
    data: query.data ?? fallbackRoadmapContent,
  };
};
