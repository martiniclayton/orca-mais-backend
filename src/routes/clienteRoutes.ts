import { Router } from "express";
import { autenticarCliente, getCliente, getOrdersUserUser, loginClienteController, logoutControllerCliente } from "../controllers/clienteController.js";
import { authToken } from "../midlleware/autenticarToken.js";

export const rotasCliente = Router()

rotasCliente.get("/cliente/ordens", authToken("cliente"), getOrdersUserUser);
rotasCliente.post('/cliente/acesso', loginClienteController)
rotasCliente.get("/cliente",authToken("cliente"), getCliente);
rotasCliente.post('/logout/cliente', authToken("cliente"), logoutControllerCliente);
rotasCliente.get('/cliente/auth', authToken("cliente"), autenticarCliente)