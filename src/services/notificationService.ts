import { AppDataSource } from "../DataSource.js"
import { NotificacaoEntity } from "../entitys/notification.js"
import { StatusOS } from "../types/TypeOrdem.js"

export const notificacoesData = AppDataSource.getRepository(NotificacaoEntity)

export const getAllNotificationService = async (prestadorId: number) => {
    const notificacao = await notificacoesData.find({
        where:{
            ordens:{
                prestadorId: prestadorId
            }
        },
        select: {
            data: true,
            descricao: true,
            id: true,
            ordemId: false,
            ordens: {
                cliente: {
                    codAcesso: false,
                    id: false,
                    nome: true,
                    telefone: false
                },
                dataCriacao: true,
                descricao: false,
                id: false,
                placa: true,
                status: true,
                tipoServico: true
            },
            status: true,
            titulo: true
        }
    })

    return notificacao
}

export const getNotificationUserService = async (cod: number) => {
    const notifications = notificacoesData.find({
        where: {
            ordens: {
                cliente: {
                    id: cod
                }
            }
        }
    })

    return notifications
}

export const notificationCreateOrder = async (cliente: string, status: string, ordemId: number) => {
    const criarNotificacao = notificacoesData.create({
        titulo: "NOVA ORDEM CRIADA",
        descricao: `Nova ordem cadastrada para o cliente ${cliente}`,
        data: new Date(),
        status: status,
        ordemId: ordemId
    })

    await notificacoesData.save(criarNotificacao)
}

export const notificationUpdateStatus = async (cliente: string, status: string, ordenId: number) => {
    const criarNotificacao = notificacoesData.create({
        titulo: "MUDANÇA DE STATUS",
        descricao: `A ordem cadastrada para o cliente ${cliente} mudou de status`,
        data: new Date(),
        status: status,
        ordemId: ordenId
    })

    await notificacoesData.insert(criarNotificacao);
}