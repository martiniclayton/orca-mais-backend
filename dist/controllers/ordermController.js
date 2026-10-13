import { adcOrdem, attStatus, excluirOrdem, filtrarOrdensFinalizadas, pegarTodasOrderns } from "../services/ordemService.js";
import { z } from "zod";
export const getAllorders = async (request, response) => {
    const { ativas, status } = request.query;
    const prestadorId = Number(request.usuario?.id);
    const statusValue = typeof status === "string" ? status : undefined;
    if (statusValue) {
        const resposta = await filtrarOrdensFinalizadas(statusValue, prestadorId);
        return response.json({
            mensagem: "Ordens Finalizadas",
            ordens: resposta
        });
    }
    const Ordens = await pegarTodasOrderns(prestadorId);
    if (Ordens.length === 0) {
        return response.json({
            mensagem: "Nenhuma ordem cadastrada"
        });
    }
    return response.json({
        Ordens
    });
};
const statusEnum = z.enum([
    "Em andamento",
    "Pronto para retirada",
    "Finalizado"
]);
const ordemSchema = z.object({
    nome: z.string(),
    cpf: z.string(),
    telefone: z.string(),
    placa: z.string(),
    tipoServico: z.string(),
    status: statusEnum,
    descricao: z.string().optional()
});
export const pushOrder = async (request, response) => {
    const ordem = ordemSchema.safeParse(request.body);
    const prestadorId = Number(request.usuario?.id);
    if (!ordem.success) {
        return response.json({
            mensagem: "Campos inválidos",
            erro: ordem.error.format()
        });
    }
    const resposta = await adcOrdem(ordem.data, prestadorId);
    if (resposta) {
        return response.json({
            mensagem: "Ordem adicionada com sucesso",
        });
    }
    else {
        return response.json({
            mensagem: "campos inválidos"
        });
    }
};
export const attOrder = async (request, response) => {
    const id = Number(request.params.id);
    const prestadorId = Number(request.usuario?.id);
    const ordemAtualizada = await attStatus(id, prestadorId);
    if (ordemAtualizada) {
        return response.json({
            mensagem: "Status atualizado",
            novoStatus: ordemAtualizada.status
        });
    }
    else {
        return response.json({
            mensagem: "A ordem não existe"
        });
    }
};
export const deleteOrder = async (request, response) => {
    const id = Number(request.params.id);
    const prestadorId = Number(request.usuario?.id);
    const resposta = await excluirOrdem(id, prestadorId);
    if (resposta) {
        response.json({
            mensagem: "Ordem excluida com sucesso"
        });
    }
    else {
        response.json({
            mensagem: "A ordem não encontrada"
        });
    }
};
// export const getOrdersUser = async (request: Request, response: Response) => {
//     const codigo = String(request.params.cod);
//     if (!codigo) {
//         return response.status(400).json({
//             mensagem: "Código do cliente não informado"
//         })
//     }
//     const resultado = await getOrderUser(codigo);
//     if (resultado) {
//         const { cliente, ordens } = resultado
//         return response.json({
//             cliente,
//             ordens
//         })
//     } else {
//         return response.json({
//             mensagem: "ordens não encontradas"
//         })
//     }
// }
// const clienteSchema = z.object({
//     code: z.string(),
//     cpf: z.string()
// })
// export const loginCliente = async (request: Request, response: Response) => {
//     const cliente = clienteSchema.safeParse(request.body);
//     if (!cliente.success) {
//         return response.json({
//             mensagem: "Dados inválidos"
//         })
//     }
//     const { code, cpf } = cliente.data
//     const resposta = await loginClienteToken(code, cpf);
//     if (!resposta) {
//         return response.status(400).json({
//             mensagem: "Cliente não encontrado"
//         })
//     }
//     return response.json({
//         token: resposta
//     })
// }
//# sourceMappingURL=ordermController.js.map