import { Router } from "express";
import { atualizarPrestadorController, buscarPrestadorPorIdController, criarPrestadorController, deletarPrestadorController, loginControler, pegarTodosPrestadoresController } from "../controllers/prestadorController.js";
import { prestadores } from "../data/Prestadores.js";
import { Prestador } from "../types/TypePrestador.js";

const route = Router()

route.post('/prestadores', criarPrestadorController);
route.get('/prestadores', pegarTodosPrestadoresController);
route.get('/prestadores/:id', buscarPrestadorPorIdController);
route.put('/prestadores/:id', atualizarPrestadorController);
route.delete('/prestadores/:id', deletarPrestadorController)
route.post('/login', loginControler)


export default route;