# Sitio web de EVARA — primera versión

Sitio estático (HTML + CSS + JavaScript puro, sin frameworks ni backend) listo para publicarse gratis en GitHub Pages. Sirve como página institucional, catálogo visual y puente hacia WhatsApp — todavía no es una tienda con pagos en línea.

## 1. Estructura del proyecto

```
/index.html              → toda la página (una sola landing con navegación por secciones)
/css/style.css            → estilos, mobile-first
/js/main.js                → menú móvil, filtros de catálogo, botón de WhatsApp, formulario
/assets/logo/               → carpeta para el logo oficial (ver logo/README.txt)
/assets/images/               → favicon e imagen de vista previa para redes (placeholders)
```

No hay paso de compilación: se edita el HTML/CSS/JS directamente y se sube tal cual.

## 2. Cómo reemplazar imágenes y logo

- **Logo:** hoy el nombre "EVARA" se muestra como texto (tipografía Fraunces), no como imagen, para que se vea nítido mientras no tengamos el archivo oficial. Instrucciones exactas en `assets/logo/README.txt`.
- **Fotos de producto, tienda, campaña, etc.:** cada espacio de foto pendiente es un bloque con el texto "Foto real EVARA" (clase `.placeholder-media` en el CSS). Para reemplazar una:
  1. Guarda la foto en `assets/images/` (nombre descriptivo, ej. `set-aura-01.jpg`).
  2. En `index.html`, busca el bloque `<div class="placeholder-media" ...>` correspondiente y cámbialo por:
     ```html
     <img src="assets/images/set-aura-01.jpg" alt="Descripción real de la foto">
     ```
  3. Repite para cada sección (hero, colección destacada, catálogo, nosotros, nueva colección, ubicación).
- **Favicon e imagen para compartir en redes:** están en `assets/images/favicon.svg` y `assets/images/og-cover-placeholder.png`, generados como marcadores de posición con los colores y el lema reales de EVARA. Reemplázalos cuando haya piezas oficiales, manteniendo los mismos nombres de archivo (o actualiza las rutas en el `<head>` de `index.html`).

## 3. Datos pendientes que debes completar en el código

Todo lo que EVARA aún no ha confirmado quedó marcado en el código, nunca inventado. Antes de lanzar la versión definitiva:

| Dato | Dónde se edita |
|---|---|
| Número de WhatsApp | `js/main.js` → constante `WHATSAPP_NUMBER` (línea ~15). Mientras diga `"PENDIENTE"`, los botones de WhatsApp avisan en vez de abrir un chat roto. |
| Correo de contacto | `js/main.js` → constante `CONTACT_EMAIL`, y el texto "Pendiente" en la sección Contacto de `index.html`. |
| Horario de la tienda | Sección "Visítanos" en `index.html` (`Horario pendiente de confirmación.`). |
| Cobertura de envíos | No mencionada todavía en el sitio — agrégala en el Hero y/o en Contacto cuando esté definida. |
| Métodos de pago | Agregar en Catálogo o Contacto cuando estén definidos. |
| Política de cambios y envíos | Agregar como sección o enlace en el footer cuando exista. |
| Productos, referencias, precios, tallas, colores, materiales reales | `js/main.js` → array `DEMO_PRODUCTS`. Reemplaza estos productos de ejemplo por el catálogo real (mismo formato de objeto). |
| Guía oficial de tallas (medidas) | Tabla en la sección Catálogo de `index.html` (`Guía oficial de tallas EVARA próximamente.`). |
| Fotografías reales | Ver punto 2 de arriba. |
| Testimonios de clientas | Sección "EVARA en movimiento" en `index.html` — hoy son tarjetas de ejemplo. |
| Promociones | No incluidas todavía; se puede agregar un banner cuando exista una oferta real. |
| Formulario de contacto | Es solo visual: no envía datos a ningún servidor todavía (ver siguiente punto). |

## 4. Activar el formulario de contacto (cuando quieran)

El formulario valida los campos pero no envía nada — el sitio es 100% estático y no tiene servidor propio. Para conectarlo gratis más adelante, la forma más simple es un servicio como **Formspree**, **Getform** o **Web3Forms** (planes gratuitos disponibles): se crea una cuenta, se obtiene una URL de "endpoint", y se agrega `action="ESA_URL"` y `method="POST"` a la etiqueta `<form id="contactForm">` en `index.html`. Mientras eso no se haga, el mensaje en pantalla lo deja claro y dirige a WhatsApp.

## 5. Publicar gratis en GitHub Pages

1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo, público, por ejemplo `evara-web`.
3. Sube el contenido de esta carpeta al repositorio (arrastra los archivos desde la web de GitHub, o usa git):
   ```
   git init
   git add .
   git commit -m "Primera versión del sitio EVARA"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/evara-web.git
   git push -u origin main
   ```
4. En el repositorio, ve a **Settings → Pages**.
5. En "Build and deployment", selecciona **Deploy from a branch**.
6. Elige la rama `main` y la carpeta `/ (root)`. Guarda.
7. GitHub te dará una dirección pública en 1–2 minutos, con esta forma:
   `https://TU-USUARIO.github.io/evara-web/`
8. Cada vez que subas cambios nuevos a la rama `main`, el sitio se actualiza solo.

Cuando EVARA tenga dominio propio (ej. `evara.co`), se puede conectar desde la misma sección Settings → Pages sin cambiar nada del código.

## 6. Información que debemos pedirle a EVARA antes del lanzamiento definitivo

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
- Logo oficial en formato vectorial (SVG) o PNG de alta resolución con fondo transparente.
- Si existe, ficha de Google Business (para enlazar mapa y reseñas).
- Cualquier promoción, código de descuento o campaña vigente que deba aparecer en el sitio.
- Decisión sobre si más adelante quieren pagos en línea, envíos automatizados o carrito de compras (para planear la segunda fase).

## 7. Segunda fase (no incluida todavía, a propósito)

La estructura del código ya está preparada para sumar, sin rehacer el sitio: catálogo conectado a una fuente de datos real, pagos en línea, cálculo de envíos, Google Business, Google Analytics, Meta Pixel, formulario conectado a un servicio de envío de correos, dominio propio, mejoras de SEO y, si la marca lo pide, un carrito de compras completo.
