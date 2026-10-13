import { Router } from "express";
import { attOrder, deleteOrder, getAllorders, getOrdersUser, loginCliente, pushOrder } from "../controllers/ordermController.js";
import { authToken } from "../midlleware/autenticarToken.js";
const routeOrdem = Router();
routeOrdem.get('/ordem/acesso/:cod', authToken("cliente"), getOrdersUser);
routeOrdem.post('/ordem/acesso', loginCliente);
routeOrdem.get('/ordem', authToken("prestador"), getAllorders);
routeOrdem.post('/ordem', authToken("prestador"), pushOrder);
routeOrdem.patch('/ordem/:id', attOrder);
routeOrdem.delete('/ordem/:id', deleteOrder);
export default routeOrdem;
//# sourceMappingURL=ordensRoutes.js.map