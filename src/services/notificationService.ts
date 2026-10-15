import { AppDataSource } from "../DataSource.js"
import { NotificacaoEntity } from "../entitys/notification.js"

export const notificacoesData = AppDataSource.getRepository(NotificacaoEntity)

export const getAllNotificationService = async (prestadorId: number) => {
    const notificacao = await notificacoesData.find({
        where:{
            ordens:{
                prestadorId: prestadorId
            }
        },
        relations: {
            ordens: {
                cliente: true
            },
        },
        select: {
            data: true,
            descricao: true,
            id: true,
            ordens: {
                cliente: {
                    nome: true,
                },
                dataCriacao: true,
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
    const notifications =  await notificacoesData.find({
        where: {
            ordens: {
                cliente: {
                    id: cod
                }
            }
        },
        relations:{
            ordens: {
                cliente: true
            }
        },
        select:{
            data: true,
            ordens: {
                placa: true,
                tipoServico: true,
                cliente:{
                    nome: true
                }
            },
            status: true,
            titulo: true
        }
    })

    return notifications
}

export const notificationCreateOrder = async (cliente: string, status: string, ordemId: number) => {
    const criarNotificacao = await notificacoesData.create({
        titulo: "NOVA ORDEM CRIADA",
        descricao: `Nova ordem cadastrada para o cliente ${cliente}`,
        data: new Date(),
        status: status,
        ordemId: ordemId
    })

    await notificacoesData.save(criarNotificacao)
}

export const notificationUpdateStatus = async (cliente: string, status: string, ordenId: number) => {
    const criarNotificacao = await notificacoesData.create({
        titulo: "MUDANÇA DE STATUS",
        descricao: `A ordem cadastrada para o cliente ${cliente} mudou de status`,
        data: new Date(),
        status: status,
        ordemId: ordenId
    })

    await notificacoesData.insert(criarNotificacao);
}