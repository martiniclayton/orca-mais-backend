import { atuaizarPrestador, buscarPrestador, criarPrestador, deletarPrestador, loginService, pegarTodosPrestadores } from "../services/prestadorService.js"
import type { Request, Response } from "express";
import { z } from 'zod';
import { gerarToken } from "../auth/gerarToken.js";


export const buscarPrestadorPorIdController = async (request: Request, response: Response) => {

    const id = Number(request.params.id)

    const resposta = await buscarPrestador(id)

    if (!resposta) {
        return response.json({
            mensagem: "Usuário não encontrado"
        })
    }

    return response.json({
        mensagem: "Usuário encontrado",
        prestador: resposta
    })
}

const prestadorSchema = z.object({
    nome: z.string(),
    cpf: z.string(),
    email: z.string(),
    telefone: z.string(),
    estabelecimento: z.string(),
    senha: z.string()
})

export const criarPrestadorController = async (request: Request, response: Response) => {
    const user = prestadorSchema.safeParse(request.body);

    if(!user.success){
        return response.json({
            mensagem: "Campos inválidos",
            erro: user.error.format()
        });
    }

    const resposta = await criarPrestador(user.data);

    if(!resposta){
        return response.json({
            mensagem: "Prestador já existe"
        })
    }

    return response.json({
        mensagem: "Prestador cadastrado com sucesso",
        prestador: user
    })
}

export const pegarTodosPrestadoresController = async (request: Request, response: Response) => {
    const prestadores = await pegarTodosPrestadores();

    return response.json({
        prestadores
    })
}

export const atualizarPrestadorController = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const user = request.body;

    const resposta = await atuaizarPrestador(id, user)

    if (resposta) {
        return response.json({
            mensagem: "Prestador atualizado",
            prestador: user
        })
    } else {
        return response.json({
            mensagem: "Usuário não encontrado"
        })
    }
}

export const deletarPrestadorController =  async (request: Request, response: Response) => {
    const id = Number(request.params.id);

    const resposta = await deletarPrestador(id)

    if (resposta) {
        return response.json({
            mensagem: "Prestador deletado com sucesso"
        })
    } else {
        return response.json({
            mensagem: "Prestador nao encontrado"
        })
    }
}

export const loginControler = async (request: Request, response: Response) =>{
    const { email, senha } = request.body

    const resposta = await loginService(email, senha);
    if(!resposta){
        return response.status(400).json({
            mensagem: "E-mail ou senha inválidos"
        })
    }

    // const { user, token } = resposta

    return response.json({
        resposta
    })
}
