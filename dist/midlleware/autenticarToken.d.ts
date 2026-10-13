import { NextFunction, Request, Response } from "express";
type tipoUsuario = "prestador" | "cliente";
export declare const authToken: (tipoPermitido: tipoUsuario) => (request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=autenticarToken.d.ts.map