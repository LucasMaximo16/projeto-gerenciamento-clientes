import { Request, Response } from "express";
import { ClienteDTO } from "../DTO/ClienteDTO";
import { RoutesClienteService } from "../Service/RoutesClienteService";
import { BuscaClientesSerivice } from "../Service/BuscaClientesService";

export class RotasClienteController {
    async handle(request: Request, response: Response) {

        try {
            const routesClienteService = new RoutesClienteService
            const buscaClientesService = new BuscaClientesSerivice
            
            const clientesList = await buscaClientesService.getClientes()
            console.log(clientesList);
            const result = await routesClienteService.calcularRota(clientesList.data)
            return response.status(200).json(result)

        } catch (error) {
            const messageError = (error as Error).message
            response.status(400).json(messageError)
        }
    }
}