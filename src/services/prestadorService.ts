import { gerarToken } from "../auth/gerarToken.js";
import { AppDataSource } from "../DataSource.js";
import { EntityPrestador } from "../entitys/Prestador.js";
import { NovoPrestador, Prestador, TypeAtualizarPrestador } from "../types/TypePrestador.js";
import bcrypt from "bcryptjs";

const prestadores = AppDataSource.getRepository(EntityPrestador)


export const buscarPrestador = async (id: number) => {

    const prestador = await prestadores.findOneBy({ id })
    return prestador
}

export const criarPrestador = async (prestador: NovoPrestador) => {

    const { nome, email, cpf, telefone, estabelecimento, senha } = prestador

    const existente = await prestadores.findOneBy({ cpf })

    if (existente) {
        return null
    }
    
    const senhahash = await bcrypt.hash(senha, 10)

    const novoPrestador: Prestador = {
        nome: nome,
        email: email,
        cpf: cpf,
        telefone: telefone,
        estabelecimento: estabelecimento,
        senha: senhahash
    }

    const newPrestador = prestadores.create(novoPrestador);

    return await prestadores.save(newPrestador);
}

export const pegarTodosPrestadores = async () => {
    return await prestadores.find()
}

export const atuaizarPrestador = async (id: number, novosDados: TypeAtualizarPrestador) => {

    const prestador = await prestadores.findOneBy({ id });

    if (!prestador) {
        return null
    };

    const senhahash = await bcrypt.hash(novosDados.senha, 10)

    prestador.email = novosDados.email
    prestador.telefone = novosDados.telefone
    prestador.estabelecimento = novosDados.estabelecimento
    prestador.senha = senhahash

    await prestadores.save(prestador)

    return true

}

export const deletarPrestador = async (id: number) => {
    const prestador = await prestadores.findOneBy({ id });

    if (!prestador) {
        return null
    }

    await prestadores.remove(prestador)

    return true
}

export const loginService = async (email: string, senha: string) => {
    const prestador = await prestadores.findOne({ 
        where: {
            email
        },
        select:{
            id: true,
            nome: true,
            email: true,
            cpf: false,
            telefone: false,
            estabelecimento: true,
            senha: true
        }
     })


     if(!prestador){
        return null
     }

     const senhaValida = await bcrypt.compare(senha, prestador.senha);

     if(!senhaValida){
        return
     }

     const token = gerarToken(prestador)

     const user = {
        prestador: {
            id: prestador.id,
            nome: prestador.nome,
            email: prestador.email,
            estabelecimento: prestador.estabelecimento
        },
        token: token
     }

    return user
}