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