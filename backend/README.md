# Cartify - Backend

This folder contains the Express + Node.js backend for the Cartify e-commerce application.

Features:
- Authentication (JWT) with register/login
- Product CRUD and product details
- Reviews on products (protected)
- Orders and order management
- Admin-only endpoints for users, products and orders

Technologies:
- Node.js, Express
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for authentication

Quick setup:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
npm install
```

3. Seed sample data (creates an admin user and sample products):

```bash
npm run seed
```

4. Run in development:

```bash
npm run dev
```

Important notes:
- The seed script creates an admin user with email `admin@cartify.com` and password `admin123`.
- If you use MongoDB Atlas, ensure your server's IP (or 0.0.0.0 temporarily) is whitelisted and DNS SRV resolution is available.
- Keep `.env` out of source control — it is included in `.gitignore`.

API endpoints (selected):
- `POST /api/auth/register` - register
- `POST /api/auth/login` - login
- `GET /api/products` - list products
- `GET /api/products/:id` - product detail
- `POST /api/products/:id/reviews` - submit review (auth)
- `POST /api/orders` - create order (auth)

For full API documentation, inspect the `src/routes` folder.
