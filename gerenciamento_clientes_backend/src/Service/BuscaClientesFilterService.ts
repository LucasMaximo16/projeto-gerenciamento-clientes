import { ClienteRepository } from "../Repository/ClienteRepository";

export class BuscaClientesFilterService{
    async filterClientes(filter: FilterClients) {
        const clienteRepository = new ClienteRepository
        const result = clienteRepository.buscarClientesFilter(filter)

        return result
    }
}