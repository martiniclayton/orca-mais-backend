import { Router } from "express";
import { attOrder, deleteOrder, getAllorders, getOrdersUser, pushOrder } from "../controllers/ordermController.js";
import { authToken } from "../midlleware/autenticarToken.js";
const routeOrdem = Router();
routeOrdem.get('/ordem/acesso/:cod', getOrdersUser);
routeOrdem.get('/ordem', authToken, getAllorders);
routeOrdem.post('/ordem', pushOrder);
routeOrdem.patch('/ordem/:id', attOrder);
routeOrdem.delete('/ordem/:id', deleteOrder);
export default routeOrdem;
//# sourceMappingURL=ordensRoutes.js.map