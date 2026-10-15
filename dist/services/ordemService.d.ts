import { Ordens } from "../entitys/ordens.js";
import { TypeOrdemRequest } from "../types/TypeOrdem.js";
export declare const pegarTodasOrderns: (prestadorId: number) => Promise<Ordens[]>;
export declare const filtrarOrdens: (status: string, prestadorId: number) => Promise<Ordens[] | undefined>;
export declare const adcOrdem: (ordem: TypeOrdemRequest, prestadorId: number) => Promise<Ordens>;
export declare const attStatus: (id: number, prestadorId: number) => Promise<Ordens | null>;
export declare const excluirOrdem: (id: number, prestadorId: number) => Promise<true | null>;
//# sourceMappingURL=ordemService.d.ts.map