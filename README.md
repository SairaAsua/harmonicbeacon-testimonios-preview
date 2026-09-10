# Harmonic Beacon — Voces

Repositorio de la galería de relatos y testimonios de Harmonic Beacon, preparado para GitHub Pages.

## Estado

- Superficie: `review`
- Ruta canónica del paquete: `/testimonios/`
- Dominio preparado: `https://voces.harmonicbeacon.com/`
- Publicación abierta: no autorizada hasta documentar consentimientos

El paquete contiene únicamente cortes curados, ilustraciones de revisión y traducciones editoriales
de los fragmentos seleccionados. Las grabaciones completas, transcripciones fuente, fotogramas de
referencia, contactos y secretos quedan fuera del repositorio.

## Revisión local

```bash
python3 -m http.server 8769
```

Abrir <http://localhost:8769/testimonios/>.

## Revisión individual

`/revision/#TOKEN` muestra únicamente el perfil asociado al enlace: no incluye la grilla, el
buscador, la navegación general ni un vínculo al archivo completo. Es una separación de la
experiencia de revisión, no un control de acceso; GitHub Pages continúa siendo público.

Los tokens y nombres viven en `revision/links.js`. No se guardan teléfonos ni correos en el
repositorio.

La publicación se coordina en el [Issue #4](../../issues/4) y se documenta en
[`docs/GITHUB_PAGES.md`](docs/GITHUB_PAGES.md).
