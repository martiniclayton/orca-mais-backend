import jwt from "jsonwebtoken";
const SECRETKEY = process.env.SECRET_KEY_JWT;
export const gerarToken = (payload) => {
    const pay = {
        id: payload.id,
        email: payload.email,
        tipo: "prestador"
    };
    try {
        const token = jwt.sign(pay, SECRETKEY, {
            expiresIn: '1h'
        });
        return token;
    }
    catch (error) {
        console.log("erroe", error);
    }
};
export const gerarTokenCliente = (payload) => {
    const pay = {
        id: payload.id,
        nome: payload.nome,
        tipo: "cliente"
    };
    try {
        const token = jwt.sign(pay, SECRETKEY, {
            expiresIn: '1h'
        });
        return token;
    }
    catch (error) {
        console.log("erroe", error);
    }
};
//# sourceMappingURL=gerarToken.js.map