import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// GET /enanos -> lista todos los enanos
app.get('/enanos', async (req: Request, res: Response) => {
  const enanos = await prisma.enano.findMany({
    orderBy: { id: 'asc' },
  });
  res.json(enanos);
});

// GET /enanos/:id -> obtiene un enano puntual
app.get('/enanos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const enano = await prisma.enano.findUnique({ where: { id } });
  if (!enano) {
    return res.status(404).json({ error: 'Enano no encontrado' });
  }
  res.json(enano);
});

// POST /enanos -> crea un enano nuevo (nombre y, opcionalmente, edad)
app.post('/enanos', async (req: Request, res: Response) => {
  const { nombre, edad } = req.body;

  if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
  }

  let edadNumerica: number | null = null;
  if (edad !== undefined && edad !== null && edad !== '') {
    edadNumerica = Number(edad);
    if (Number.isNaN(edadNumerica)) {
      return res.status(400).json({ error: 'El campo "edad" debe ser numérico' });
    }
  }

  const nuevoEnano = await prisma.enano.create({
    data: { nombre, edad: edadNumerica },
  });

  res.status(201).json(nuevoEnano);
});

// DELETE /enanos/:id -> elimina un enano por id
app.delete('/enanos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.enano.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Enano no encontrado' });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
