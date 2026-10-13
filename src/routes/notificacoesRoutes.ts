import { Router } from "express";
import { getAllNotification, getNotificationUser } from "../controllers/notificationController.js";
import { authToken } from "../midlleware/autenticarToken.js";

export const notificacaoRoutes = Router()


notificacaoRoutes.get('/notification', authToken("prestador"), getAllNotification)
notificacaoRoutes.get('/notification/cliente', authToken("cliente"), getNotificationUser)