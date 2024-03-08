import * as Yup from 'yup';

const registerInitialValues = { nome: '', email: '', telefone: '', coordenada_x: '', coordenada_y: '' };
const registerSchema = Yup.object().shape({
    nome: Yup.string(),
    email: Yup.string().email('Email Invalido').min(8, 'Email Invalido').max(124, 'Email Invalido'),
    telefone: Yup.string().min(9,'Telefone Invalido').max(12,"Telefone Invalido"),
    coordenada_x: Yup.number().max(20,"Valor Maximo é 20"),
    coordenada_y: Yup.number().max(20, "Valor Maximo é 20")
});
export { registerInitialValues, registerSchema };