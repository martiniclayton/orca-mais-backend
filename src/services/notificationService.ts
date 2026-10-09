import { AppDataSource } from "../DataSource.js"
import { NotificacaoEntity } from "../entitys/notification.js"

export const notificacoesData = AppDataSource.getRepository(NotificacaoEntity)

export const getAllNotificationService = async () =>{
    const notificacao = await notificacoesData.find()

    return notificacao
}