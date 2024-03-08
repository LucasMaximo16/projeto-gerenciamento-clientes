import { Request, Response } from "express";
import { BuscaClientesSerivice } from "../Service/BuscaClientesService";

//Camda de controle
export class BuscaClientesController {
    
    async handle(req: Request, resp: Response){ 
        try {
            const buscarClientes =  new BuscaClientesSerivice
            const result = await buscarClientes.getClientes()
            return resp.status(result.status).json(result.data)
        } catch (error) {
            const messageError = (error as Error).message
            resp.status(400).json(messageError)
        }
    }
}