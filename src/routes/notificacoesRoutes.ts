import { Router } from "express";
import { getAllNotification, getNotificationUser } from "../controllers/notificationController.js";

export const notificacaoRoutes = Router()


notificacaoRoutes.get('/notification', getAllNotification)
notificacaoRoutes.get('/notification/cliente/:cod', getNotificationUser)