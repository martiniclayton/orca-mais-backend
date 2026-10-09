import { Request, Response } from "express";
export declare const getAllorders: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export declare const pushOrder: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export declare const attOrder: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteOrder: (request: Request, response: Response) => Promise<void>;
export declare const getOrdersUser: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginCliente: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=ordermController.d.ts.map