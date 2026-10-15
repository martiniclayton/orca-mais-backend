import { getAllNotificationService, getNotificationUserService } from "../services/notificationService.js"
import { Request, Response } from 'express'

export const getAllNotification = async (request: Request, response: Response) => {
    const prestadorId = Number(request.usuario?.id);

    if (!Number.isInteger(prestadorId) || prestadorId <= 0) {
        return response.status(400).json({
            mensagem: "ID inválido"
        })
    }

    const resposta = await getAllNotificationService(prestadorId)

    
    if (!resposta) {
        return response.status(500).json({
            mensagem: "Erro ao consultar notificação"
        })
    }
    
    if (resposta.length === 0) {
        return response.status(200).json({
            mensagem: "Não existe nenhuma notificação cadastrada"
        })
    }

    return response.status(200).json({
        resposta
    })
}

export const getNotificationUser = async (request: Request, response: Response) => {
    const clienteId = Number(request.usuario?.id);  

    if (!Number.isInteger(clienteId) || clienteId <= 0) {
        return response.status(400).json({
            mensagem: "Id inválido"
        })
    }

    const resposta = await getNotificationUserService(clienteId)

    if (resposta.length === 0) {
        return response.status(200).json({
            mensagem: "Cliente não possui notificação"
        })
    }

    return response.status(200).json({
        notificacoes: resposta
    })
}