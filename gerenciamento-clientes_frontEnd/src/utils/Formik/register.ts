import * as Yup from 'yup';

const registerInitialValues = { nome: '', email: '', telefone: '', coordenada_x: '', coordenada_y: '' };
const registerSchema = Yup.object().shape({
    nome: Yup.string(),
    email: Yup.string().email('Email Invalido'),
    telefone: Yup.string(),
    coordenada_x: Yup.number().max(20,"Valor Maximo é 20"),
    coordenada_y: Yup.number().max(20, "Valor Maximo é 20")
});
export { registerInitialValues, registerSchema };