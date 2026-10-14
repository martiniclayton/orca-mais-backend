import "dotenv/config";
import express from 'express';
import route from './routes/prestadorRoutes.js';
import routeOrdem from './routes/ordensRoutes.js';
import { AppDataSource } from './DataSource.js';
import cors from 'cors';
import { notificacaoRoutes } from './routes/notificacoesRoutes.js';
import { rotasCliente } from "./routes/clienteRoutes.js";
const server = express();
server.use(express.json());
server.use(cors());
server.use(route);
server.use(routeOrdem);
server.use(notificacaoRoutes);
server.use(rotasCliente);
server.get('/', (request, response) => {
    response.json({
        mensagem: "API orça mais funcionando"
    });
});
server.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
        mensagem: "Erro interno do servidor"
    });
});
const PORT = process.env.PORT || 3000;
const iniciarServidor = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Banco de dados conectado com sucesso");
        console.log("ENTIDADES:", AppDataSource.entityMetadatas.map(entity => entity.name));
        server.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.log("Erro ao iniciar a aplicação", err);
        process.exit(1);
    }
};
iniciarServidor();
//# sourceMappingURL=server.js.map