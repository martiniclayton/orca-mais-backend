import { getAllNotificationService, getNotificationUserService } from "../services/notificationService.js"
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

export const getNotificationUser = async (request: Request, response: Response) =>{
    const cod = String(request.params.cod)

    const resposta = await getNotificationUserService(cod)


    return response.json({
        cod: cod,
        ordens: resposta
    })
}