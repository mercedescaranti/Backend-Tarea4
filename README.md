# Enanos API

API REST para gestionar Enanos, hecha con **Express + TypeScript + Prisma (SQLite)**.
Basada en la estructura del ejemplo oficial [prisma-examples/orm/express](https://github.com/prisma/prisma-examples/tree/latest/orm/express).

## Modelo

```prisma
model Enano {
  id     Int    @id @default(autoincrement())
  nombre String
  edad   Int?
}
```

## Cómo correrlo

1. Cloná el repo e instalá las dependencias:

   ```bash
   git clone <URL-DE-ESTE-REPO>
   cd enanos-backend
   npm install
   ```

2. Copiá el archivo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

3. Creá la base de datos SQLite y aplicá las migraciones:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Levantá el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   El servidor queda escuchando en `http://localhost:3000`.

## Endpoints

| Método | Ruta          | Descripción                          | Body (JSON)                 |
|--------|---------------|---------------------------------------|------------------------------|
| GET    | `/enanos`     | Lista todos los enanos                | -                            |
| GET    | `/enanos/:id` | Obtiene un enano por id               | -                            |
| POST   | `/enanos`     | Crea un enano                         | `{ "nombre": "Gruñón", "edad": 350 }` |
| DELETE | `/enanos/:id` | Elimina un enano por id               | -                            |

> `edad` es opcional: se puede crear un enano solo con `nombre`.

## Ver los datos (opcional)

```bash
npx prisma studio
```
