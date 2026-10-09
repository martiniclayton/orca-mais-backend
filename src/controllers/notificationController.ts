import { getAllNotificationService } from "../services/notificationService.js"
import { Request, Response } from 'express'

export const getAllNotification = async (request: Request, response: Response) =>{
    const resposta = await getAllNotificationService()

    if(!resposta){
        return response.json({
            mensagem: "Erro ao consultar notificação"
        })
    }

    return response.json({
        resposta
    })
}