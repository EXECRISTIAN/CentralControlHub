(() => {
  const cfg = window.SITE_CONFIG;
  const STORAGE_KEY = "exe-cart";
  const $ = (id) => document.getElementById(id);
  const money = (n) =>
    new Intl.NumberFormat(cfg.locale, { style: "currency", currency: cfg.currency, maximumFractionDigits: 0 }).format(n);

  let products = [];
  let cart = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {}
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  function renderProducts() {
    $("productGrid").innerHTML = products.map((p) => `
      <article class="card">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
        <h3>${esc(p.name)}</h3>
        <div class="price">${money(p.price)}</div>
        ${p.variants ? `<select data-variant="${esc(p.id)}">${p.variants.map((v) => `<option>${esc(v)}</option>`).join("")}</select>` : ""}
        <button class="btn" data-add="${esc(p.id)}">Agregar al carrito</button>
      </article>`).join("");
  }

  function add(id, variant) {
    const line = cart.find((l) => l.id === id && l.variant === variant);
    if (line) line.qty++;
    else cart.push({ id, variant, qty: 1 });
    save(); renderCart();
  }

  function renderCart() {
    const lines = cart
      .map((l) => ({ ...l, product: products.find((p) => p.id === l.id) }))
      .filter((l) => l.product);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
    $("cartCount").textContent = count;
    $("cartTotal").textContent = money(total);
    $("sendWa").disabled = count === 0;
    $("cartItems").innerHTML = lines.length
      ? lines.map((l, i) => `
        <li>
          <div class="info">${esc(l.product.name)}
            <small>${l.variant ? esc(l.variant) + " · " : ""}${money(l.product.price)}</small>
          </div>
          <div class="qty">
            <button data-dec="${i}" aria-label="Restar">−</button>
            <span>${l.qty}</span>
            <button data-inc="${i}" aria-label="Sumar">+</button>
          </div>
        </li>`).join("")
      : `<li class="empty">Tu carrito está vacío</li>`;
    return { lines, total };
  }

  function buildMessage() {
    const { lines, total } = renderCart();
    const name = $("customerName").value.trim();
    const note = $("customerNote").value.trim();
    const rows = lines.map((l) =>
      `• ${l.qty} x ${l.product.name}${l.variant ? ` (${l.variant})` : ""} = ${money(l.qty * l.product.price)}`);
    return [
      `Hola! ${name ? `Soy ${name}. ` : ""}Quiero hacer este pedido:`,
      "",
      ...rows,
      "",
      `*Total: ${money(total)}*`,
      note ? `\nNota: ${note}` : "",
    ].join("\n").trim();
  }

  function waLink(text) {
    return `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  function toggleCart(open) {
    $("cart").classList.toggle("open", open);
    $("cart").setAttribute("aria-hidden", String(!open));
    $("overlay").hidden = !open;
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.add) {
      const sel = document.querySelector(`[data-variant="${CSS.escape(t.dataset.add)}"]`);
      add(t.dataset.add, sel ? sel.value : null);
      toggleCart(true);
    } else if (t.dataset.inc) {
      cart[+t.dataset.inc].qty++; save(); renderCart();
    } else if (t.dataset.dec) {
      const i = +t.dataset.dec;
      if (--cart[i].qty <= 0) cart.splice(i, 1);
      save(); renderCart();
    }
  });

  $("cartOpen").onclick = () => toggleCart(true);
  $("cartClose").onclick = () => toggleCart(false);
  $("overlay").onclick = () => toggleCart(false);
  $("cartClear").onclick = () => { cart = []; save(); renderCart(); };
  $("sendWa").onclick = () => window.open(waLink(buildMessage()), "_blank", "noopener");
  $("waDirect").href = waLink("Hola! Quería hacer una consulta.");
  $("year").textContent = new Date().getFullYear();

  fetch("data/products.json")
    .then((r) => r.json())
    .then((data) => { products = data; renderProducts(); renderCart(); })
    .catch(() => { $("productGrid").innerHTML = "<p>No se pudieron cargar los productos.</p>"; });
})();
