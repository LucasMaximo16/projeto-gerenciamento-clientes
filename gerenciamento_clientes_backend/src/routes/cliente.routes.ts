import { Request, Response, Router } from "express";
import { buscarCLientesfilter, createClienteController, rotasClienteController } from "../Controller";

const clienteRoute = Router()

//Criação de rotas para chamada HTTP
clienteRoute.post('/', (request: Request, response: Response)=>{
    return createClienteController.handle(request,response)
})

clienteRoute.post('/filter', (request: Request, response: Response) => {
    return buscarCLientesfilter.handle(request, response)
})

clienteRoute.get('/findRota', (request: Request, response: Response) => {
    return rotasClienteController.handle(request, response)
})




export {clienteRoute}