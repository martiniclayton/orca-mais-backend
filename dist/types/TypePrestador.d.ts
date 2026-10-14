export interface Prestador {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    estabelecimento: string;
    senha: string;
}
export type NovoPrestador = Omit<Prestador, "id">;
export type TypeAtualizarPrestador = Omit<Prestador, "nome" | "cpf">;
//# sourceMappingURL=TypePrestador.d.ts.map