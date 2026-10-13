import { Request, Response } from "express"
import { getClienteService, getOrdersUserUserService } from "../services/clienteService.js"

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