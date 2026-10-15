import { gerarTokenCliente } from "../auth/gerarToken.js";
import { AppDataSource } from "../DataSource.js";
import { Cliente } from "../entitys/clientes.js";
import { Ordens } from "../entitys/ordens.js";
import {NovoCliente, TypeCliente } from "../types/TypeCliente.js";

const ordensBanco = AppDataSource.getRepository(Ordens);
const clientesBanco = AppDataSource.getRepository(Cliente);


export const gerarCodigoAleatorio = (): string => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
    }
    
    return codigo;
};

export const loginClienteService = async (code: string, cpf: string) =>{
    const cliente = await clientesBanco.findOne({
        where: {
            codAcesso: code,
            cpf: cpf
        }
    })

    if(!cliente){
        return null
    }

    const token = gerarTokenCliente(cliente);

    return token

}

export const getClienteService =  async(codigo: number) =>{
    const cliente =  await clientesBanco.findOne({
        where: {
            id: codigo
        },
        select:{
            nome: true,
            codAcesso: true,
            telefone: true
        }
    })

    if(!cliente){
        return null
    }

    return cliente
}

export const getOrdersUserUserService =  async (clienteId: number) =>{
    const ordens = await ordensBanco.find({
        where: {
            clienteId: clienteId
        },
        relations: {
            cliente: true
        }
    })

    if(!ordens){
        return null
    }

    return ordens
}

export const BuscarCliente = async (cpf: string, prestadorId: number)=>{
    const user = await clientesBanco.findOne({
        where: {
            cpf: cpf,
            prestadorId: prestadorId
        },
        select: {
            id: true,
            nome: true,
            telefone: true,
            cpf: true,
            codAcesso: true
        }
    })
    return user
}

export const CriarCliente =  async({ nome, cpf, telefone, prestadorId }: NovoCliente) =>{
    const user: TypeCliente = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        codAcesso: gerarCodigoAleatorio(),
        prestadorId: prestadorId
    }

    const novoCliente = await clientesBanco.create(user)

    await clientesBanco.save(novoCliente);

    return await clientesBanco.findOneBy({
        cpf: cpf,
        prestadorId: prestadorId
    })
}