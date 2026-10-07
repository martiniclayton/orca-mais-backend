import { Cliente } from "../types/TypeCliente.js";

export const clientes: Cliente[] = [

    {
        id: 1,
        nome: "Clayton Timoteo",
        cpf: "12345678900",
        telefone: "11900000000",
        codAcesso: "ABC123"
    },

    {
        id: 2,
        nome: "Fernanda Lima",
        cpf: "98765432100",
        telefone: "11988887777",
        codAcesso: "XYZ789"
    },

    {
        id: 3,
        nome: "Lucas Andrade",
        cpf: "45678912344",
        telefone: "21977776666",
        codAcesso: "ASDD87"
    },

    {
        id: 4,
        nome: "Beatriz Souza",
        cpf: "32165498711",
        telefone: "31966665555",
        codAcesso: "EQD548"
    }

];

export type NovoCliente = Omit<Cliente, "id" | "codAcesso">;