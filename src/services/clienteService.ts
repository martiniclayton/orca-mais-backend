import { clientes, NovoCliente } from "../data/clientes.js"
import { Cliente } from "../types/TypeCliente.js";
import { clientesBanco } from "./ordemService.js";


export const gerarCodigoAleatorio = (): string => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
    }
    
    return codigo;
};

export const BuscarCliente = async (cpf: string)=>{
    const user =  await clientesBanco.findOneBy({cpf});
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