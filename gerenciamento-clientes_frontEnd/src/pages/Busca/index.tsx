import { useFormik } from 'formik'
import styles from './styles.module.sass'
import { buscaInitialValues, buscaSchema } from '../../utils/Formik/buscarFilter'
import api from '../../service/api';
import { useState } from 'react';

interface Cliente {
    nome: null
    email: null
    telefone: null
    coordenada_x: null
    coordenada_y: null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BuscarClientes () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [clientes, setClientes] = useState<Cliente[]>([])

    function handleSubmit(data: typeof buscaInitialValues) {
            console.log("CHAMANDO")
            api
            .post('/clientes/filter', {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                coordenada_x: data.coordenada_x,
                coordenada_y: data.coordenada_y
                
            })
            .then((result) => {
                console.log(result);
                setClientes(result.data)
            })
            .catch((erro) => {
                console.log(erro);
            });

            setClientes([])
        }

    const formikProps = useFormik({
        initialValues: buscaInitialValues,
        onSubmit: (data) => handleSubmit(data),
        validationSchema: buscaSchema,

    })
    return(
        <>
        <h1>Buscar Clientes</h1>
            <div className={styles.register}>
                <form onSubmit={formikProps.handleSubmit}>
                    <div className={styles.cardRegister}>
                        <div className={styles.textfield}>
                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder="nome"
                            name="nome"
                            className={styles.input}
                            onChange={formikProps.handleChange}
                        />
                        </div>
                        <div className={styles.textfield}>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                type="text"
                                placeholder="email"
                                name="email"
                                className={styles.input}
                                onChange={formikProps.handleChange}
                            />
                        </div>
                        <div className={styles.textfield}>
                            <label>Telefone</label>
                            <input
                                type="text"
                                placeholder="telefone"
                                name="telefone"
                                className={styles.input}
                                onChange={formikProps.handleChange}
                            />
                            </div>
                        <div className={styles.textfield}>
                        <label>Cordenada x</label>
                        <input
                            type="number"
                            placeholder="Digite a cordenada x"
                            name="coordenada_x"
                            className={styles.input}
                            onChange={formikProps.handleChange}
                        />
                        </div>
                        <div className={styles.textfield}>
                        <label>Cordenada y</label>
                        <input
                            type="number"
                            placeholder="Digite a cordenada y"
                            name="coordenada_y"
                            className={styles.input}
                            onChange={formikProps.handleChange}
                        />
                        </div>
                        <button className={styles.btn} type="submit">
                            Buscar
                        </button>
                    </div>
                </form>
                {clientes.length > 0 && (
                    <div className={styles.clientTable}>
                        <h2>Clientes Registrados</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Cordenada X</th>
                                <th>Cordenada Y</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clientes.map((cliente, index) => (
                                <tr key={index}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.coordenada_x}</td>
                                <td>{cliente.coordenada_y}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}