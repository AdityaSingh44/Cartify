# Cartify - Frontend

The React + Vite frontend for Cartify. It provides product listing, product details and reviews, shopping cart, checkout flow, and an admin interface for product and order management.

Features:
- Product listing and search
- Product detail pages with reviews and ratings
- Shopping cart persisted in localStorage
- Checkout pages (client-side flow)
- Admin pages for product CRUD, orders and users

Quick start:

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Notes:
- The frontend expects the backend API to be running and reachable. Configure the API base URL in `src/api.js` or via environment variables (see `.env.example`).
- Tailwind CSS is used — ensure PostCSS/Tailwind devDependencies are installed if you make style changes.
