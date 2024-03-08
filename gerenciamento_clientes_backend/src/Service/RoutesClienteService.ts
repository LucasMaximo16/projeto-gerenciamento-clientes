// Importações de tipos DTO (Data Transfer Object) para clientes e rotas.
import { ClienteDTO } from "../DTO/ClienteDTO";
import { RotasDTO } from "../DTO/RotasDTO";

// Definição de um tipo 'Ponto' que pode ser uma coordenada x, y ou um ClienteDTO.
type Ponto = { x: number; y: number; } | ClienteDTO;

//Classe para regras de negócio...calculo da rota
export class RoutesClienteService {

    // Método para calcular a rota entre vários clientes.
    calcularRota(clientes: ClienteDTO[]): RotasDTO {
        // Inicialização de um array para armazenar a ordem de visita aos clientes.
        let ordemVisita: ClienteDTO[] = [];

        // Variável para manter a soma da distância total percorrida.
        let distanciaTotal = 0;
        
        // Criação de uma cópia da lista de clientes para marcar os que ainda não foram visitados.
        let clientesNaoVisitados = [...clientes];

        // Define a posição inicial da empresa na coordenada (0, 0).
        let posicaoAtual = { x: 0, y: 0 };

        // Enquanto ainda houver clientes não visitados, o loop continua.
        while (clientesNaoVisitados.length > 0) {
           
            console.log(clientesNaoVisitados, "CLIENTES N VISITADOS");
            
            // Variáveis para determinar o próximo cliente a ser visitado.
            let proximoIndex = 0;
            let distanciaMinima = Number.MAX_VALUE; //VALOR MAXIMO DE UM NUMERO NO JAVASCRIPT
            console.log(distanciaMinima, "DISTANCIA MINIMA");
            

            // Iteração sobre os clientes não visitados para encontrar o mais próximo.
            for (let i = 0; i < clientesNaoVisitados.length; i++) {
                
                // Calcula a distância do cliente atual até o cliente i.
                let d = this.distanciaEntreDoisPontos(posicaoAtual, clientesNaoVisitados[i]);
                console.log(d, "distanciadoispontosMinima");
                
                
                // Se a distância for a menor até agora, atualiza a distância mínima e o índice do próximo cliente.
                if (d < distanciaMinima) {
                    distanciaMinima = d;
                    proximoIndex = i;
                }
            }

            // Adiciona a distância mínima encontrada à distância total.
            distanciaTotal += distanciaMinima;
            
            // Atualiza a posição atual para a localização do próximo cliente.
            posicaoAtual = {
                x: clientesNaoVisitados[proximoIndex].coordenada_x,
                y: clientesNaoVisitados[proximoIndex].coordenada_y,
            };
            
            // Adiciona o cliente visitado à ordem de visita e o remove da lista de não visitados.
            ordemVisita.push(clientesNaoVisitados[proximoIndex]);
            clientesNaoVisitados.splice(proximoIndex, 1);
        }

        // Após visitar todos os clientes, calcula a distância para retornar ao ponto de origem.
        distanciaTotal += this.distanciaEntreDoisPontos(posicaoAtual, { x: 0, y: 0 });

        // Retorna o resultado contendo a ordem de visita e a distância total percorrida.
        return { ordemVisita, distanciaTotal };
    }

    // Método auxiliar para calcular a distância euclidiana entre dois pontos.
    distanciaEntreDoisPontos(pontoA: Ponto, pontoB: Ponto): number {
        console.log("PONTO A", pontoA);
        console.log("PONTO B", pontoB);
        
        // Extrai as coordenadas x e y dos pontos, tratando se são do tipo ClienteDTO ou um simples ponto.
        const x1 = 'coordenada_x' in pontoA ? pontoA.coordenada_x : pontoA.x;
        const y1 = 'coordenada_y' in pontoA ? pontoA.coordenada_y : pontoA.y;
        const x2 = 'coordenada_x' in pontoB ? pontoB.coordenada_x : pontoB.x;
        const y2 = 'coordenada_y' in pontoB ? pontoB.coordenada_y : pontoB.y;

        // Calcula e retorna a distância euclidiana entre os dois pontos.
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

}
