import { Router } from "express";
import { clienteRoute } from "./cliente.routes";

const routes = Router();

//Definição de uma rota padrão para uma determinada rota 
routes.use('/clientes', clienteRoute)

//Caso ouvesse outro tipo de rota poderia colocar
//routes.use('/usuarios', usuariosRoute) e exporta-la

export { routes }
