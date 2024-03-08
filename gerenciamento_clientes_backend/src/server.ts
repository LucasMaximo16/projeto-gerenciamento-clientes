import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { routes } from "./routes";
// import { httpServer } from "./http"
import http from "http"
import pool from "./db";

const app = express()
const httpServer = http.createServer(app)

const corsOptions = {
  origin: ['http://localhost:3333', 'http://localhost:4200', 'http://localhost:5173'],
  credentials: true
}

const cors = require('cors')
app.use(cors(corsOptions))


app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(routes)


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

httpServer.listen(3333, () => console.log("SERVER RODANDO NA PORTA 3333"))

app.get('/clientes', async (req: Request, res: Response) => {
  try {
    const allClientes = await pool.query('SELECT * FROM clientes');
    res.json(allClientes.rows);
  } catch (error) {
    const messageError = (error as Error).message
    console.log(messageError)
  }
});

// app.post('/clientes', async (req: Request, res: Response) => {
//   try {
//     const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
//     const novoCliente = await pool.query(
//       'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [nome, email, telefone, coordenada_x, coordenada_y]
//     );
//     res.json(novoCliente.rows[0]);
//   } catch (error) {
//     const messageError = (error as Error).message
//     console.log(messageError)
//   }
// });

// app.post('/clientes', async (req: Request, res: Response) => {
//   try {
//     const { nome, email, telefone} = req.body;
//     const novoCliente = await pool.query(
//       'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
//       [nome, email, telefone]
//     );
//     res.json(novoCliente.rows[0]);
//   } catch (error) {
//     const messageError = (error as Error).message
//     console.log(messageError)
//   }
// });