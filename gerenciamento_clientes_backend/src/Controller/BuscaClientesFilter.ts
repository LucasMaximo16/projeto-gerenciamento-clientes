import { Request, Response } from "express";
import { BuscaClientesFilterService } from "../Service/BuscaClientesFilterService";

export class BuscaClientesFilterController {
    async handle (req: Request, res: Response){
        console.log("Busca")
        const filter = req.body
        try {
            const buscaClientesFilter = new BuscaClientesFilterService()
            const result = await buscaClientesFilter.filterClientes(filter)

            return res.status(result.status).json(result.data)
        } catch (error) {
            const messageError = (error as Error).message
            res.status(400).json(messageError)
        }
    }
}