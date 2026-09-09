# Contrato de despliegue privado en Mona

Owning issue: #1.

## Objetivo

Servir este repositorio como preview autenticado, sin intervenir los servicios existentes de Mona.

## Ruta

- Host propuesto: `testimonios-preview.harmonicbeacon.com`
- Entrada: `/testimonios/`
- Raíz: redirige a `/testimonios/`
- Acceso: autenticado
- Robots: `noindex`, `nofollow`, `noarchive`

## Frontera del artefacto

Permitido:

- `index.html`
- `testimonios/`
- `assets/hb-brand.css`
- `assets/hb-global-nav.js`
- `assets/hb-main.js`
- `assets/img/testimonios-review/*.png`
- `assets/video/testimonios-review/*.mp4`
- `favicon.svg`

La traducción editorial incluida en `testimonios/translations.js` contiene sólo los fragmentos
curados visibles en la interfaz; no incorpora transcripciones fuente ni material privado adicional.

Prohibido:

- grabaciones originales;
- transcripciones o subtítulos fuente;
- fotogramas de referencia;
- datos de contacto;
- secretos o archivos de entorno;
- rutas, logs o configuración de otros servicios.

## Operación solicitada

CompAII define una interfaz de mínimo privilegio con `status`, `preflight`, `deploy`, `smoke` y
`rollback last`. El despliegue debe validar checkout limpio, revisión autorizada, lista cerrada de
rutas y ausencia de extensiones prohibidas. No debe reiniciar ni modificar el bot.

## Smoke mínimo

- `/` responde y redirige a `/testimonios/`.
- `/testimonios/` responde `200` sólo después de autenticación.
- un avatar y un video curado responden `200` y admiten range requests.
- originales, transcripciones y rutas desconocidas no son accesibles.
- la respuesta incluye `X-Robots-Tag: noindex, nofollow, noarchive`.
