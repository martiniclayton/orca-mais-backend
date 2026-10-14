import { Request, Response } from "express";
export declare const getAllorders: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export declare const pushOrder: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export declare const attOrder: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteOrder: (request: Request, response: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=ordermController.d.ts.map