# Entrega Final - Proyecto

**Descripción breve**
Proyecto con Express + Mongoose + Handlebars para gestionar productos y carritos. Incluye:
- GET `/api/products` con `limit`, `page`, `sort`, `query` (filtros por categoría o disponibilidad).
- Endpoints para gestión de carritos con `populate`.
- Vistas Handlebars: `/products`, `/products/:pid`, `/carts/:cid`.

**Instalación**
1. Copiar `.env.sample` a `.env` y ajustar `MONGODB_URI`.
2. `npm install`
3. `npm start` (o `npm run dev`)

**Rutas principales**
- API Productos: `GET /api/products`
- API Carts: `POST /api/carts` (crear), `GET /api/carts/:cid`, `DELETE /api/carts/:cid/products/:pid`, `PUT /api/carts/:cid`, `PUT /api/carts/:cid/products/:pid`, `DELETE /api/carts/:cid`
- Vistas: `/products`, `/products/:pid`, `/carts/:cid`

**Notas sobre query params**
- `limit` (default 10)
- `page` (default 1)
- `sort` = `asc` or `desc` -> orders by price
- `query` supports:
  - `category:Electrónica` -> filtra por categoría
  - `available` -> filtra productos con stock > 0
  - any other value -> se intenta buscar por categoría

**Video explicativo**
(El usuario proporcionó el link original en la consigna.)

