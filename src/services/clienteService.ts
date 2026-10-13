import { clientes, NovoCliente } from "../data/clientes.js"
import { AppDataSource } from "../DataSource.js";
import { Ordens } from "../entitys/ordens.js";
import { Cliente } from "../types/TypeCliente.js";
import { clientesBanco } from "./ordemService.js";

const ordensBanco = AppDataSource.getRepository(Ordens);


export const gerarCodigoAleatorio = (): string => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
    }
    
    return codigo;
};

export const getClienteService =  async(codigo: number) =>{
    const cliente =  await clientesBanco.findOne({
        where: {
            id: codigo
        },
        select:{
            codAcesso: true,
            id: false,
            nome: true,
            telefone: true
        }
    })

    if(!cliente){
        return null
    }

    return cliente
}

export const getOrdersUserUserService = (clienteId: number) =>{
    const ordens = ordensBanco.find({
        where: {
            clienteId: clienteId
        }
    })

    if(!ordens){
        return null
    }

    return ordens
}

export const BuscarCliente = async (cpf: string)=>{
    // const user =  await clientesBanco.findOneBy({cpf});

    const user = await clientesBanco.findOne({
        where: {
            cpf: cpf
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

export const CriarCliente =  async({ nome, cpf, telefone }: NovoCliente) =>{
    const user: Cliente = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        codAcesso: gerarCodigoAleatorio()
    }

    const novoCliente = await clientesBanco.create(user)

    await clientesBanco.save(novoCliente);

    return await clientesBanco.findOneBy({cpf})
}