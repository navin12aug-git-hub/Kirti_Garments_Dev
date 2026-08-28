# Kirti Garments — now backed by MongoDB

This project's storefront and admin panel used to run entirely on static data
in `src/data/mockData.js`. It now reads and writes real data from **MongoDB**
through a small **Express API** in `server/`.

Your existing local MongoDB database (`kirti_garments`, seen in your Compass
screenshot) is used as-is — the app connects to `mongodb://127.0.0.1:27017/kirti_garments`
by default.

## What changed

- **`server/`** — a new Express + Mongoose API with full CRUD routes for
  categories, products, coupons, customers, orders, reviews, and homepage
  settings. See `server/routes/`.
- **`src/services/api.js`** — the frontend now calls this API instead of
  importing `mockData.js`. Every page and admin screen that used to read
  `mockData` (Home, Shop, Product Details, Cart, Track Order, Account, Search,
  and all Admin screens) now fetches live from MongoDB.
- **`src/data/mockData.js`** — kept only as the source data for the one-time
  database seed script (see below). It is no longer imported by the UI.
- **`src/data/images.js`** — the Pexels stock-photo URL pools used as default
  imagery, split out since these are static assets, not app data.

## 1. Install dependencies

```bash
# frontend
npm install

# backend
npm run server:install
```

## 2. Configure the database connection

```bash
cd server
cp .env.example .env
```

Open `server/.env` and set `MONGODB_URI` if your setup differs from the
default. Based on your Compass screenshot (Localhost → kirti_garments), the
default already matches:

```
MONGODB_URI=mongodb://127.0.0.1:27017/kirti_garments
```

## 3. Seed the database (safe to run — won't duplicate existing data)

Your `categories` collection already has 13 documents from before, so the
seed script only fills in the collections that are still empty
(`products`, `coupons`, `customers`, `orders`, `reviews`, `homes`):

```bash
npm run seed
```

If you ever want to wipe and reload everything from scratch:

```bash
npm run seed:fresh
```

## 4. Run the app

Option A — one command for both servers:

```bash
npm run dev:full
```

Option B — two terminals:

```bash
# terminal 1
npm run server

# terminal 2
npm run dev
```

The frontend runs on **http://localhost:5173** and proxies all `/api/...`
calls to the backend on **http://localhost:5000** (configured in
`vite.config.js`), so there's no CORS setup needed in development.

## API reference

| Resource   | Endpoint             |
|------------|-----------------------|
| Categories | `/api/categories`     |
| Products   | `/api/products`       |
| Coupons    | `/api/coupons`        |
| Customers  | `/api/customers`      |
| Orders     | `/api/orders`         |
| Reviews    | `/api/reviews`        |
| Homepage   | `/api/home`           |

All support `GET` (list/single) and most support `POST` / `PUT` / `DELETE`.
See `server/routes/*.js` for full query-parameter options (filtering,
sorting, pagination on `/api/products`, etc).

## Admin panel

Every Admin screen (Categories, Products, Coupons, Customers, Orders,
Inventory, Homepage) now reads from and writes to MongoDB directly — adding,
editing, or deleting something in the admin panel updates the real database,
and those changes show up immediately on the storefront.

---

### Original Vite template notes

This project uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) for Fast Refresh.
