import { atuaizarPrestador, criarPrestador, deletarPrestador, loginService } from "../services/prestadorService.js";
import { z } from 'zod';
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
    const prestador = prestadorSchema.safeParse(request.body);
    if (!prestador.success) {
        return response.status(400).json({
            mensagem: "Campos inválidos",
            erro: prestador.error.format()
        });
    }
    const resposta = await criarPrestador(prestador.data);
    if (!resposta) {
        return response.status(409).json({
            mensagem: "Prestador já existe"
        });
    }
    return response.status(201).json({
        mensagem: "Prestador cadastrado com sucesso",
    });
};
const atualizarPrestadorSchema = z.object({
    email: z.string().trim().toLowerCase().pipe(z.email("E-mail inválido")),
    telefone: z.string().transform(valor => valor.replace(/\D/g, ""))
        .pipe(z.string().regex(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos")),
    estabelecimento: z.string().trim()
        .min(2, "Informe o nome do estabelecimento"),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres")
});
export const atualizarPrestadorController = async (request, response) => {
    const id = Number(request.usuario?.id);
    const prestador = atualizarPrestadorSchema.safeParse(request.body);
    if (!Number.isInteger(id) || id <= 0) {
        return response.status(400).json({
            mensagem: "Número de ID inválido"
        });
    }
    if (!prestador.success) {
        return response.status(400).json({
            mensagem: "Dados do prestador inválidos"
        });
    }
    const resposta = await atuaizarPrestador(id, prestador.data);
    if (resposta) {
        return response.status(200).json({
            mensagem: "Prestador atualizado",
            prestador: prestador.data
        });
    }
    else {
        return response.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }
};
export const deletarPrestadorController = async (request, response) => {
    const id = Number(request.usuario?.id);
    if (!Number.isInteger(id) || id <= 0) {
        return response.status(400).json({
            mensagem: "Número de ID inválido"
        });
    }
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
const loginSchema = z.object({
    email: z.string().trim().toLowerCase().pipe(z.email("E-mail inválido")),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres")
});
export const loginControler = async (request, response) => {
    const userLogin = loginSchema.safeParse(request.body);
    if (!userLogin.success) {
        return response.status(400).json({
            mensagem: "Dados do prestador inválidos"
        });
    }
    const { email, senha } = userLogin.data;
    const resposta = await loginService(email, senha);
    if (!resposta) {
        return response.status(400).json({
            mensagem: "E-mail ou senha inválidos"
        });
    }
    response.cookie("tokenTrack", resposta.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 60 * 60 * 1000,
        path: "/"
    });
    return response.json({
        resposta
    });
};
export const logoutController = (request, response) => {
    response.clearCookie("tokenTrack", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
    });
    return response.status(200).json({
        mensagem: "Logout realizado com sucesso"
    });
};
export const verificarSessaoPrestador = async (request, response) => {
    return response.status(200).json({
        prestadorId: request.usuario?.id,
        tipo: request.usuario?.tipo
    });
};
//# sourceMappingURL=prestadorController.js.map