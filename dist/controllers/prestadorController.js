import { atuaizarPrestador, buscarPrestador, criarPrestador, deletarPrestador, loginService, pegarTodosPrestadores } from "../services/prestadorService.js";
import { z } from 'zod';
export const buscarPrestadorPorIdController = async (request, response) => {
    const id = Number(request.params.id);
    const resposta = await buscarPrestador(id);
    if (!resposta) {
        return response.json({
            mensagem: "Usuário não encontrado"
        });
    }
    return response.json({
        mensagem: "Usuário encontrado",
        prestador: resposta
    });
};
const prestadorSchema = z.object({
    nome: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres"),
    cpf: z.string().transform(valor => valor.replace(/\D/g, "")).pipe(z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos")),
    email: z.string().trim().toLowerCase().pipe(z.email("E-mail inválido")),
    telefone: z.string().transform(valor => valor.replace(/\D/g, ""))
        .pipe(z.string().regex(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos")),
    estabelecimento: z.string().trim()
        .min(2, "Informe o nome do estabelecimento"),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres")
});
export const criarPrestadorController = async (request, response) => {
    const user = prestadorSchema.safeParse(request.body);
    if (!user.success) {
        return response.status(400).json({
            mensagem: "Campos inválidos",
            erro: user.error.format()
        });
    }
    const resposta = await criarPrestador(user.data);
    if (!resposta) {
        return response.status(409).json({
            mensagem: "Prestador já existe"
        });
    }
    return response.status(201).json({
        mensagem: "Prestador cadastrado com sucesso",
    });
};
export const pegarTodosPrestadoresController = async (request, response) => {
    const prestadores = await pegarTodosPrestadores();
    if (prestadores.length === 0) {
        return response.status(200).json({
            mensagem: "Não existe nenhum prestador cadastrado"
        });
    }
    return response.json({
        prestadores
    });
};
export const atualizarPrestadorController = async (request, response) => {
    const id = Number(request.params.id);
    const user = request.body;
    const resposta = await atuaizarPrestador(id, user);
    if (resposta) {
        return response.status(200).json({
            mensagem: "Prestador atualizado",
            prestador: user
        });
    }
    else {
        return response.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }
};
export const deletarPrestadorController = async (request, response) => {
    const id = Number(request.params.id);
    const resposta = await deletarPrestador(id);
    if (resposta) {
        return response.status(200).json({
            mensagem: "Prestador deletado com sucesso"
        });
    }
    else {
        return response.status(404).json({
            mensagem: "Prestador nao encontrado"
        });
    }
};
export const loginControler = async (request, response) => {
    const { email, senha } = request.body;
    const resposta = await loginService(email, senha);
    if (!resposta) {
        return response.status(400).json({
            mensagem: "E-mail ou senha inválidos"
        });
    }
    // const { user, token } = resposta
    return response.json({
        resposta
    });
};
//# sourceMappingURL=prestadorController.js.map