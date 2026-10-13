import { Cliente } from "./clientes.js";
import { NotificacaoEntity } from "./notification.js";
import { EntityPrestador } from "./Prestador.js";
export declare class Ordens {
    id: number;
    clienteId: number;
    prestadorId: number;
    prestador: EntityPrestador;
    cliente: Cliente;
    notificacao: NotificacaoEntity[];
    placa: string;
    dataCriacao: Date;
    tipoServico: string;
    status: string;
    descricao?: string;
}
//# sourceMappingURL=ordens.d.ts.map