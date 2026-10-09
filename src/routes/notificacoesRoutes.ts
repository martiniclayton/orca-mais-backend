import { Router } from "express";
import { getAllNotification } from "../controllers/notificationController.js";

export const notificacaoRoutes = Router()


notificacaoRoutes.get('/notification', getAllNotification)