import { ClienteRepository } from "../Repository/ClienteRepository";

export class BuscaClientesSerivice {
    async getClientes() {
        const clienteRepository = new ClienteRepository
        return await clienteRepository.buscaClientes()
    }
}