import express from 'express';
import route from './routes/prestadorRoutes.js';
import routeOrdem from './routes/ordensRoutes.js';
import { AppDataSource } from './DataSource.js';
import cors from 'cors';
const server = express();
server.use(express.json());
server.use(cors());
server.use(route);
server.use(routeOrdem);
AppDataSource.initialize()
    .then(() => {
    console.log("Banco de dados conectado com sucesso");
})
    .catch((err) => {
    console.log("Erro ao conectar com banco de dados", err);
});
const prestadores = [];
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
server.get('/', (request, response) => {
    response.json({
        mensagem: "API orça mais funcionando"
    });
});
//# sourceMappingURL=server.js.map