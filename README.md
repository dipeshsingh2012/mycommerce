# mycommerce (`mycommerce`)

> **Composable Micro-Frontend (MFE) Host Application for End-to-End Digital Commerce**

`mycommerce` is the parent application container that stitches together specialized micro-frontends and headless backend services into a unified, high-conversion shopping experience.

---

## 🏗️ Composed Micro-Frontends

1. **`homepage-ui` (Port 5174):** Contentful-powered dynamic landing page, hero qualifier, and categories.
2. **`discovery-ui` (Port 5177):** Catalog browsing and space-fitment clearance sliders.
3. **`product-page-ui` (Port 5175):** Product details and specs table.
4. **`counter-check` (Port 5173):** Embeddable computer vision kitchen counter fitment widget.
5. **`cart-ui` (Port 5176):** commercetools cart review with Kitchen Fitment Readiness verification alert.
6. **`checkout-ui` (Port 5178):** Multi-step shipping, delivery, card payment, and order receipt flow.

---

## 🚀 Running the Storefront Host

```bash
npm install
npm run dev     # Starts host shell on http://localhost:5170
npm run build   # Compiles production distribution
```
