import { Request, Response } from "express";
import { ClienteDTO } from "../DTO/ClienteDTO";
import { CreateClienteService } from "../Service/CreateClienteService";

export class CreateClientesController{
    async handle (request: Request, response:Response){       
        const data : ClienteDTO =  request.body        
        try {
            const createClienteService =  new CreateClienteService()
            const result =  await createClienteService.create(data)
            console.log(result.data, "RESULT.DATA");
            
            return response.status(result.status).json(result.data)

        } catch (error) {
            const messageError = (error as Error).message
            response.status(400).json(messageError)
        }
    }

}