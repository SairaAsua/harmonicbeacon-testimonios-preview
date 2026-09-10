# Publicación con GitHub Pages

Owning issue: #4.

## Decisión

Mona queda fuera de este despliegue. La web, las imágenes y los 31 videos curados se conservan en
este repositorio y se publicarán juntos mediante GitHub Pages.

El artefacto actual pesa aproximadamente 162 MiB: 118,2 MiB de videos y 43,5 MiB de imágenes. Este
volumen cabe dentro de los límites actuales de GitHub Pages. Si las sucesivas versiones de los
videos hacen crecer demasiado el historial, se evaluará almacenamiento externo en ese momento.

## Dominio y rutas

- Dominio: `voces.harmonicbeacon.com`
- Entrada: `/`
- Galería: `/testimonios/`
- La raíz redirige a la galería.
- El archivo `CNAME` declara el dominio personalizado.

## Configuración de GitHub

Después de fusionar la rama autorizada a `main`:

1. Abrir `Settings → Pages` en el repositorio.
2. Elegir `Deploy from a branch`.
3. Seleccionar la rama `main` y la carpeta `/ (root)`.
4. Establecer `voces.harmonicbeacon.com` como custom domain.
5. Activar `Enforce HTTPS` cuando GitHub haya emitido el certificado.

## DNS

Crear un registro CNAME:

- Nombre: `voces`
- Destino: `sairaasua.github.io`

No eliminar ni reemplazar los registros actuales de `harmonicbeacon.com`.

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
- `CNAME`

Quedan fuera las grabaciones originales, transcripciones fuente, fotogramas de referencia,
contactos, secretos y archivos de entorno.

## Visibilidad

El repositorio es privado, pero eso no garantiza que su sitio de GitHub Pages sea privado. Salvo
que la cuenta disponga de GitHub Enterprise Cloud con control de acceso para Pages, la URL publicada
será accesible para cualquier persona que la conozca. `noindex` reduce la indexación, pero no es una
contraseña.

Por ese motivo, se puede preparar y verificar esta rama sin activar Pages. La activación pública es
el último paso y requiere una confirmación explícita de visibilidad.

## Verificación posterior

- `/` redirige a `/testimonios/`.
- `/testimonios/` responde correctamente.
- los 18 perfiles y 31 videos están presentes.
- un video admite reproducción parcial y navegación temporal.
- el selector ES/EN funciona con un perfil abierto.
- el certificado HTTPS es válido.
