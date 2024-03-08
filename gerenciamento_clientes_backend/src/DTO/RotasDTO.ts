import { ClienteDTO } from "./ClienteDTO";

export interface RotasDTO {
    ordemVisita: ClienteDTO[],
    distanciaTotal: number
}
