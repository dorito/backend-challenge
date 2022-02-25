# Teste técnico
Cá está parte da minha resolução do [Teste da Gazin Tech](https://github.com/gazin-tech/Desafio-FullStack).

O código aqui apresentado pode tanto ser executado localmente (via Docker) ou acessado pelo Heroku, [clicando aqui](https://tranquil-brushlands-07600.herokuapp.com/).

A documentação da API pode ser encontrada em `http://localhost:PORTA/docs` ou [aqui](https://tranquil-brushlands-07600.herokuapp.com/docs)

# Instalação local
Para deployar o código localmente, faça uma cópia do arquivo `.env.sample` e a renomeie para `.env`, e então execute:
```
docker-compose up -d --build
```
E em alguns instantes (provavelmente uns minutos) a API estará acessível pelo seu endereço local, sendo o padrão `http://localhost:3000` / `http://localhost:3000/docs`

## Executando os testes
Se vocẽ tiver instalado o projeto de maneira local do jeito que foi escrito acima, os testes podem ser executados rodando o comando a seguir:
```
docker exec backend-server yarn run test
```
Caso você tenha feito a instalação de outra maneira (como, por exemplo, sem ser via Docker), os testes podem ser executados com `yarn run test`

# Sobre o projeto
Projeto feito utilizando `NestJS` como framework de servidor, `TypeORM` como ORM, `Jest` para testes unitários, `class-validator` / `class-transformer` para validação de dados e `Swagger` para gerar a documentação.
