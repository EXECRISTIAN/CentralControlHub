# CentralControlHub
Central Control Hub: descargas de la aplicacion de Android

## Sitio web exe.com.ar (`site/`)

Sitio estático (HTML/CSS/JS, sin dependencias) que reemplaza al WordPress. Se publica gratis en GitHub Pages con `.github/workflows/pages.yml` en cada push a `main` que toque `site/`.

- **Productos:** editar `site/data/products.json` (`id`, `name`, `price`, `image`, `variants` opcional).
- **WhatsApp:** poner el número en `site/assets/js/config.js`.
- **Colores:** variables `--c0` a `--c7` al inicio de `site/assets/css/styles.css`.
- **Imágenes:** en `site/assets/img/` (`banner-04.jpg`, `banner-05.jpg`, `slide-image.jpg`, fotos de productos).

El carrito se guarda en el navegador del cliente y, al confirmar, abre WhatsApp con el pedido completo ya escrito.

Probar en local: `cd site && python3 -m http.server 8000`.
