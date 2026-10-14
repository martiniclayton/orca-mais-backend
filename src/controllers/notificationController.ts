import { getAllNotificationService, getNotificationUserService } from "../services/notificationService.js"
import { Request, Response } from 'express'

export const getAllNotification = async (request: Request, response: Response) =>{
    const prestadorId = Number(request.usuario?.id);

    if(!Number.isInteger(prestadorId) || prestadorId <=0){
        return response.status(400).json({
            mensagem: "ID inválido"
        })
    }

    const resposta = await getAllNotificationService(prestadorId)

    if(resposta.length === 0){
        return response.json({
            mensagem: "Não existe nenhuma notificação cadastrada"
        })
    }

    if(!resposta){
        return response.json({
            mensagem: "Erro ao consultar notificação"
        })
    }

    return response.json({
        resposta
    })
}

export const getNotificationUser = async (request: Request, response: Response) =>{
    const clienteId = Number(request.usuario?.id);

    const resposta = await getNotificationUserService(clienteId)

    if(resposta.length === 0) {
        return response.json({
            mensagem: "Cliente não possui notificação"
        })
    }

    return response.json({
        notificacoes: resposta
    })
}