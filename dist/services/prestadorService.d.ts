import { EntityPrestador } from "../entitys/Prestador.js";
import { NovoPrestador } from "../types/TypePrestador.js";
export declare const buscarPrestador: (id: number) => Promise<EntityPrestador | null>;
export declare const criarPrestador: (prestador: NovoPrestador) => Promise<EntityPrestador | null>;
export declare const pegarTodosPrestadores: () => Promise<EntityPrestador[]>;
export declare const atuaizarPrestador: (id: number, novosDados: NovoPrestador) => Promise<EntityPrestador | null>;
export declare const deletarPrestador: (id: number) => Promise<true | null>;
export declare const loginService: (email: string, senha: string) => Promise<{
    prestador: EntityPrestador;
    token: string | undefined;
} | null>;
//# sourceMappingURL=prestadorService.d.ts.map