# SM Roadmap — Contenido Editable

## Fuente

`src/data/roadmap-content.json` — textos, listas, badges, labels de botones, iconos.

## Actualizar

1. Editar en `main` (GitHub o PR).
2. Mantener schema (mismos campos/tipos).
3. Mergear a `main`.

La web consulta:

```txt
https://raw.githubusercontent.com/smartcreditdev-ai/smartcredit_web/main/src/data/roadmap-content.json
```

Sin rebuild. Cambios visibles en ~5 min (después del refetch).

## Fallback

Si remoto falla/timeout/invalid, usa snapshot del bundle (último deploy).

Iconos: `users`, `file-text`, `shield-check`, `wallet`, `brain`, `sparkles`,
`workflow`, `trending-up`, `smartphone`, `building-2`, `lightbulb`, `search`,
`vote`, `rocket`, `clock`, `eye`, `trophy`, `key-round`. Otro = fallback icon.

## No editar desde JSON

Estilos, clases, colores, breakpoints, URLs internas, componentes.
Link de sugerencias es fijo en código.

## Rollback

Revertir commit del JSON a versión anterior.
