import { Cliente } from "../entitys/clientes.js";
import { Ordens } from "../entitys/ordens.js";
import { TypeOrdemRequest } from "../types/TypeOrdem.js";
export declare const clientesBanco: import("typeorm").Repository<Cliente>;
export declare const pegarTodasOrderns: () => Promise<Ordens[]>;
export declare const filtrarOrdensFinalizadas: (status: string) => Promise<Ordens[]>;
export declare const adcOrdem: (ordem: TypeOrdemRequest) => Promise<Ordens>;
export declare const attStatus: (id: number) => Promise<Ordens | null>;
export declare const excluirOrdem: (id: number) => Promise<true | null>;
export declare const getOrderUser: (codAcesso: string) => Promise<{
    cliente: Cliente;
    ordens: Ordens[];
} | null>;
export declare const loginClienteToken: (code: string, cpf: string) => Promise<string | null | undefined>;
//# sourceMappingURL=ordemService.d.ts.map