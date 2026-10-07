import jwt from 'jsonwebtoken';
const SECRETKEY = "333337776626632";
export const authToken = (request, response, next) => {
    const token = request.headers.authorization;
    if (!token) {
        return response.status(401).json({
            mensagem: "Token não informado"
        });
    }
    const [, tokenValue] = token.split(" ");
    try {
        if (!tokenValue) {
            return response.status(401).json({
                mensagem: "Token inválido ou expirado"
            });
        }
        const payload = jwt.verify(tokenValue, SECRETKEY);
        console.log(payload);
        next();
    }
    catch (error) {
        return response.status(401).json({
            mensagem: "Token inválido ou expirado"
        });
    }
};
//# sourceMappingURL=autenticarToken.js.map