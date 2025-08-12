# FlavourFiesta Proxy

Tiny Node/Express CORS proxy that forwards Swiggy API requests to the browser.  
Used by the **FlavourFiesta** frontend to avoid CORS and user-agent blocking.

## Endpoints
- `GET /healthz` → `ok`
- `GET /api/restaurants`
- `GET /api/menu?resId=<ID>`

## Local Development
```bash
npm install
node server.js
# or: PORT=5174 node server.js
# visit: http://localhost:5174/healthz
