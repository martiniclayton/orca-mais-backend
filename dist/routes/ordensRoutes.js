import { Router } from "express";
import { attOrder, deleteOrder, getAllorders, pushOrder } from "../controllers/ordermController.js";
import { authToken } from "../midlleware/autenticarToken.js";
const routeOrdem = Router();
routeOrdem.get('/ordem', authToken("prestador"), getAllorders);
routeOrdem.post('/ordem', authToken("prestador"), pushOrder);
routeOrdem.patch('/ordem/:id', authToken("prestador"), attOrder);
routeOrdem.delete('/ordem/:id', authToken("prestador"), deleteOrder);
export default routeOrdem;
//# sourceMappingURL=ordensRoutes.js.map