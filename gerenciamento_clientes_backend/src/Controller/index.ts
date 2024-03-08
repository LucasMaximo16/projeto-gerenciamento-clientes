import { BuscaClientesFilterController } from "./BuscaClientesFilter";
import { CreateClientesController } from "./CreateClientesController";
import { RotasClienteController } from "./RotasClienteController";

//Arquivo contruido para mapeamento das controlers a fim de serem instanciadas na pasta .routes

const createClienteController =  new CreateClientesController
const rotasClienteController = new RotasClienteController
const buscarCLientesfilter = new BuscaClientesFilterController

export { createClienteController, rotasClienteController, buscarCLientesfilter }