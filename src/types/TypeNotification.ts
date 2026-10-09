export type StatusOS = "Em andamento" | "Pronto para retirada" | "Finalizado" | ""

export interface TypeNotification {
    id: string,
    titulo: string,
    data: Date
    placa: string,
    cliente: string,
    tipoServico: string,
    status: StatusOS,
    cpf: string
}