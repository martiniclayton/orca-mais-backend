import jwt from "jsonwebtoken";
const SECRETKEY = "333337776626632";
export const gerarToken = (payload) => {
    const pay = {
        id: payload.id,
        email: payload.email
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