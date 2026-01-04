# Cartify

Cartify is a sample full-stack MERN e-commerce application demonstrating product catalog, authentication, shopping cart, checkout flow, reviews, and an admin interface.

Highlights:
- User registration and authentication (JWT)
- Product listing, details, categories and search
- Reviews and ratings for products
- Shopping cart persisted in browser storage
- Orders and simple checkout flow
- Admin pages: manage products, orders, and users

Tech stack:
- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)

Quick start (run locally):

1. Start backend

```bash
cd backend
cp .env.example .env
# set MONGO_URI and JWT_SECRET in .env
npm install
npm run seed
npm run dev
```

2. Start frontend

```bash
cd frontend
npm install
npm run dev
```

Notes:
- The seed script creates an admin user (admin@cartify.com / admin123) and some sample products.
- Ensure your MongoDB Atlas IP access list allows connections or use a local MongoDB instance.
# Cartify - MERN E-commerce Boilerplate

Folders:
- backend: Express API
- frontend: React (Vite)

Quick start:

1. Backend

```
cd backend
npm install
copy .env.example .env
# optionally set MONGO_URI in .env
npm run dev
```

2. Frontend

```
cd frontend
npm install
copy .env.example .env
npm run dev
```

The backend uses the MongoDB URL you provided in `.env.example`.
