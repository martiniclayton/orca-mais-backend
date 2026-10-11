import { DataSource } from "typeorm";
import { EntityPrestador } from "./entitys/Prestador.js";
import { Ordens } from "./entitys/ordens.js";
import { Cliente } from "./entitys/clientes.js";
import { NotificacaoEntity } from "./entitys/notification.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(process.env.DATABASE_URL ? { url: process.env.DATABASE_URL } : {}),
  synchronize: true,
  logging: false,
  entities: [EntityPrestador, Ordens, Cliente, NotificacaoEntity],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
});