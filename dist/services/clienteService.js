import { clientesBanco } from "./ordemService.js";
export const gerarCodigoAleatorio = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
    }
    return codigo;
};
export const BuscarCliente = async (cpf) => {
    const user = await clientesBanco.findOneBy({ cpf });
    return user;
};
export const CriarCliente = async ({ nome, cpf, telefone }) => {
    const user = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        codAcesso: gerarCodigoAleatorio()
    };
    const novoCliente = await clientesBanco.create(user);
    await clientesBanco.save(novoCliente);
    return await clientesBanco.findOneBy({ cpf });
};
//# sourceMappingURL=clienteService.js.map