import { Request, Response } from "express";
import { ClienteDTO } from "../DTO/ClienteDTO";
import { ClienteRepository } from "../Repository/ClienteRepository";

export class CreateClienteService {
    
    async create(data: ClienteDTO){
        const repository = new ClienteRepository
        const result = await repository.createCliente(data) 
        console.log(result);
        
        return result
    }
}