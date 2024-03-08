import styles from './styles.module.sass';
import { registerInitialValues, registerSchema } from '../../utils/Formik/register';
import { useFormik } from 'formik';
import api from '../../service/api';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../utils/AppContext'
import {Modal} from '../../components/Modal'
import GraficoRota from '../../components/GraficoRotas';

interface Cliente {
    nome: string
    email: string
    telefone: string
    coordenada_x: number
    coordenada_y: number
}

export function Home() {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rotas, setRotas] = useState([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {openModal} = useAppContext()

    useEffect(() => {
    api.get('/clientes')
        .then(response => setClientes(response.data))
        .catch(error => console.error(error));
    }, []);
    
    function handleSubmit(data: typeof registerInitialValues) {
        console.log("CHAMANDO")
        api
        .post('/clientes', {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            coordenada_x: data.coordenada_x,
            coordenada_y: data.coordenada_y
            
        })
        .then((result) => {
            setClientes([...clientes,result.data])
            console.log(result);
        })
        .catch((erro) => {
            console.log(erro);
        });
    }
    const formikProps = useFormik({
        initialValues: registerInitialValues,
        onSubmit: (data) => handleSubmit(data),
        validationSchema: registerSchema
    });

    function calculaRota() {
        api
        .get('/clientes/findRota')
        .then((result) => {
            setRotas(result.data.ordemVisita)
            openModal()
            setIsModalOpen(true)
        }).catch((erro) => {
           console.log(erro);
           
        });
    }

    return (
        <>
        <h1>Cadastro de Cliente</h1>
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
                    Cadastrar Cliente
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
                    <button className={styles.btn} onClick={calculaRota}>
                        Calcular Rota
                    </button>
                    {isModalOpen && (
                        <Modal children={
                            <GraficoRota dados={rotas}/>
                        }
                        isOpen={isModalOpen}
                        >
                        </Modal>
                    )}
                </div>
            )}
        </div>
    </>
  );
}