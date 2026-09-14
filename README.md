# Sitio web de EVARA — primera versión (publicada)

Sitio estático (HTML + CSS + JavaScript puro, sin frameworks ni backend) publicado gratis en GitHub Pages. Sirve como página institucional, catálogo visual y puente hacia WhatsApp — todavía no es una tienda con pagos en línea.

**URL pública:** https://kvaretieenergy-rgb.github.io/evara-web/
**Repositorio:** https://github.com/kvaretieenergy-rgb/evara-web

## 1. Estructura del proyecto

```
/index.html                    → toda la página (una sola landing con navegación por secciones)
/css/style.css                 → estilos, mobile-first
/js/main.js                    → menú móvil, filtros de catálogo, ficha de producto (modal), WhatsApp, formulario
/assets/logo/                  → logo oficial de EVARA (ya integrado)
  evara-logo-full.png          → icono + wordmark + lema — usado en el Hero (portada)
  evara-logo-compact.png       → icono + wordmark (sin lema) — usado en header y footer
  evara-mark-square.png        → solo el icono, recorte cuadrado del archivo oficial
/assets/images/                → favicon, apple-touch-icon e imagen de vista previa para redes
/favicon.ico                   → favicon generado a partir del icono oficial de EVARA
/robots.txt, /sitemap.xml      → SEO básico
/.nojekyll                     → evita que GitHub Pages procese el sitio con Jekyll
```

No hay paso de compilación: se edita el HTML/CSS/JS directamente y se sube tal cual (ver punto 5 para subir cambios).

## 2. El logo oficial ya está integrado

El logo real de EVARA (el archivo que enviaron) ya se usa, sin rediseñar ni deformar, en:

- **Header** (menú de navegación, escritorio y móvil): `evara-logo-compact.png`.
- **Portada / Hero**: `evara-logo-full.png` (incluye el lema "Activa tu mejor versión").
- **Footer**: `evara-logo-compact.png` en blanco (se usa un filtro CSS `invert` para que se vea sobre el fondo oscuro — no se alteró el archivo).
- **Favicon / ícono del navegador / ícono al guardar en el celular (apple-touch-icon)**: recorte cuadrado del isotipo (`evara-mark-square.png`), porque el lockup completo con el lema es ilegible a tamaño de ícono.

Si más adelante llega una versión vectorial (SVG) o de mayor resolución del logo, reemplaza los archivos en `assets/logo/` **manteniendo los mismos nombres** y no hay que tocar el HTML.

## 3. Ficha de producto (nueva)

Al hacer clic en la foto o el nombre de cualquier producto (en Catálogo o Más vendidos) se abre una ficha con foto grande, galería de miniaturas, nombre, categoría, referencia, descripción, material, disponibilidad, color, talla, enlace a la guía de tallas y botón de "Comprar por WhatsApp". Todo lo que EVARA no ha confirmado aún se muestra como "Información pendiente" — no hay datos inventados.

## 4. Datos pendientes que debes completar en el código

Todo lo que EVARA aún no ha confirmado quedó marcado en el código, nunca inventado. Antes de compartir la versión definitiva con clientas:

| Dato | Dónde se edita |
|---|---|
| Número de WhatsApp | `js/main.js` → constante `WHATSAPP_NUMBER` (cerca de la línea 16). Mientras diga `"PENDIENTE"`, los botones de WhatsApp avisan en vez de abrir un chat roto. Formato: solo números con indicativo de país, ej. `"573001234567"`. |
| Correo de contacto | `js/main.js` → constante `CONTACT_EMAIL`, y el texto "Pendiente" en la sección Contacto de `index.html`. |
| Horario de la tienda | Sección "Visítanos" en `index.html` (`Horario pendiente de confirmación.`). |
| Cobertura de envíos | Agregar en el Hero y/o en Contacto cuando esté definida. |
| Métodos de pago | Agregar en Catálogo o Contacto cuando estén definidos. |
| Política de cambios y envíos | Agregar como sección o enlace en el footer cuando exista. |
| Productos, referencias, precios, tallas, colores, materiales reales | `js/main.js` → array `DEMO_PRODUCTS` (y `DEMO_DESCRIPTION` para la descripción genérica de la ficha). Reemplaza por el catálogo real (mismo formato de objeto). |
| Guía oficial de tallas (medidas) | Tabla en la sección Catálogo de `index.html` (`Guía oficial de tallas EVARA próximamente.`). |
| Fotografías reales | Ver punto 6 de abajo. |
| Testimonios de clientas | Sección "EVARA en movimiento" en `index.html` — hoy son tarjetas de ejemplo. |

## 5. Cómo publicar cambios nuevos (actualizar el sitio)

El sitio se actualiza solo cada vez que se sube un cambio a la rama `main` del repositorio. Dos formas de hacerlo:

**A) Desde la web de GitHub (sin instalar nada):**
1. Entra a https://github.com/kvaretieenergy-rgb/evara-web
2. Abre el archivo que quieras cambiar (ej. `js/main.js`), pulsa el ícono de lápiz (editar), haz el cambio y pulsa "Commit changes".
3. Para reemplazar una imagen: entra a la carpeta correspondiente (ej. `assets/images`), usa "Add file → Upload files", sube el archivo con el mismo nombre para que lo reemplace, y confirma.
4. GitHub Pages reconstruye el sitio automáticamente en 1–2 minutos.

**B) Con git (para quien maneje la línea de comandos):**
```
git clone https://github.com/kvaretieenergy-rgb/evara-web.git
cd evara-web
# editar archivos...
git add .
git commit -m "Actualiza catálogo"
git push
```

## 6. Cómo reemplazar fotografías

Cada espacio de foto pendiente es un bloque con el texto "Foto real EVARA" (clase `.placeholder-media` en el CSS). Para reemplazar una:
1. Guarda la foto en `assets/images/` (nombre descriptivo, ej. `set-aura-01.jpg`).
2. En `index.html`, busca el bloque `<div class="placeholder-media" ...>` correspondiente y cámbialo por:
   ```html
   <img src="assets/images/set-aura-01.jpg" alt="Descripción real de la foto">
   ```
3. Repite para cada sección (hero, colección destacada, catálogo, nosotros, nueva colección, ubicación).

## 7. Activar el formulario de contacto (cuando quieran)

El formulario valida los campos pero no envía nada — el sitio es 100% estático y no tiene servidor propio. Para conectarlo gratis más adelante, la forma más simple es un servicio como **Formspree**, **Getform** o **Web3Forms** (planes gratuitos disponibles): se crea una cuenta, se obtiene una URL de "endpoint", y se agrega `action="ESA_URL"` y `method="POST"` a la etiqueta `<form id="contactForm">` en `index.html`.

## 8. Conectar un dominio propio más adelante (ej. evara.co)

El sitio quedó preparado para esto — no hay que reconstruir nada:

1. Compra el dominio (ej. en NameCheap, GoDaddy, o el proveedor que prefieran).
2. En el panel de DNS del dominio, crea un registro **CNAME** que apunte tu subdominio (ej. `www`) a:
   ```
   kvaretieenergy-rgb.github.io
   ```
   Si quieren usar el dominio raíz (`evara.co` sin `www`), se configuran registros **A** apuntando a las IPs de GitHub Pages (están en la documentación oficial: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. En GitHub: `Settings → Pages → Custom domain`, escribe el dominio (ej. `evara.co`) y guarda. GitHub crea automáticamente un archivo `CNAME` en la raíz del repositorio.
4. Espera la propagación DNS (minutos a horas) y activa "Enforce HTTPS" cuando esté disponible.

Mientras no compren un dominio, `https://kvaretieenergy-rgb.github.io/evara-web/` sigue siendo la URL pública y gratuita del sitio.

## 9. Información que debemos pedirle a EVARA antes del lanzamiento definitivo

- Número de WhatsApp oficial para ventas (con indicativo de país).
- Correo de contacto oficial.
- Horario real de atención de la tienda.
- Cobertura de envíos (¿solo Medellín, todo Antioquia, todo el país?) y sus tiempos/costos.
- Métodos de pago aceptados (efectivo, transferencia, tarjeta, contraentrega, etc.).
- Política de cambios y devoluciones.
- Catálogo real: nombres, referencias, descripciones, tela/material, tallas, colores y precios por producto.
- Confirmación de si calzado y accesorios son línea de venta real o solo exhibición en tienda.
- Guía oficial de tallas (medidas de busto, cintura y cadera por talla).
- Fotografías reales: producto en fondo neutro, detalle de tela, modelo usando la prenda, tienda, equipo/proceso de fabricación.
- Testimonios o reseñas reales de clientas (con su autorización para publicarlos).
- Logo oficial en formato vectorial (SVG), si existe, para máxima nitidez (hoy se usa el PNG que enviaron, ya optimizado).
- Si existe, ficha de Google Business (para enlazar mapa y reseñas).
- Cualquier promoción, código de descuento o campaña vigente que deba aparecer en el sitio.
- Decisión sobre si más adelante quieren pagos en línea, envíos automatizados o carrito de compras (para planear la segunda fase).
- Dominio propio a comprar, si lo desean (ej. evara.co / evara.com.co / evaracol.com).

## 10. Segunda fase (no incluida todavía, a propósito)

La estructura del código ya está preparada para sumar, sin rehacer el sitio: catálogo conectado a una fuente de datos real, pagos en línea, cálculo de envíos, Google Business, Google Analytics, Meta Pixel, formulario conectado a un servicio de envío de correos, dominio propio, mejoras de SEO y, si la marca lo pide, un carrito de compras completo.
