import { BuscaClientesFilterController } from "./BuscaClientesFilter";
import { CreateClientesController } from "./CreateClientesController";
import { RotasClienteController } from "./RotasClienteController";

const createClienteController =  new CreateClientesController
const rotasClienteController = new RotasClienteController
const buscarCLientesfilter = new BuscaClientesFilterController

export { createClienteController, rotasClienteController, buscarCLientesfilter }