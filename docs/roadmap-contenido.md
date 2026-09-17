# Contenido del SM Roadmap

## Fuente de verdad

`src/data/roadmap-content.json`

Todo el texto visible de `/roadmap` (hero, Etapa 1, Etapa 2, horizontes 3–6,
evolución continua, compromisos y CTA final) vive en este archivo. El
código (`src/data/roadmap.ts`, `Roadmap.tsx`, componentes de `roadmap/**`)
no duplica esos textos: sólo lee este JSON.

## Cómo actualizar

1. Editar `src/data/roadmap-content.json` en la rama `main` (directamente en
   GitHub o mediante un PR normal).
2. Mantener el schema: mismos campos, mismo tipo de dato por campo (ver
   sección "Qué puede editar Producto" abajo). No hace falta tocar código.
3. Mergear/guardar el cambio en `main`.

La página intenta leer en runtime:

```
https://raw.githubusercontent.com/smartcreditdev-ai/smartcredit_web/main/src/data/roadmap-content.json
```

Por eso una actualización válida del JSON en `main` puede ser consumida por
la web **sin depender de un nuevo build/deploy** de la aplicación. Puede
existir cache del CDN de GitHub o del navegador durante algunos minutos
(el sitio revalida cada ~5 minutos).

## Fallback

El mismo `roadmap-content.json` también se importa dentro del bundle como
snapshot (`fallbackRoadmapContent` en `src/data/roadmap.ts`) y se usa desde
el primer render, sin esperar a la red.

Si la fuente remota (GitHub Raw):

- no responde,
- devuelve un HTTP distinto de OK,
- tarda más de ~8 segundos,
- devuelve un JSON inválido, o
- no cumple el schema (`src/data/roadmap.ts`),

la página continúa mostrando el snapshot del último deploy. Nunca queda
vacía ni muestra un error al visitante; el detalle del fallo queda sólo en
`console.warn` para diagnóstico.

## Qué puede editar Producto

Los textos y listas del JSON: títulos, descripciones, badges, ítems de cada
categoría, pasos de evolución continua, compromisos y labels de botones.
También el campo `icon` de cada card, pero sólo usando una de las claves ya
soportadas por el código (`src/data/roadmap.ts`, whitelist `ICON_MAP`):
`users`, `file-text`, `shield-check`, `wallet`, `brain`, `sparkles`,
`workflow`, `trending-up`, `smartphone`, `building-2`, `lightbulb`,
`search`, `vote`, `rocket`, `clock`, `eye`, `trophy`, `key-round`. Una clave
fuera de esa lista no rompe la página: se muestra un ícono genérico de
respaldo.

## Qué NO editar desde el JSON

Estilos, clases CSS, colores/gradientes, breakpoints, destinos de
navegación (`/#contacto`, `/#caracteristicas`, etc.), componentes React ni
código. Todo eso vive en `Roadmap.tsx` y en los componentes de
`src/components/roadmap/`. El link de sugerencias
(`https://respond.canny.io/feature-request`) también es fijo en código
(`SUGGESTION_LINK` en `src/data/roadmap.ts`).

## Rollback

Revertir el commit del JSON en `main` a la versión anterior. La web vuelve
a leer ese contenido en el siguiente refetch (o de inmediato si se fuerza
un nuevo deploy, que también actualiza el fallback local).
