# Orça Mais

Projeto Full Stack de gerenciamento de ordens de serviço, focado no nicho de oficina mecânica.

## Problema e Solução

### Problema:
Contato e deslocamento ao estabelecimento de forma frequente apenas para saber como está o andamento do serviço.

### Solução:
Um sistema em que o prestador cadastra a ordem de serviço e atualiza o status do andamento. O cliente pode visualizar a qualquer momento como está o status, reduzindo contatos desnecessários e frequentes.

## Tecnologias Utilizadas

### Frontend:
React + TypeScript + Tailwind CSS.

### Backend:
Node.js + Express.js + TypeORM + JWT.

### Banco de Dados:
PostgreSQL.

## Repositórios

### Frontend:
https://github.com/martiniclayton/orcamais

### Backend:
https://github.com/martiniclayton/orca-mais-backend

## Como executar localmente

### Backend

Reproduza esses comandos para baixar o repositório em sua máquina:

```bash
git clone https://github.com/martiniclayton/orca-mais-backend.git
cd orca-mais-backend
npm install
```

#### Variáveis de Ambiente

Depois de instalar as dependências, crie o arquivo .env na pasta raiz do projeto e adicione as seguintes variáveis de ambiente:

- DATABASE_URL=URLAQUI          : conexão com o banco de dados.
- SECRET_KEY_JWT=CHAVEAQUI      : chave usada para assinar e verificar os tokens JWT.

Para iniciar o backend em modo de desenvolvimento utilize o comando: 

```bash
npm run dev
```

### Frontend

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/martiniclayton/orcamais.git
cd orcamais
npm install
```

Para iniciar o frontend no modo de desenvolvimento utilize:

```bash
npm run dev
```


