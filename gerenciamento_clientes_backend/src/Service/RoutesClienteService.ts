import { ClienteDTO } from "../DTO/ClienteDTO";
import { RotasDTO } from "../DTO/RotasDTO";
type Ponto = { x: number; y: number; } | ClienteDTO;

export class RoutesClienteService {
    
    calcularRota(clientes: ClienteDTO[]): RotasDTO {
        let ordemVisita: ClienteDTO[] = [];
        let distanciaTotal = 0;
        let clientesNaoVisitados = [...clientes];

        // Supondo que a empresa está na origem (0, 0)
        let posicaoAtual = { x: 0, y: 0 };

        while (clientesNaoVisitados.length > 0) {
            let proximoIndex = 0;
            let distanciaMinima = Number.MAX_VALUE;

            for (let i = 0; i < clientesNaoVisitados.length; i++) {
                let d = this.distanciaEntreDoisPontos(posicaoAtual, clientesNaoVisitados[i]);
                if (d < distanciaMinima) {
                    distanciaMinima = d;
                    proximoIndex = i;
                }
            }

            distanciaTotal += distanciaMinima;
            posicaoAtual = {
                x: clientesNaoVisitados[proximoIndex].coordenada_x,
                y: clientesNaoVisitados[proximoIndex].coordenada_y,
            };
            ordemVisita.push(clientesNaoVisitados[proximoIndex]);
            clientesNaoVisitados.splice(proximoIndex, 1);
        }

        // Retorna à origem
        distanciaTotal += this.distanciaEntreDoisPontos(posicaoAtual, { x: 0, y: 0 });

        return { ordemVisita, distanciaTotal };
    }



    distanciaEntreDoisPontos(pontoA: Ponto, pontoB: Ponto): number {
        // Extrair coordenadas, tratando os casos em que os pontos são do tipo ClienteDTO
        const x1 = 'coordenada_x' in pontoA ? pontoA.coordenada_x : pontoA.x;
        const y1 = 'coordenada_y' in pontoA ? pontoA.coordenada_y : pontoA.y;
        const x2 = 'coordenada_x' in pontoB ? pontoB.coordenada_x : pontoB.x;
        const y2 = 'coordenada_y' in pontoB ? pontoB.coordenada_y : pontoB.y;

        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

}