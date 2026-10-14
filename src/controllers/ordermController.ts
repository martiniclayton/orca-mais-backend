import { adcOrdem, attStatus, excluirOrdem, filtrarOrdensFinalizadas, pegarTodasOrderns } from "../services/ordemService.js"
import { Request, Response } from "express";
import { z } from "zod";


export const getAllorders = async (request: Request, response: Response) => {

    const { status } = request.query;
    const prestadorId = Number(request.usuario?.id);

    if(!Number.isInteger(prestadorId) || prestadorId <= 0){
        return response.status(401).json({
            mensagem: "Prestador não identificado"
        })
    }

    const statusValue = z.union([
        z.literal("Finalizado"),
        z.literal("Ativos")
    ]).safeParse(status);

    if (status !== undefined && !statusValue.success) {
        return response.status(400).json({
            mensagem: "Status inválido"
        })
    }

    if (statusValue.success) {
        const resposta = await filtrarOrdensFinalizadas(statusValue.data, prestadorId)
        return response.status(200).json({
            mensagem: "Ordens Finalizadas",
            ordens: resposta
        })
    }


    const Ordens = await pegarTodasOrderns(prestadorId);

    if (Ordens.length === 0) {
        return response.status(200).json({
            mensagem: "Nenhuma ordem cadastrada",
            ordens: Ordens
        })
    }
    return response.status(200).json({
        ordens: Ordens
    })
}
const statusEnum = z.enum([
    "Em andamento",
    "Pronto para retirada",
    "Finalizado"
])
const ordemSchema = z.object({
    nome: z.string().trim().min(1),
    cpf: z.string().trim().min(1),
    telefone: z.string().trim().min(1),
    placa: z.string().trim().min(1),
    tipoServico: z.string().trim().min(1),
    status: statusEnum,
    descricao: z.string().optional()
})
export const pushOrder = async (request: Request, response: Response) => {
    const ordem = ordemSchema.safeParse(request.body);
    const prestadorId = Number(request.usuario?.id);

    if(!Number.isInteger(prestadorId) || prestadorId <=0){
        return response.status(401).json({
            mensagem: "Prestador não informado"
        })
    }

    if (!ordem.success) {
        return response.status(400).json({
            mensagem: "Campos inválidos",
            erro: ordem.error.format()
        })
    }

    const resposta = await adcOrdem(ordem.data, prestadorId)

    if (!resposta) {
        return response.status(500).json({
            mensagem: "Não foi possivel cadastrar a ordem",
        })
    }

    return response.status(201).json({
        mensagem: "Ordem cadastrada com sucesso"
    })
}

export const attOrder = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const prestadorId = Number(request.usuario?.id);

    if(!Number.isInteger(id) || id <= 0){
        return response.status(400).json({
            mensagem: "ID da ordem inválido"
        })
    }

    if(!Number.isInteger(prestadorId) || prestadorId <=0){
        return response.status(401).json({
            mensagem: "Prestador não informado"
        })
    }

    const ordemAtualizada = await attStatus(id, prestadorId)

    if (ordemAtualizada) {
        return response.status(200).json({
            mensagem: "Status atualizado",
            novoStatus: ordemAtualizada.status
        })
    } else {
        return response.status(404).json({
            mensagem: "A ordem não existe"
        })
    }

}

export const deleteOrder = async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const prestadorId = Number(request.usuario?.id);

    if(!Number.isInteger(id) || id <= 0){
        return response.status(400).json({
            mensagem: "ID da ordem inválido"
        })
    }

    if(!Number.isInteger(prestadorId) || prestadorId <=0){
        return response.status(401).json({
            mensagem: "Prestador não informado"
        })
    }

    const resposta = await excluirOrdem(id, prestadorId);

    if (resposta) {
        response.status(200).json({
            mensagem: "Ordem excluida com sucesso"
        })
    } else {
        response.status(404).json({
            mensagem: "A ordem não encontrada"
        })
    }
}