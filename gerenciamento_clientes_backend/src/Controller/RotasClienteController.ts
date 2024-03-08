import { Request, Response } from "express";
import { ClienteDTO } from "../DTO/ClienteDTO";
import { RoutesClienteService } from "../Service/RoutesClienteService";
import { BuscaClientesSerivice } from "../Service/BuscaClientesService";

//Camda de controle
export class RotasClienteController {
    async handle(request: Request, response: Response) {
        try {
            //Criar instancias da classe pra chamar seus metodos
            const routesClienteService = new RoutesClienteService
            const buscaClientesService = new BuscaClientesSerivice
            
            //Chamar metodo para buscar todos os clientes cadastrados no banco
            const clientesList = await buscaClientesService.getClientes()

            console.log(clientesList);
            //Após recupera-los em uma variavel, colocamos ela como parametro do metodo "calcularRota()"
            const result = await routesClienteService.calcularRota(clientesList.data)

            //A resposta recura as rotas mais proximas de seus respectivos clientes
            return response.status(200).json(result)

        } catch (error) {
            const messageError = (error as Error).message
            response.status(400).json(messageError)
        }
    }
}