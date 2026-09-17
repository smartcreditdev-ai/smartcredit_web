import { useQuery } from "@tanstack/react-query";
import { fallbackRoadmapContent, hydrateRoadmapContent, parseRoadmapContent, type RoadmapContent } from "@/data/roadmap";

// Contenido del Roadmap desde GitHub Raw (main) + fallback local.
// Si falla remoto, usa snapshot del bundle. 404 es esperado pre-merge.
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

// placeholderData pinta fallback inmediatamente, fetch remoto en background.
// Si remoto falla/timeout/invalid, mantiene fallback. data nunca undefined.
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
