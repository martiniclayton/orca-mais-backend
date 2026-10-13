declare global {
    namespace Express {
        interface Request {
            usuario?: {
                id: number;
                tipo: "prestador" | "cliente";
            };
        }
    }
}

export {};