export interface TypeCliente {
    nome: string,
    cpf: string,
    telefone: string,
    codAcesso: string
    prestadorId: number
}

export type NovoCliente = Omit<TypeCliente, "codAcesso">