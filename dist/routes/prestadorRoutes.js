import { Router } from "express";
import { atualizarPrestadorController, criarPrestadorController, deletarPrestadorController, loginControler } from "../controllers/prestadorController.js";
const route = Router();
route.post('/prestadores', criarPrestadorController);
// route.get('/prestadores', pegarTodosPrestadoresController);
// route.get('/prestadores/:id', buscarPrestadorPorIdController);
route.put('/prestadores/:id', atualizarPrestadorController);
route.delete('/prestadores/:id', deletarPrestadorController);
route.post('/login', loginControler);
export default route;
//# sourceMappingURL=prestadorRoutes.js.map