import { Router } from "express";
import { getCliente, getOrdersUserUser } from "../controllers/clienteController.js";
import { authToken } from "../midlleware/autenticarToken.js";

export const rotasCliente = Router()

rotasCliente.get("/cliente/ordens", authToken("cliente"), getOrdersUserUser);
rotasCliente.get("/cliente",authToken("cliente"), getCliente);