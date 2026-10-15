import { Request, Response } from "express"
import { getClienteService, getOrdersUserUserService, loginClienteService } from "../services/clienteService.js"
import z from "zod";

const clienteSchema = z.object({
    code: z.string().trim().min(2),
    cpf: z.string().trim().min(1)
})

export const loginClienteController = async (request: Request, response: Response) =>{
    const clienteDados = clienteSchema.safeParse(request.body);

    if(!clienteDados.success){
        return response.status(400).json({
            mensagem: "Dados inválidos"
        })
    }

    const { code, cpf } = clienteDados.data;

    const resposta = await loginClienteService(code, cpf);

    if(!resposta){
        return response.status(404).json({
            mensagem: "Cliente não encontrado",
            token: null
        })
    }

    return response.status(200).json({
        mensagem: "Cliente buscado com sucesso",
        token: resposta
    })
}

export const getCliente = async (request: Request, response: Response) =>{
    const clienteId = Number(request.usuario?.id)

    if(!Number.isInteger(clienteId) || clienteId <= 0){
        return response.status(400).json({
            mensagem: "ID inválido"
        })
    }

    const resposta = await getClienteService(clienteId);

    if(!resposta){
        return response.status(404).json({
            mensagem: "Cliente não encontrado",
            cliente: null
        })
    }

    return response.status(200).json({
        mensagem: "Cliente encontrado com sucesso",
        cliente: resposta
    })
}

export const getOrdersUserUser = async (request: Request, response: Response) =>{
    const clienteId = Number(request.usuario?.id);

    if(!Number.isInteger(clienteId) || clienteId <=0){
        return response.status(400).json({
            mensagem: "ID inválido"
        })
    }

    const ordens = await getOrdersUserUserService(clienteId)

    if(!ordens){
        return response.status(404).json({
            mensagem: "Ordens não encontradas"
        })
    }

    if(ordens?.length === 0){
        return response.status(200).json({
            mensagem: "Nenhuma ordem encontrada",
            ordens: []
        })
    }
    
    return response.status(200).json({
        mensagem: "Ordens Cliente",
        cliente: ordens[0]?.cliente,
        ordens: ordens
    })
}