# Backend Pomodoro

API mínima para conectar el frontend Angular de Pomodoro con un asistente de productividad.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

El servidor queda disponible en `http://localhost:3000`.

## Endpoints

- `GET /api/health`: comprueba que el backend está activo.
- `POST /api/chat`: recibe `{ "message": "...", "context": { "sessions": 0, "minutes": 0 } }` y devuelve `{ "reply": "..." }`.
