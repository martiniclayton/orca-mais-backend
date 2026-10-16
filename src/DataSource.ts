import { DataSource } from "typeorm";
import { EntityPrestador } from "./entitys/Prestador.js";
import { Ordens } from "./entitys/ordens.js";
import { Cliente } from "./entitys/clientes.js";
import { NotificacaoEntity } from "./entitys/notification.js";

const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl) {
    const parsedUrl = new URL(databaseUrl);

    console.log("Configuração do PostgreSQL:", {
        host: parsedUrl.hostname,
        port: parsedUrl.port || "5432",
        sslmode: parsedUrl.searchParams.get("sslmode"),
        databaseConfigurado: Boolean(parsedUrl.pathname)
    });
} else {
    console.error("DATABASE_URL não foi encontrada");
}

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