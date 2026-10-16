import { Router } from "express";
import { atualizarPrestadorController, criarPrestadorController, deletarPrestadorController, loginControler, logoutController, verificarSessaoPrestador } from "../controllers/prestadorController.js";
import { authToken } from "../midlleware/autenticarToken.js";
const route = Router();
route.post('/prestadores', criarPrestadorController);
route.put('/prestadores/:id', authToken("prestador"), atualizarPrestadorController);
route.delete('/prestadores/:id', authToken("prestador"), deletarPrestadorController);
route.post('/login', loginControler);
route.post("/logout", logoutController);
route.get('/auth', authToken("prestador"), verificarSessaoPrestador);
export default route;
//# sourceMappingURL=prestadorRoutes.js.map