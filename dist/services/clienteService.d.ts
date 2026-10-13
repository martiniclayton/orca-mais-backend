import { NovoCliente } from "../data/clientes.js";
import { Ordens } from "../entitys/ordens.js";
export declare const gerarCodigoAleatorio: () => string;
export declare const getClienteService: (codigo: number) => Promise<import("../entitys/clientes.js").Cliente | null>;
export declare const getOrdersUserUserService: (clienteId: number) => Promise<Ordens[]> | null;
export declare const BuscarCliente: (cpf: string) => Promise<import("../entitys/clientes.js").Cliente | null>;
export declare const CriarCliente: ({ nome, cpf, telefone }: NovoCliente) => Promise<import("../entitys/clientes.js").Cliente | null>;
//# sourceMappingURL=clienteService.d.ts.map