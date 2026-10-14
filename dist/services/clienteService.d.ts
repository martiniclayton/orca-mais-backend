import { NovoCliente } from "../data/clientes.js";
import { Cliente } from "../entitys/clientes.js";
import { Ordens } from "../entitys/ordens.js";
export declare const gerarCodigoAleatorio: () => string;
export declare const loginClienteService: (code: string, cpf: string) => Promise<string | null | undefined>;
export declare const getClienteService: (codigo: number) => Promise<Cliente | null>;
export declare const getOrdersUserUserService: (clienteId: number) => Promise<Ordens[]> | null;
export declare const BuscarCliente: (cpf: string) => Promise<Cliente | null>;
export declare const CriarCliente: ({ nome, cpf, telefone }: NovoCliente) => Promise<Cliente | null>;
//# sourceMappingURL=clienteService.d.ts.map