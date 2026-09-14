/* =========================================================
   EVARA — main.js
   JavaScript puro (sin frameworks). Comentado a propósito
   para que sea fácil de mantener sin ser desarrollador.
   ========================================================= */

/* ---------------------------------------------------------
   1) DATOS PENDIENTES — EDITAR AQUÍ CUANDO EVARA LOS CONFIRME
   --------------------------------------------------------- */

// Número de WhatsApp de EVARA en formato internacional, SIN "+" ni espacios.
// Ejemplo real: "573001234567"
// Mientras no lo tengamos, se deja "PENDIENTE" a propósito: todos los
// botones de WhatsApp del sitio detectan este valor y avisan en vez de
// abrir un chat roto.
const WHATSAPP_NUMBER = "PENDIENTE";

// Correo de contacto — reemplazar cuando EVARA lo confirme.
// Se usa únicamente para mostrarlo en pantalla si algún día se agrega.
const CONTACT_EMAIL = "PENDIENTE";

/* ---------------------------------------------------------
   2) PRODUCTOS DEMO
   Estos productos son SOLO para mostrar cómo funciona el
   catálogo (filtros, fichas, botón de compra). Ningún nombre,
   precio, talla o color aquí es información real de EVARA.
   Cuando haya catálogo real, este array se reemplaza por los
   productos verdaderos (o se conecta a una fuente de datos).
   --------------------------------------------------------- */
const DEMO_PRODUCTS = [
  { id: "p1",  ref: "EVR-SET-01",  name: "Set Aura",             category: "sets",      categoryLabel: "Sets deportivos",     sizes: ["XS","S","M","L"],    colors: ["negro","beige"],        bestseller: true  },
  { id: "p2",  ref: "EVR-SET-02",  name: "Set Vento",            category: "sets",      categoryLabel: "Sets deportivos",     sizes: ["S","M","L","XL"],    colors: ["negro","cafe"],          bestseller: false },
  { id: "p3",  ref: "EVR-TOP-01",  name: "Top Line",             category: "tops",      categoryLabel: "Tops y crops",        sizes: ["XS","S","M"],        colors: ["blanco","beige"],        bestseller: false },
  { id: "p4",  ref: "EVR-TOP-02",  name: "Crop Flow",            category: "tops",      categoryLabel: "Tops y crops",        sizes: ["S","M","L"],         colors: ["negro","blanco"],        bestseller: true  },
  { id: "p5",  ref: "EVR-LEG-01",  name: "Legging Movimiento",   category: "leggings",  categoryLabel: "Leggings",            sizes: ["XS","S","M","L","XL"], colors: ["negro","beige","cafe"], bestseller: true  },
  { id: "p6",  ref: "EVR-LEG-02",  name: "Legging Esencial",     category: "leggings",  categoryLabel: "Leggings",            sizes: ["S","M","L"],         colors: ["negro","blanco"],        bestseller: false },
  { id: "p7",  ref: "EVR-HOD-01",  name: "Hoodie Base",          category: "basicos",   categoryLabel: "Básicos y hoodies",   sizes: ["S","M","L","XL"],    colors: ["beige","cafe"],           bestseller: true  },
  { id: "p8",  ref: "EVR-BAS-01",  name: "Camiseta Básica",      category: "basicos",   categoryLabel: "Básicos y hoodies",   sizes: ["XS","S","M","L"],    colors: ["blanco","negro"],         bestseller: false },
  { id: "p9",  ref: "EVR-CAL-01",  name: "Tenis EVARA",          category: "calzado",   categoryLabel: "Calzado",             sizes: [],                    colors: [],                         bestseller: false, categoryPending: true },
  { id: "p10", ref: "EVR-ACC-01",  name: "Accesorio EVARA",      category: "accesorios",categoryLabel: "Accesorios",          sizes: [],                    colors: [],                         bestseller: false, categoryPending: true },
];

// Textos genéricos de la ficha de producto — se muestran igual para todos
// los productos demo porque EVARA todavía no ha confirmado esta información
// por referencia. Al conectar el catálogo real, cada producto puede tener
// su propia descripción/material en este mismo array.
const PENDING_TEXT = "Información pendiente";
const DEMO_DESCRIPTION = "Descripción, material y cuidados de esta prenda: información pendiente de confirmación por parte de EVARA. Este es un producto demo — se muestra para ilustrar cómo lucirá la ficha con el catálogo real conectado.";

/* ---------------------------------------------------------
   3) UTILIDADES DE WHATSAPP
   --------------------------------------------------------- */
function buildWhatsAppLink(message){
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function isWhatsAppPending(){
  return !WHATSAPP_NUMBER || WHATSAPP_NUMBER === "PENDIENTE";
}

// Aplica el número de WhatsApp a todos los enlaces marcados con
// data-whatsapp-link. Si el número sigue pendiente, el enlace no
// navega a ningún lado: en vez de eso avisa con claridad.
function wireWhatsAppLinks(root = document){
  const links = root.querySelectorAll("[data-whatsapp-link]");
  links.forEach((link) => {
    const message = link.getAttribute("data-whatsapp-message") || "Hola, quiero más información sobre EVARA.";
    if (isWhatsAppPending()) {
      link.setAttribute("href", "#");
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showPendingWhatsAppNotice(link);
      });
    } else {
      link.setAttribute("href", buildWhatsAppLink(message));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    }
  });
}

// Aviso visible (no un alert() del navegador) cuando alguien hace clic
// en un botón de WhatsApp antes de que el número real esté configurado.
let pendingNoticeTimer = null;
function showPendingWhatsAppNotice(triggerEl){
  let notice = document.getElementById("whatsappPendingNotice");
  if (!notice) {
    notice = document.createElement("div");
    notice.id = "whatsappPendingNotice";
    notice.setAttribute("role", "status");
    notice.style.position = "fixed";
    notice.style.left = "50%";
    notice.style.bottom = "84px";
    notice.style.transform = "translateX(-50%)";
    notice.style.background = "#1B170F";
    notice.style.color = "#F7F4EC";
    notice.style.padding = "12px 18px";
    notice.style.borderRadius = "4px";
    notice.style.fontSize = "13.5px";
    notice.style.maxWidth = "min(90vw, 360px)";
    notice.style.textAlign = "center";
    notice.style.zIndex = "80";
    notice.style.boxShadow = "0 8px 24px -8px rgba(0,0,0,.4)";
    document.body.appendChild(notice);
  }
  notice.textContent = "El número de WhatsApp de EVARA todavía no está configurado. Edítalo en js/main.js (WHATSAPP_NUMBER).";
  notice.style.opacity = "1";
  clearTimeout(pendingNoticeTimer);
  pendingNoticeTimer = setTimeout(() => { notice.style.opacity = "0"; }, 4000);
}

/* ---------------------------------------------------------
   4) RENDER DEL CATÁLOGO Y DE MÁS VENDIDOS
   --------------------------------------------------------- */
function productCardHTML(product){
  const sizeOptions = product.sizes.length
    ? `<select class="product-size-select" aria-label="Talla para ${product.name}">
         ${product.sizes.map(s => `<option value="${s}">${s}</option>`).join("")}
       </select>`
    : "";

  const categoryNote = product.categoryPending
    ? `<p class="pending-tag">Categoría sujeta a confirmación</p>`
    : "";

  const buyLabel = product.categoryPending ? "Preguntar por WhatsApp" : "Comprar por WhatsApp";

  return `
    <article class="product-card" data-category="${product.category}" data-sizes="${product.sizes.join(",")}" data-colors="${product.colors.join(",")}" data-product-id="${product.id}">
      <div class="placeholder-media" role="img" aria-label="Ver ficha de ${product.name}" tabindex="0" data-open-product="${product.id}">
        <span class="placeholder-label">Foto real EVARA</span>
        <span class="placeholder-sub">${product.name}</span>
      </div>
      <div class="product-body">
        <span class="demo-badge">Producto demo</span>
        <span class="product-category">${product.categoryLabel}</span>
        <h3 class="product-name"><button type="button" class="product-name-link" data-open-product="${product.id}">${product.name}</button></h3>
        <p class="product-price">Precio próximamente</p>
        ${categoryNote}
        ${sizeOptions}
        <button type="button" class="btn btn-outline btn-small buy-btn" data-product-name="${product.name}">${buyLabel}</button>
      </div>
    </article>
  `;
}

function renderGrid(container, products){
  if (!container) return;
  container.innerHTML = products.map(productCardHTML).join("");

  // Cablear apertura de ficha de producto (foto o nombre)
  container.querySelectorAll("[data-open-product]").forEach((el) => {
    const id = el.getAttribute("data-open-product");
    el.addEventListener("click", () => openProductModal(id));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProductModal(id);
      }
    });
  });

  // Cablear cada botón "Comprar por WhatsApp" de las tarjetas recién creadas
  container.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const select = card.querySelector(".product-size-select");
      const size = select ? select.value : null;
      const productName = btn.getAttribute("data-product-name");
      const message = size
        ? `Hola, estoy interesada en ${productName}, talla ${size}. Quisiera más información.`
        : `Hola, estoy interesada en ${productName}. Quisiera más información.`;

      if (isWhatsAppPending()) {
        showPendingWhatsAppNotice(btn);
      } else {
        window.open(buildWhatsAppLink(message), "_blank", "noopener");
      }
    });
  });
}

/* ---------------------------------------------------------
   5) FICHA DE PRODUCTO (MODAL)
   Se abre al hacer clic en la foto o el nombre de un producto
   dentro del catálogo o de más vendidos. Reutiliza los mismos
   datos de DEMO_PRODUCTS — nada de precios, tallas ni materiales
   inventados: todo lo que no esté confirmado dice "Información
   pendiente".
   --------------------------------------------------------- */
let lastFocusedBeforeModal = null;

function productModalHTML(product){
  const thumbs = Array.from({ length: 4 }, (_, i) => `
    <div class="placeholder-media" role="img" aria-label="Foto adicional ${i + 1} de ${product.name}">
      <span class="placeholder-label">Foto ${i + 1}</span>
    </div>
  `).join("");

  const sizesRow = product.sizes.length
    ? `<div>
         <span class="product-modal-option-label">Talla</span>
         <div class="product-modal-swatches">
           ${product.sizes.map((s) => `<span class="product-modal-swatch">${s}</span>`).join("")}
         </div>
       </div>`
    : `<div>
         <span class="product-modal-option-label">Talla</span>
         <p class="pending-tag">${PENDING_TEXT}</p>
       </div>`;

  const colorsRow = product.colors.length
    ? `<div>
         <span class="product-modal-option-label">Color</span>
         <div class="product-modal-swatches">
           ${product.colors.map((c) => `<span class="product-modal-swatch">${c}</span>`).join("")}
         </div>
       </div>`
    : `<div>
         <span class="product-modal-option-label">Color</span>
         <p class="pending-tag">${PENDING_TEXT}</p>
       </div>`;

  const categoryNote = product.categoryPending
    ? `<p class="pending-tag">Categoría sujeta a confirmación</p>`
    : "";

  const buyLabel = product.categoryPending ? "Preguntar por WhatsApp" : "Comprar por WhatsApp";

  return `
    <div>
      <div class="placeholder-media product-modal-gallery-main" role="img" aria-label="Foto principal de ${product.name}">
        <span class="placeholder-label">Foto real EVARA</span>
        <span class="placeholder-sub">${product.name}</span>
      </div>
      <div class="product-modal-thumbs">${thumbs}</div>
    </div>
    <div>
      <span class="demo-badge">Producto demo</span>
      <p class="product-modal-category">${product.categoryLabel}</p>
      <h2 class="product-modal-name" id="productModalName">${product.name}</h2>
      <p class="product-modal-price">Precio próximamente</p>
      <p class="product-modal-ref">Referencia: ${product.ref}</p>
      ${categoryNote}

      <p class="product-modal-desc">${DEMO_DESCRIPTION}</p>

      <dl class="product-modal-facts">
        <div><dt>Material</dt><dd class="pending-tag">${PENDING_TEXT}</dd></div>
        <div><dt>Disponibilidad</dt><dd class="pending-tag">${PENDING_TEXT}</dd></div>
      </dl>

      <div class="product-modal-options">
        ${colorsRow}
        ${sizesRow}
        <a href="#tallas" class="product-modal-sizeguide-link" data-modal-close>Ver guía de tallas</a>
      </div>

      <div class="product-modal-actions">
        <button type="button" class="btn btn-primary modal-buy-btn" data-product-name="${product.name}">${buyLabel}</button>
      </div>
    </div>
  `;
}

function openProductModal(productId){
  const modal = document.getElementById("productModal");
  const body = document.getElementById("productModalBody");
  if (!modal || !body) return;
  const product = DEMO_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  lastFocusedBeforeModal = document.activeElement;
  body.innerHTML = productModalHTML(product);

  // Cablear el botón de compra dentro del modal
  const buyBtn = body.querySelector(".modal-buy-btn");
  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      const message = `Hola, estoy interesada en ${product.name}. Quisiera más información.`;
      if (isWhatsAppPending()) {
        showPendingWhatsAppNotice(buyBtn);
      } else {
        window.open(buildWhatsAppLink(message), "_blank", "noopener");
      }
    });
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const closeBtn = modal.querySelector(".product-modal-close");
  if (closeBtn) closeBtn.focus();
}

function closeProductModal(){
  const modal = document.getElementById("productModal");
  if (!modal || !modal.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedBeforeModal && lastFocusedBeforeModal.focus) {
    lastFocusedBeforeModal.focus();
  }
}

function initProductModal(){
  const modal = document.getElementById("productModal");
  if (!modal) return;
  modal.querySelectorAll("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", closeProductModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProductModal();
  });
}

/* ---------------------------------------------------------
   6) FILTROS DEL CATÁLOGO
   --------------------------------------------------------- */
function initCatalogFilters(){
  const grid = document.getElementById("productGrid");
  const emptyMsg = document.getElementById("filterEmpty");
  if (!grid) return;

  renderGrid(grid, DEMO_PRODUCTS);

  const state = { category: "todas", size: "todas", color: "todos" };

  function applyFilters(){
    const cards = grid.querySelectorAll(".product-card");
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesCategory = state.category === "todas" || card.dataset.category === state.category;
      const matchesSize = state.size === "todas" || card.dataset.sizes.split(",").includes(state.size);
      const matchesColor = state.color === "todos" || card.dataset.colors.split(",").includes(state.color);
      const visible = matchesCategory && matchesSize && matchesColor;
      card.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });
    if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
  }

  function wireChipGroup(containerId, stateKey, datasetAttr){
    const container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      container.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      state[stateKey] = chip.getAttribute(datasetAttr);
      applyFilters();
    });
  }

  wireChipGroup("filterCategory", "category", "data-filter-category");
  wireChipGroup("filterSize", "size", "data-filter-size");
  wireChipGroup("filterColor", "color", "data-filter-color");
}

function initBestsellers(){
  const grid = document.getElementById("bestsellerGrid");
  if (!grid) return;
  renderGrid(grid, DEMO_PRODUCTS.filter((p) => p.bestseller));
}

/* ---------------------------------------------------------
   7) MENÚ MÓVIL
   --------------------------------------------------------- */
function initMobileMenu(){
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const backdrop = document.getElementById("navBackdrop");
  if (!toggle || !nav) return;

  function openMenu(){
    nav.classList.add("is-open");
    backdrop.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu(){
    nav.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });
  backdrop.addEventListener("click", closeMenu);
  nav.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ---------------------------------------------------------
   8) FORMULARIO DE CONTACTO
   El sitio es estático: este formulario NO envía datos a
   ningún lado todavía. Solo valida y muestra un mensaje claro.
   Para conectarlo de verdad más adelante (gratis), se puede usar
   un servicio como Formspree, Getform o Web3Forms: agregar el
   "action" del formulario y su método POST cuando se elija uno.
   --------------------------------------------------------- */
function initContactForm(){
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      status.hidden = false;
      status.textContent = "Falta completar tu nombre y tu mensaje antes de continuar.";
      return;
    }

    const name = form.querySelector("#cf-name").value.trim();
    status.hidden = false;
    status.textContent = `Gracias, ${name}. Este formulario todavía no está conectado a un sistema de envío, así que tu mensaje no viaja a ningún lado por ahora — escríbenos por WhatsApp para una respuesta real mientras tanto.`;
  });
}

/* ---------------------------------------------------------
   9) AÑO DEL FOOTER
   Nota de diseño: se decidió NO usar animaciones de "aparición"
   ligadas al scroll (fade-in al entrar en pantalla). Ese efecto
   deja el contenido invisible hasta que el navegador dispara el
   evento, lo cual falla en capturas, impresión o si JavaScript
   tarda en cargar. Todo el contenido de EVARA queda visible de
   inmediato; las únicas animaciones son transiciones suaves de
   hover y la apertura del menú móvil.
   --------------------------------------------------------- */
function initFooterYear(){
  const el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   ARRANQUE
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  wireWhatsAppLinks();
  initCatalogFilters();
  initBestsellers();
  initProductModal();
  initMobileMenu();
  initContactForm();
  initFooterYear();
});
