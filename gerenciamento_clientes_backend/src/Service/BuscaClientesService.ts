import { ClienteRepository } from "../Repository/ClienteRepository";

export class BuscaClientesSerivice {
    //Classe para regras de negócio
    async getClientes() {
        const clienteRepository = new ClienteRepository
        return await clienteRepository.buscaClientes()
    }
}