import { ClienteRepository } from "../Repository/ClienteRepository";

export class BuscaClientesFilterService{
    //Classe para regras de negócio
    async filterClientes(filter: FilterClients) {
        const clienteRepository = new ClienteRepository
        const result = clienteRepository.buscarClientesFilter(filter)

        return result
    }
}