import { clientes, NovoCliente } from "../data/clientes.js";
import { ordenServicos } from "../data/ordens.js"
import { AppDataSource } from "../DataSource.js";
import { Cliente } from "../entitys/clientes.js";
import { Ordens } from "../entitys/ordens.js";
import { StatusOS, TypeOrdem, TypeOrdemRequest } from "../types/TypeOrdem.js";
import { BuscarCliente, CriarCliente } from "./clienteService.js";
import { In, Not } from "typeorm";

const ordensBanco = AppDataSource.getRepository(Ordens);
export const clientesBanco = AppDataSource.getRepository(Cliente);


export const pegarTodasOrderns = async () => {

    const ordens = await ordensBanco.find()

    return ordens
}

export const filtrarOrdensFinalizadas = async (status: string) => {

    let ordens;

    if(status === "Finalizado"){
        ordens = await ordensBanco.find({
            where: {
                status: status
            }
        })
    } else{
        ordens = await ordensBanco.find({
            where: {
                status: In(["Em andamento", "Pronto para retirada"])
            }
        })
    }

    return ordens
}

export const adcOrdem = async (ordem: TypeOrdemRequest) => {
    let cliente;
    const usuarioBuscado = await BuscarCliente(ordem.cpf);

    if (!usuarioBuscado) {
        const newUser: NovoCliente = {
            nome: ordem.nome,
            cpf: ordem.cpf,
            telefone: ordem.telefone
        }
        const user = await CriarCliente(newUser);

        cliente = user
    } else {
        cliente = usuarioBuscado
    }

    const novaOrdem = ordensBanco.create( {
        // nome: cliente.nome,
        // cpf: cliente.cpf,
        // telefone: cliente.telefone,
        clienteId: cliente!.id,
        placa: ordem.placa,
        dataCriacao: new Date(),
        tipoServico: ordem.tipoServico,
        status: ordem.status,
        // codAcesso: cliente.codAcesso
    })


    const ordemSalva = await ordensBanco.save(novaOrdem);
    return ordemSalva
}

export const attStatus = async (id: number) => {

    const ordem = await ordensBanco.findOneBy({ id });

    if (!ordem) {
        return null
    }

    const novoStatus = ordem.status === "Em andamento" ? "Pronto para retirada" : "Finalizado"

    ordem.status = novoStatus

    await ordensBanco.save(ordem)

    return ordem
}

export const excluirOrdem = async (id: number) => {
    const ordem = await ordensBanco.findOneBy({ id });

    if (!ordem) {
        return null
    }

    await ordensBanco.remove(ordem);
    return true
}

export const getOrderUser = async (codAcesso: string) => {
    const cliente = await clientesBanco.findOneBy({ codAcesso })

    if (!cliente) {
        return null
    }
    const id = Number(cliente?.id)

    const ordens = await ordensBanco.find({
        where: {
            clienteId: id
        }
    })

    const ordemCliente = {
        cliente: cliente,
        ordens: ordens
    }

    return ordemCliente
}