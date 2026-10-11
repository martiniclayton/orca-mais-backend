import jwt from "jsonwebtoken";


const SECRETKEY = process.env.SECRET_KEY_JWT!;

export const gerarToken = (payload: any) => {
    const pay = {
        id: payload.id,
        email: payload.email
    }

    try{
        const token = jwt.sign(pay, SECRETKEY, {
            expiresIn: '1h'
        });
        
        return token
    }
     catch (error){
        console.log("erroe", error)
     }

}

export const gerarTokenCliente = (payload: any) => {
    const pay = {
        id: payload.id,
        nome: payload.nome
    }

    try{
        const token = jwt.sign(pay, SECRETKEY, {
            expiresIn: '1h'
        });
        
        return token
    }
     catch (error){
        console.log("erroe", error)
     }

}