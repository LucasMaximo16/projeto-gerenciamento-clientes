import { ClienteDTO } from "../DTO/ClienteDTO";
import pool from "../db";
import { IDatabaseResponse } from "../types/IDataBaseResponse";

//Classe para realizar operações no data-base

export class ClienteRepository {
    //Metodo para cadastro de clientes
    async createCliente(data: ClienteDTO): IDatabaseResponse{
        console.log(data, "REPOSITORY");
        
        return await pool.query(
            'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [data.nome, data.email, data.telefone, data.coordenada_x, data.coordenada_y]
        )    
        .then((result) => {
            return {
                status: 200,
                data : result.rows[0]
            }
        }).catch((error) => {            
            return {
                status: 400,
                data: {
                    message: "INTERNAL SERVER ERROR"
                }
            }
        })
    }

    async buscaClientes() : IDatabaseResponse{
        console.log("ERRADOOOOO");
        
        return await pool.query("SELECT * FROM clientes")
        .then((result) => {
            return{
                data:result.rows,
                status:200
            }
        }).catch((error) => {
            return {
                status: 400,
                data: {
                    message: "INTERNAL SERVER ERROR"
                }
            }
        })
    }

    //REALIZAÇÃO DE FILTROS PARA BUSCA
    async buscarClientesFilter(filtros: FilterClients): IDatabaseResponse {
        // Definição inicial da query SQL que será usada para buscar dados na tabela de clientes.
        // A condição "WHERE 1=1" é um truque usado para facilitar a adição de condições adicionais com "AND" 
        //sem ter que verificar se é a primeira condição.
        let baseQuery = "SELECT * FROM clientes WHERE 1=1";
        const conditions: string[] = []; // Array para armazenar as condições de filtro que serão aplicadas.
        const values: any[] = []; // Array para armazenar os valores correspondentes às condições de filtro.

        // Itera sobre cada entrada do objeto de filtros recebido.
        Object.entries(filtros).forEach(([key, value], index) => {
            // Ignora campos numéricos se o valor for uma string vazia para evitar erros.
            if (value === "" && ['coordenada_x', 'coordenada_y'].includes(key)) {
                return;
            } else if (value !== undefined) { // Verifica se o valor não é undefined.
                const placeholderIndex = index + 1; // Prepara um índice para usar como placeholder na query.
                // Se o campo for 'nome', 'telefone' ou 'email', usa o operador LIKE para comparação de strings parciais.
                if (['nome', 'telefone', 'email'].includes(key)) {
                    conditions.push(`${key} LIKE $${placeholderIndex}`); // Ex: nome LIKE %lucas%
                    values.push(`%${value}%`); // Adiciona o valor com os símbolos de percentagem para busca parcial.
                } else {
                    // Para outros campos, usa a comparação direta de igualdade.
                    conditions.push(`${key} = $${placeholderIndex}`);
                    // Converte o valor para número se o campo esperar um valor numérico.
                    const valorNumerioco = ['coordenada_x', 'coordenada_y'].includes(key) ? Number(value) : value;
                    values.push(valorNumerioco);
                }
            }
        });

        // Se houver condições de filtro definidas, adiciona-as à query base.
        if (conditions.length > 0) {
            baseQuery += " AND " + conditions.join(" AND ");
        }

        try {
            // Executa a query no banco de dados usando a query construída e os valores dos filtros.
            const { rows } = await pool.query(baseQuery, values);
            // Retorna os dados obtidos e o status de sucesso.
            return {
                data: rows,
                status: 200
            };
        } catch (err) {
            // Em caso de erro na execução da query, registra o erro e o lança novamente para ser tratado por quem chamou a função.
            console.error('Erro ao buscar clientes', err);
            throw err;
        }
    }
}