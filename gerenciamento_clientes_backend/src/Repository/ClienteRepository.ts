import { ClienteDTO } from "../DTO/ClienteDTO";
import pool from "../db";
import { IDatabaseResponse } from "../types/IDataBaseResponse";

export class ClienteRepository {
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

    async buscarClientesFilter(filtros: FilterClients): IDatabaseResponse {
        let baseQuery = "SELECT * FROM clientes WHERE 1=1";
        const conditions: string[] = [];
        const values: any[] = [];

        Object.entries(filtros).forEach(([key, value], index) => {
            // Verifica se o valor é uma string vazia e o campo é numérico
            if (value === "" && ['coordenada_x', 'coordenada_y'].includes(key)) {
                // Pode optar por omitir o filtro se o valor não for válido
                return;
            } else if (value !== undefined) {
                const placeholderIndex = index + 1;
                if (['nome', 'telefone', 'email'].includes(key)) {
                    conditions.push(`${key} LIKE $${placeholderIndex}`);
                    values.push(`%${value}%`);
                } else {
                    conditions.push(`${key} = $${placeholderIndex}`);
                    // Converte para número se for um campo esperando um valor numérico
                    const numericValue = ['coordenada_x', 'coordenada_y'].includes(key) ? Number(value) : value;
                    values.push(numericValue);
                }
            }
        });

        if (conditions.length > 0) {
            baseQuery += " AND " + conditions.join(" AND ");
        }

        try {
            const { rows } = await pool.query(baseQuery, values);
            return {
                data: rows,
                status: 200
            };
        } catch (err) {
            console.error('Erro ao buscar clientes', err);
            throw err; // Lançar o erro permite que o chamador da função o trate adequadamente
        }
    }
}