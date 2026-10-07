import { gerarToken } from "../auth/gerarToken.js";
import { AppDataSource } from "../DataSource.js";
import { EntityPrestador } from "../entitys/Prestador.js";
const prestadores = AppDataSource.getRepository(EntityPrestador);
export const buscarPrestador = async (id) => {
    const prestador = await prestadores.findOneBy({ id });
    return prestador;
};
export const criarPrestador = async (prestador) => {
    const { nome, email, cpf, telefone, estabelecimento, senha } = prestador;
    const existente = await prestadores.findOneBy({ cpf });
    if (existente) {
        return null;
    }
    const novoPrestador = {
        nome: nome,
        email: email,
        cpf: cpf,
        telefone: telefone,
        estabelecimento: estabelecimento,
        senha: senha
    };
    const newPrestador = prestadores.create(novoPrestador);
    return await prestadores.save(newPrestador);
};
export const pegarTodosPrestadores = async () => {
    return await prestadores.find();
};
export const atuaizarPrestador = async (id, novosDados) => {
    const prestador = await prestadores.findOneBy({ id });
    if (!prestador) {
        return null;
    }
    ;
    prestador.nome = novosDados.nome;
    prestador.cpf = novosDados.cpf;
    prestador.email = novosDados.email;
    prestador.telefone = novosDados.telefone;
    return await prestadores.save(prestador);
};
export const deletarPrestador = async (id) => {
    const prestador = await prestadores.findOneBy({ id });
    if (!prestador) {
        return null;
    }
    await prestadores.remove(prestador);
    return true;
};
export const loginService = async (email, senha) => {
    const prestador = await prestadores.findOne({
        where: {
            email
        }
    });
    if (!prestador) {
        return null;
    }
    if (prestador.senha !== senha) {
        return null;
    }
    const token = gerarToken(prestador);
    const user = {
        prestador: prestador,
        token: token
    };
    return user;
};
//# sourceMappingURL=prestadorService.js.map