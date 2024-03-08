import { Router } from "express";
import { clienteRoute } from "./cliente.routes";

const routes = Router();

routes.use('/clientes', clienteRoute)

export { routes }
