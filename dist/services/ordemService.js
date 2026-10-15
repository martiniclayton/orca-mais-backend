import { AppDataSource } from "../DataSource.js";
import { Ordens } from "../entitys/ordens.js";
import { BuscarCliente, CriarCliente } from "./clienteService.js";
import { In } from "typeorm";
import { enviarEmailCodigoAcesso } from "./emailService.js";
import { notificationCreateOrder, notificationUpdateStatus } from "./notificationService.js";
const ordensBanco = AppDataSource.getRepository(Ordens);
export const pegarTodasOrderns = async (prestadorId) => {
    const ordens = await ordensBanco.find({
        where: {
            prestadorId: prestadorId
        },
        relations: {
            cliente: true,
            notificacao: false
        },
        select: {
            cliente: {
                nome: true,
                telefone: true
            },
            id: true,
            tipoServico: true,
            placa: true,
            status: true
        }
    });
    return ordens;
};
export const filtrarOrdens = async (status, prestadorId) => {
    let ordens;
    if (status === "Finalizado") {
        ordens = await ordensBanco.find({
            where: {
                status: status,
                prestadorId: prestadorId
            },
            relations: {
                cliente: true
            },
            select: {
                cliente: {
                    nome: true,
                }
            }
        });
    }
    else if (status === "Ativos") {
        ordens = await ordensBanco.find({
            where: {
                status: In(["Em andamento", "Pronto para retirada"]),
                prestadorId: prestadorId
            },
            relations: {
                cliente: true
            },
            select: {
                cliente: {
                    nome: true,
                },
                id: true,
                tipoServico: true,
                placa: true,
                dataCriacao: true,
                status: true
            }
        });
    }
    return ordens;
};
export const adcOrdem = async (ordem, prestadorId) => {
    const usuarioBuscado = await BuscarCliente(ordem.cpf, prestadorId);
    const cliente = usuarioBuscado ?? await CriarCliente({
        nome: ordem.nome,
        cpf: ordem.cpf,
        telefone: ordem.telefone,
        prestadorId: prestadorId
    });
    if (!cliente) {
        throw new Error("Não foi possível encontrar ou criar o cliente");
    }
    const novaOrdem = ordensBanco.create({
        prestadorId: prestadorId,
        clienteId: cliente.id,
        placa: ordem.placa,
        dataCriacao: new Date(),
        tipoServico: ordem.tipoServico,
        status: ordem.status,
    });
    const ordemSalva = await ordensBanco.save(novaOrdem);
    await notificationCreateOrder(cliente.nome, ordemSalva.status, ordemSalva.id);
    await enviarEmailCodigoAcesso("teste@gmail.com", cliente.nome, cliente.codAcesso);
    return ordemSalva;
};
export const attStatus = async (id, prestadorId) => {
    const ordem = await ordensBanco.findOne({
        where: {
            id: id,
            prestadorId: prestadorId
        },
        relations: {
            cliente: true
        },
        select: {
            cliente: {
                nome: true
            }
        }
    });
    if (!ordem) {
        return null;
    }
    if (ordem.status === "Finalizado") {
        return null;
    }
    const novoStatus = ordem.status === "Em andamento" ? "Pronto para retirada" : "Finalizado";
    ordem.status = novoStatus;
    await ordensBanco.save(ordem);
    await notificationUpdateStatus(ordem.cliente.nome, ordem.status, ordem.id);
    return ordem;
};
export const excluirOrdem = async (id, prestadorId) => {
    const ordem = await ordensBanco.findOne({
        where: {
            id: id,
            prestadorId: prestadorId
        }
    });
    if (!ordem) {
        return null;
    }
    await ordensBanco.remove(ordem);
    return true;
};
//# sourceMappingURL=ordemService.js.map