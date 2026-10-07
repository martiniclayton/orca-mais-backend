import { TypeOrdem } from "../types/TypeOrdem.js";
import { clientes } from "./clientes.js";

export const ordenServicos: TypeOrdem[] = [

    {
        id: "0",
        clienteId: 1,
        placa: "ABC-1234",
        dataCriacao: new Date(),
        status: "Em andamento",
        tipoServico: "Troca de óleo"
    },

    {
        id: "1",
        clienteId: 2,
        placa: "XYZ9876",
        dataCriacao: new Date("2026-09-08T10:30:00"),
        status: "Em andamento",
        tipoServico: "Revisão do sistema de freios"
    },

    {
        id: "2",
        clienteId: 3,
        placa: "KGM4A88",
        dataCriacao: new Date("2026-09-07T14:15:00"),
        status: "Finalizado",
        tipoServico: "Diagnóstico elétrico"
    },

    {
        id: "3",
        clienteId: 4,
        placa: "RST3D21",
        dataCriacao: new Date("2026-09-09T09:00:00"),
        status: "Em andamento",
        tipoServico: "Alinhamento e balanceamento"
    }

];