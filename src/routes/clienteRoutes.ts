import { Router } from "express";
import { getCliente, getOrdersUserUser, loginClienteController } from "../controllers/clienteController.js";
import { authToken } from "../midlleware/autenticarToken.js";

export const rotasCliente = Router()

rotasCliente.get("/cliente/ordens", authToken("cliente"), getOrdersUserUser);
rotasCliente.post('/cliente/acesso', loginClienteController)
rotasCliente.get("/cliente",authToken("cliente"), getCliente);