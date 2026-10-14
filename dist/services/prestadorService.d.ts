import { EntityPrestador } from "../entitys/Prestador.js";
import { NovoPrestador, TypeAtualizarPrestador } from "../types/TypePrestador.js";
export declare const buscarPrestador: (id: number) => Promise<EntityPrestador | null>;
export declare const criarPrestador: (prestador: NovoPrestador) => Promise<EntityPrestador | null>;
export declare const pegarTodosPrestadores: () => Promise<EntityPrestador[]>;
export declare const atuaizarPrestador: (id: number, novosDados: TypeAtualizarPrestador) => Promise<EntityPrestador | null>;
export declare const deletarPrestador: (id: number) => Promise<true | null>;
export declare const loginService: (email: string, senha: string) => Promise<{
    prestador: {
        id: number;
        nome: string;
        email: string;
        estabelecimento: string;
    };
    token: string | undefined;
} | null | undefined>;
//# sourceMappingURL=prestadorService.d.ts.map