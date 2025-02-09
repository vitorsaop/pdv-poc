PDV-POC 🚀

Este é um experimento de PDV (Ponto de Venda) utilizando Angular 8 e IndexedDB 6 para armazenamento prolongado de dados no navegador. O objetivo é testar a persistência de informações localmente sem depender de um banco de dados externo.

📌 Tecnologias Utilizadas

✅ Angular 8 → Framework para construção do frontend.✅ IndexedDB 6 → Banco de dados local para persistência no navegador.✅ Docker → Contêiner para configurar e rodar o ambiente de desenvolvimento.✅ Node.js 12 → Versão compatível com Angular 8.

📌 Como Rodar o Projeto com Docker

1️⃣ Clonar o Repositório

git clone https://github.com/vitorsaop/pdv-poc.git
cd pdv-poc

2️⃣ Construir e Iniciar o Container

docker-compose up --build

📌 Isso criará um ambiente Docker com Node.js 12, Angular CLI 8 e exporá a aplicação na porta ``.

3️⃣ Acessar no Navegador

Abra o navegador e acesse:

http://localhost:4200

4️⃣ Parar o Container

Para parar o ambiente, execute:

docker-compose down

📌 Estrutura do Projeto

pdv-poc/
│── README.md             # Documentação do projeto
│── angular.json          # Configuração do Angular
│── browserslist          # Configuração de compatibilidade de navegadores
│── dist/                 # Arquivos gerados após build do Angular
│── e2e/                  # Testes End-to-End
│── karma.conf.js         # Configuração do Karma (testes unitários)
│── node_modules/         # Dependências do projeto
│── package.json          # Dependências e scripts do projeto
│── package-lock.json     # Controle de versão das dependências
│── src/                  # Código-fonte do Angular
│   ├── app/              # Módulos, componentes e serviços do sistema
│   ├── assets/           # Imagens e arquivos estáticos
│   ├── environments/     # Configurações para dev e produção
│   ├── index.html        # Página principal do projeto
│   ├── main.ts           # Ponto de entrada do Angular
│   ├── polyfills.ts      # Polyfills para compatibilidade
│   ├── styles.css        # Estilos globais do projeto
│   └── test.ts           # Arquivo de configuração de testes
│── tsconfig.app.json     # Configuração TypeScript para a aplicação
│── tsconfig.json         # Configuração geral do TypeScript
│── tsconfig.spec.json    # Configuração TypeScript para testes
│── tslint.json           # Regras de lint para TypeScript

📌 Explicação do Docker

📂 Dockerfile

# Usa a imagem base do Node.js versão 12 (compatível com Angular 8)
FROM node:12

# Instala o Angular CLI 8 globalmente
RUN npm install -g @angular/cli@8.3.29

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Expõe a porta 4200 para acessar o frontend
EXPOSE 4200

# Mantém o container rodando para interações
CMD ["bash"]

📂 docker-compose.yml

version: "3.9"
services:
  angular:
    container_name: ambiente-angular
    build:
      context: .
    ports:
      - "4200:4200" # Mapeia a porta do Angular
    volumes:
      - ./projetos:/app # Mapeia a pasta de projetos local para o container
    stdin_open: true
    tty: true

📌 Explicação:

Cria um container chamado "ambiente-angular".

Constrói o ambiente baseado no Dockerfile.

Expõe a porta 4200, permitindo acesso ao Angular no navegador.

Mapeia a pasta ./projetos para /app dentro do container.

📌 IndexedDB - Armazenamento Local

O IndexedDB é utilizado para armazenar os dados das vendas diretamente no navegador, garantindo persistência mesmo sem conexão com um servidor externo.

Benefícios do IndexedDB 6:

✅ Armazena grandes volumes de dados localmente.✅ Permite operações assíncronas sem travar a UI.✅ Mantém os dados salvos mesmo após fechar o navegador.

📌 Próximos Passos

🔹 Implementar pagamentos e troco no PDV.🔹 Criar um histórico de vendas armazenado no IndexedDB.🔹 Testar sincronização offline-online para backup de vendas.