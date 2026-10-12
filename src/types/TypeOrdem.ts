import { Cliente } from "./TypeCliente.js"
import { TypeNotification } from "./TypeNotification.js"

export type StatusOS = "Em andamento" | "Pronto para retirada" | "Finalizado"

export interface TypeOrdem {
    // id: string,
    // nome: string,
    // cpf: string,
    // telefone: string,
    clienteId: number | any
    placa: string,
    dataCriacao: Date,
    tipoServico: string
    status: StatusOS,
    descricao?: string,
    // codAcesso: string
}

// export type NovaOrdem = Omit<TypeOrdem, "id" | "dataCriacao" | "codAcesso" | "clienteId">;

export interface TypeOrdemRequest {
    nome: string,
    cpf: string,
    telefone: string,
    placa: string,
    tipoServico: string,
    status: StatusOS,
    descricao?: string | undefined
}

export interface ordemType{
    id: number,
    clienteId: number,
    cliente: Cliente,
    notificacao: TypeNotification,
    placa: string,
    dataCriacao: Date,
    tipoServico: string,
    status: StatusOS,
    descricao?: string 
}