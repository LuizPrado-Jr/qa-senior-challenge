# QA Senior Technical Challenge

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como solução para o desafio técnico de QA Sênior, com foco em demonstrar boas práticas de automação de testes, arquitetura escalável, organização do código e integração contínua.

A solução contempla:

* Automação de testes de API
* Automação de testes Web (UI)
* Testes de Performance utilizando k6
* Arquitetura baseada em Page Object Model (POM)
* Validação de contrato da API
* Dados parametrizados
* Pipeline CI/CD utilizando GitHub Actions
* Relatórios automáticos do Playwright

---

# Tecnologias Utilizadas

| Tecnologia     | Finalidade                             |
| -------------- | -------------------------------------- |
| Playwright     | Automação Web e API                    |
| TypeScript     | Linguagem principal                    |
| AJV            | Validação de contrato JSON             |
| k6             | Testes de Performance                  |
| GitHub Actions | Integração Contínua                    |
| Node.js        | Runtime                                |
| dotenv         | Gerenciamento de variáveis de ambiente |

---

# Arquitetura do Projeto

```
qa-senior-challenge/

│
├── .github/
│     └── workflows/
│           ci.yml
│
├── data/
│     apiData.json
│     uiData.json
│
├── pages/
│     base/
│          BasePage.ts
│
│     LoginPage.ts
│     InventoryPage.ts
│     CartPage.ts
│     CheckoutPage.ts
│
├── performance/
│     users-load.k6.js
│
├── schemas/
│     user.schema.json
│
├── services/
│     base/
│          APIClient.ts
│
│     AuthService.ts
│     UserService.ts
│
├── tests/
│     api/
│
│     ui/
│
├── .env.example
├── package.json
├── playwright.config.ts
└── README.md
```

---

# Estratégia de Testes

A estratégia adotada foi baseada na Pirâmide de Testes, priorizando testes de API e concentrando os testes de interface apenas nos fluxos críticos da aplicação.

## API

Foram automatizados cenários como:

* Consulta de usuário
* Criação de usuário
* Atualização
* Exclusão
* Login válido
* Login inválido
* Validação de contrato utilizando JSON Schema

## UI

Foi escolhido o fluxo principal da aplicação SauceDemo:

* Login
* Listagem de produtos
* Adição ao carrinho
* Checkout
* Finalização da compra

Além disso, foi implementado um cenário negativo para validar o comportamento de usuário bloqueado.

## Performance

Foi utilizado o k6 para validar:

* Endpoint GET /users/2
* Execução com múltiplos usuários virtuais
* Thresholds de tempo de resposta
* Taxa máxima de erro

---

# Decisões Técnicas

## Playwright

Foi escolhido por permitir automação de API e UI utilizando a mesma tecnologia, além de oferecer:

* Execução paralela
* Excelente integração com CI/CD
* Relatórios nativos
* Captura automática de evidências

## Reqres

Foi utilizada como API pública por ser simples e estável.

Alguns status HTTP solicitados pelo desafio (401, 403 e 409) não são disponibilizados naturalmente pela API pública. Conforme permitido pelo enunciado do desafio, foram utilizados cenários equivalentes e essa adaptação foi documentada.

## SauceDemo

Foi escolhido por possuir um fluxo de compra completo, permitindo validar um processo crítico de ponta a ponta.

---

# Arquitetura

O projeto foi desenvolvido utilizando princípios de reutilização e separação de responsabilidades.

## BasePage

Centraliza ações comuns da interface, como:

* Navegação
* Clique
* Preenchimento
* Validações

Reduzindo duplicidade entre os Page Objects.

## APIClient

Centraliza métodos HTTP comuns:

* GET
* POST
* PUT
* DELETE

Permitindo que os Services implementem apenas as regras de negócio.

## Services

Cada Service representa um domínio da API.

Exemplo:

* UserService
* AuthService

---

# Dados Parametrizados

Todos os dados utilizados nos testes encontram-se externalizados em arquivos JSON e variáveis de ambiente.

Exemplo:

```
data/apiData.json
data/uiData.json
.env
```

---

# Relatórios

O projeto utiliza o Playwright Report.

Para visualizar:

```
npm run report
```

---

# Como Executar

## Instalar dependências

```
npm install
```

## Instalar browsers

```
npx playwright install
```

## Executar todos os testes

```
npm test
```

## Executar apenas API

```
npm run test:api
```

## Executar apenas UI

```
npm run test:ui
```

## Executar Performance

```
npm run test:performance
```

---

# CI/CD

A pipeline do GitHub Actions executa automaticamente:

* Instalação das dependências
* Instalação dos browsers
* Testes de API
* Testes de UI
* Testes de Performance
* Publicação do relatório do Playwright

---

# Melhorias Futuras

Caso este projeto evoluísse para um ambiente corporativo, poderiam ser adicionados:

* Integração com Allure Report
* Testes Cross Browser
* Testes Mobile
* Testes de Acessibilidade (Axe)
* Execução paralela distribuída
* Integração com SonarQube
* Execução em Docker
* Integração com Azure DevOps
* Geração automática de massa de testes
* Mock de serviços externos

---

# Uso de Inteligência Artificial

Durante o desenvolvimento deste desafio foi utilizada Inteligência Artificial como ferramenta de apoio técnico para:

* Sugestões de boas práticas em Playwright;
* O que poderia melhorar para dar mais clareza na estrutura de pastas;
* Apoio na construção do README;
* Como conseguiria melhorar código base para Page Objects, Services e testes já existentes;
* Revisão de código e identificação de oportunidades de melhoria.

Todo o código gerado foi analisado, adaptado, validado e testado manualmente antes da utilização, garantindo aderência aos requisitos do desafio e às boas práticas de automação de testes.

## Exemplos de prompts utilizados

* "Estruture um framework de automação em Playwright para um desafio de QA Sênior."
* "Crie um BasePage reutilizável para Playwright."
* "Implemente um APIClient compartilhado para reduzir duplicação."
* "Sugira melhorias arquiteturais para um projeto de automação."
* "Elabore um README profissional para um projeto de QA."

---

# Autor

**Luiz Prado**

QA Senior | Test Automation | Playwright | API Testing | Performance Testing
