import { Request, Response } from "express"
import { getClienteService, getOrdersUserUserService, loginClienteService } from "../services/clienteService.js"
import z from "zod";

const clienteSchema = z.object({
    code: z.string(),
    cpf: z.string()
})

export const loginClienteController = async (request: Request, response: Response) =>{
    const clienteDados = clienteSchema.safeParse(request.body);

    if(!clienteDados.success){
        return response.json({
            mensagem: "Dados inválidos"
        })
    }

    const { code, cpf } = clienteDados.data;

    const resposta = await loginClienteService(code, cpf);

    if(!resposta){
        return response.json({
            mensagem: "Cliente não encontrado"
        })
    }

    return response.status(200).json({
        token: resposta
    })



}

export const getCliente = async (request: Request, response: Response) =>{
    const codigo = String(request.params.cod)
    const clienteId = Number(request.usuario?.id)

    const resposta = await getClienteService(clienteId);

    if(!resposta){
        return response.json({
            mensagem: "Cliente não encontrado"
        })
    }

    return response.json({
        mensagem: "Cliente encontrado com sucesso",
        cliente: resposta
    })
}

export const getOrdersUserUser = async (request: Request, response: Response) =>{
    const clienteId = Number(request.usuario?.id);

    const resposta = await getOrdersUserUserService(clienteId)

    if(!resposta){
        return response.json({
            mensagem: "Ordens não encontradas"
        })
    }
    
    return response.json({
        mensagem: "Ordens Cliente",
        cliente: resposta[0]?.cliente,
        ordens: resposta
    })
}