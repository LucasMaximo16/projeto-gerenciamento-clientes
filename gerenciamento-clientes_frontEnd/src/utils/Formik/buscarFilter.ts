import * as Yup from 'yup';
/* eslint-disable @typescript-eslint/no-unused-vars */

const buscaInitialValues = {nome: "", email: "", telefone: "", coordenada_x: "", coordenada_y: ""}
const buscaSchema =  Yup.object().shape({
    nome: Yup.string(),
    email: Yup.string(),
    telefone: Yup.string(),
    coordenada_x: Yup.number(),
    coordenada_y: Yup.number(),
})

export {buscaInitialValues, buscaSchema}