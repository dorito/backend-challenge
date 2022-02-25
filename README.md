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

# Sobre o projeto
Projeto feito utilizando `NestJS` como framework de servidor, `TypeORM` como ORM, `class-validator` / `class-transformer` para validação de dados e `Swagger` para gerar a documentação.
