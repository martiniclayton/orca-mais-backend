import { TypeCliente } from "./TypeCliente.js";
import { TypeNotification } from "./TypeNotification.js";
export type StatusOS = "Em andamento" | "Pronto para retirada" | "Finalizado";
export interface TypeOrdem {
    clienteId: number | any;
    placa: string;
    dataCriacao: Date;
    tipoServico: string;
    status: StatusOS;
    descricao?: string;
}
export interface TypeOrdemRequest {
    nome: string;
    cpf: string;
    telefone: string;
    placa: string;
    tipoServico: string;
    status: StatusOS;
    descricao?: string | undefined;
}
export interface ordemType {
    id: number;
    clienteId: number;
    cliente: TypeCliente;
    notificacao: TypeNotification;
    placa: string;
    dataCriacao: Date;
    tipoServico: string;
    status: StatusOS;
    descricao?: string;
}
//# sourceMappingURL=TypeOrdem.d.ts.map