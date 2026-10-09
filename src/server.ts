import express, { Request, Response } from 'express';
import { Prestador } from './types/TypePrestador.js';
import route from './routes/prestadorRoutes.js';
import routeOrdem from './routes/ordensRoutes.js';
import { AppDataSource } from './DataSource.js';
import cors from 'cors';
import { notificacaoRoutes } from './routes/notificacoesRoutes.js';

const server = express()
server.use(express.json());

server.use(cors())
server.use(route)
server.use(routeOrdem)
server.use(notificacaoRoutes)

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado com sucesso")
        console.log(
            "ENTIDADES:",
            AppDataSource.entityMetadatas.map(entity => entity.name)
        )
    })
    .catch((err) => {
        console.log("Erro ao conectar com banco de dados", err)
    })

const prestadores: Prestador[] = []

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})

server.get('/', (request: Request, response: Response) => {
    response.json({
        mensagem: "API orça mais funcionando"
    })
});

