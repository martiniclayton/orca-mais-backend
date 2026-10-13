import jwt from 'jsonwebtoken';
const SECRETKEY = process.env.SECRET_KEY_JWT;
export const authToken = (tipoPermitido) => {
    return (request, response, next) => {
        const authorization = request.headers.authorization;
        if (!authorization) {
            return response.status(401).json({
                mensagem: "Token não informado"
            });
        }
        const [, token] = authorization.split(" ");
        if (!token) {
            return response.status(401).json({
                mensagem: "Token inválido"
            });
        }
        try {
            const payload = jwt.verify(token, SECRETKEY);
            console.log(payload);
            if (typeof payload === "string" || payload.tipo !== tipoPermitido) {
                return response.status(403).json({
                    mensagem: "Você não tem permissão para acessar este recurso"
                });
            }
            request.usuario = {
                id: payload.id,
                tipo: payload.tipo
            };
            next();
        }
        catch (error) {
            return response.status(401).json({
                mensagem: "Token inválido ou expirado"
            });
        }
    };
};
//# sourceMappingURL=autenticarToken.js.map