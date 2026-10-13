import { gerarTokenCliente } from "../auth/gerarToken.js";
import { AppDataSource } from "../DataSource.js";
import { Cliente } from "../entitys/clientes.js";
import { Ordens } from "../entitys/ordens.js";
import { NotificacaoEntity } from "../entitys/notification.js";
import { BuscarCliente, CriarCliente } from "./clienteService.js";
import { In } from "typeorm";
import { enviarEmailCodigoAcesso } from "./emailService.js";
const ordensBanco = AppDataSource.getRepository(Ordens);
export const clientesBanco = AppDataSource.getRepository(Cliente);
const notificationDate = AppDataSource.getRepository(NotificacaoEntity);
export const pegarTodasOrderns = async (prestadorId) => {
    const ordens = await ordensBanco.find({
        where: {
            prestadorId: prestadorId
        },
        relations: {
            cliente: true,
            notificacao: true
        },
    });
    return ordens;
};
export const filtrarOrdensFinalizadas = async (status) => {
    let ordens;
    if (status === "Finalizado") {
        ordens = await ordensBanco.find({
            where: {
                status: status
            }
        });
    }
    else {
        ordens = await ordensBanco.find({
            where: {
                status: In(["Em andamento", "Pronto para retirada"])
            },
            select: {
                cliente: {
                    codAcesso: false,
                    id: false,
                    nome: true,
                    telefone: false
                },
                clienteId: false,
                dataCriacao: true,
                descricao: true,
                id: false,
                placa: true,
                status: true,
                tipoServico: true
            }
        });
    }
    return ordens;
};
export const adcOrdem = async (ordem, prestadorId) => {
    let cliente;
    const usuarioBuscado = await BuscarCliente(ordem.cpf);
    if (!usuarioBuscado) {
        const newUser = {
            nome: ordem.nome,
            cpf: ordem.cpf,
            telefone: ordem.telefone
        };
        const user = await CriarCliente(newUser);
        cliente = user;
    }
    else {
        cliente = usuarioBuscado;
    }
    const novaOrdem = ordensBanco.create({
        // nome: cliente.nome,
        // cpf: cliente.cpf,
        // telefone: cliente.telefone,
        prestadorId: prestadorId,
        clienteId: cliente.id,
        placa: ordem.placa,
        dataCriacao: new Date(),
        tipoServico: ordem.tipoServico,
        status: ordem.status,
        // codAcesso: cliente.codAcesso
    });
    const ordemSalva = await ordensBanco.save(novaOrdem);
    const criarNotificacao = notificationDate.create({
        titulo: "NOVA ORDEM CRIADA",
        descricao: `Nova ordem cadastrada para o cliente ${cliente?.nome}`,
        data: new Date(),
        status: ordemSalva.status,
        ordemId: ordemSalva.id
    });
    await notificationDate.save(criarNotificacao);
    enviarEmailCodigoAcesso("teste@gmail.com", cliente?.nome, cliente?.codAcesso);
    return ordemSalva;
};
export const attStatus = async (id) => {
    const ordem = await ordensBanco.findOneBy({ id });
    if (!ordem) {
        return null;
    }
    const novoStatus = ordem.status === "Em andamento" ? "Pronto para retirada" : "Finalizado";
    ordem.status = novoStatus;
    await ordensBanco.save(ordem);
    const criarNotificacao = notificationDate.create({
        titulo: "MUDANÇA DE STATUS",
        descricao: `A ordem cadastrada para o cliente ${ordem?.cliente.nome} mudou de status`,
        data: new Date(),
        status: ordem.status,
        ordemId: ordem.id
    });
    await notificationDate.insert(criarNotificacao);
    return ordem;
};
export const excluirOrdem = async (id) => {
    const ordem = await ordensBanco.findOneBy({ id });
    if (!ordem) {
        return null;
    }
    await ordensBanco.remove(ordem);
    return true;
};
export const getOrderUser = async (codAcesso) => {
    const cliente = await clientesBanco.findOneBy({ codAcesso });
    if (!cliente) {
        return null;
    }
    const id = Number(cliente?.id);
    const ordens = await ordensBanco.find({
        where: {
            clienteId: id
        }
    });
    const ordemCliente = {
        cliente: cliente,
        ordens: ordens
    };
    return ordemCliente;
};
export const loginClienteToken = async (code, cpf) => {
    const cliente = await clientesBanco.findOneBy({ cpf });
    if (!cliente) {
        return null;
    }
    if (cliente.codAcesso !== code) {
        return null;
    }
    const token = gerarTokenCliente(cliente);
    return token;
};
//# sourceMappingURL=ordemService.js.map