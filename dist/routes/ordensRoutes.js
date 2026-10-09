import { Router } from "express";
import { attOrder, deleteOrder, getAllorders, getOrdersUser, loginCliente, pushOrder } from "../controllers/ordermController.js";
import { authToken } from "../midlleware/autenticarToken.js";
const routeOrdem = Router();
routeOrdem.get('/ordem/acesso/:cod', authToken, getOrdersUser);
routeOrdem.post('/ordem/acesso', loginCliente);
routeOrdem.get('/ordem', getAllorders);
routeOrdem.post('/ordem', pushOrder);
routeOrdem.patch('/ordem/:id', attOrder);
routeOrdem.delete('/ordem/:id', deleteOrder);
export default routeOrdem;
//# sourceMappingURL=ordensRoutes.js.map