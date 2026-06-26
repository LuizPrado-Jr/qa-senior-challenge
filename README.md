# QA Senior Technical Challenge

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como solução para o desafio técnico de QA Sênior, com o objetivo de demonstrar conhecimentos em automação de testes, arquitetura escalável, boas práticas de desenvolvimento e integração contínua.

A solução contempla:

* ✅ Automação de Testes de API
* ✅ Automação de Testes Web (UI)
* ✅ Testes de Performance utilizando k6
* ✅ Arquitetura baseada em Page Object Model (POM)
* ✅ Reutilização de código através de BasePage e APIClient
* ✅ Validação de Contrato utilizando JSON Schema
* ✅ Dados parametrizados (.env e arquivos JSON)
* ✅ Pipeline CI/CD utilizando GitHub Actions
* ✅ Relatórios HTML do Playwright

---

# Tecnologias Utilizadas

| Tecnologia      | Finalidade                        |
| --------------- | --------------------------------- |
| Playwright      | Automação de API e UI             |
| TypeScript      | Linguagem principal               |
| AJV             | Validação de contrato JSON Schema |
| JSONPlaceholder | API pública utilizada             |
| SauceDemo       | Aplicação Web utilizada           |
| k6              | Testes de Performance             |
| GitHub Actions  | Integração Contínua               |
| Node.js         | Runtime                           |
| dotenv          | Variáveis de ambiente             |

---

# Arquitetura do Projeto

```text
project-test/

.github/
    workflows/
        ci.yml

data/
    apiData.json
    uiData.json

pages/
    base/
        BasePage.ts

    LoginPage.ts
    InventoryPage.ts
    CartPage.ts
    CheckoutPage.ts

performance/
    posts-load.k6.js

schemas/
    post.schema.json

services/
    base/
        APIClient.ts

    PostService.ts

tests/
    api/
        posts.spec.ts
        contract.spec.ts

    ui/
        login.spec.ts
        purchase.spec.ts

utils/
    env.ts

.env.example
package.json
playwright.config.ts
README.md
```

---

# Estratégia de Testes

Foi utilizada a Pirâmide de Testes como estratégia principal, priorizando testes de API e mantendo poucos testes de UI, porém cobrindo o fluxo crítico da aplicação.

## API

A API escolhida foi a **JSONPlaceholder**.

Foram implementados os seguintes cenários:

* Consulta de Post (GET)
* Consulta de recurso inexistente (404)
* Criação de Post (POST)
* Atualização completa (PUT)
* Atualização parcial (PATCH)
* Exclusão (DELETE)
* Consulta de comentários relacionados
* Validação de contrato JSON Schema
* Utilização de dados dinâmicos durante criação

## UI

Foi automatizado o fluxo principal da aplicação SauceDemo:

* Login válido
* Login com usuário bloqueado
* Adição de produto ao carrinho
* Checkout
* Finalização da compra

Todos os testes utilizam Page Object Model, dados parametrizados e validações funcionais.

---

# Decisões Técnicas

## Escolha do Playwright

Foi escolhido por permitir automação de API e UI utilizando a mesma ferramenta, reduzindo complexidade e aumentando reutilização de código.

Além disso oferece:

* Execução paralela
* Relatórios HTML
* Captura automática de screenshots
* Traces
* Excelente integração com CI/CD

---

## Escolha da JSONPlaceholder

Inicialmente foi utilizada a Reqres.

Durante o desenvolvimento observou-se que a API passou a exigir API Key para diversas operações, o que tornou a execução em pipeline menos previsível.

Optou-se pela migração para JSONPlaceholder por ser uma API pública estável, amplamente utilizada para testes e que atende adequadamente aos objetivos do desafio.

Como a JSONPlaceholder não implementa autenticação nem persiste alterações realizadas via POST, PUT e DELETE, os cenários foram adaptados e essa decisão foi documentada conforme permitido pelo enunciado do desafio.

---

## Arquitetura

### BasePage

Centraliza comportamentos comuns da UI.

Exemplos:

* Navegação
* Clique
* Preenchimento
* Validações

Reduzindo duplicidade entre os Page Objects.

---

### APIClient

Centraliza métodos HTTP comuns.

* GET
* POST
* PUT
* PATCH
* DELETE

Todos os Services reutilizam essa implementação.

---

### Services

Cada domínio da API possui um Service específico.

Neste projeto:

* PostService

Essa abordagem facilita manutenção e escalabilidade.

---

# Dados Parametrizados

Os testes utilizam dados externos para evitar hardcode.

Arquivos utilizados:

```text
data/apiData.json
data/uiData.json
.env
```

---

# Testes de Performance

Foi utilizado o **k6** para validar um endpoint da API.

Cenário implementado:

* GET /posts/1
* Execução com múltiplos usuários virtuais
* Threshold de tempo de resposta
* Threshold de taxa de erro

Execução:

```bash
npm run test:performance
```

---

# Relatórios

O projeto utiliza o Playwright HTML Report.

Gerar:

```bash
npm run report
```

Durante a execução da pipeline o relatório também é publicado como artefato.

---

# Como Executar

## Instalar dependências

```bash
npm install
```

## Instalar browsers

```bash
npx playwright install
```

## Executar todos os testes

```bash
npm test
```

## Executar apenas API

```bash
npm run test:api
```

## Executar apenas UI

```bash
npm run test:ui
```

## Executar Performance

```bash
npm run test:performance
```

---

# Pipeline

A pipeline do GitHub Actions realiza automaticamente:

* Instalação das dependências
* Instalação dos browsers do Playwright
* Execução dos testes de API
* Execução dos testes de UI
* Publicação do relatório HTML

Os testes de performance podem ser executados manualmente através do comando informado acima.

---

# Melhorias Futuras

Caso o projeto evoluísse para um ambiente corporativo, seriam adicionados:

* Allure Report
* Docker
* Testes Cross Browser
* Testes Mobile
* Testes de Acessibilidade (Axe)
* Mock de APIs externas
* SonarQube
* Testes paralelos distribuídos
* Massa de dados automatizada
* Integração com Azure DevOps

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

* "Como nunca utilizei o K6 para testes de performance, me auxilie nesse projeto inicial que montei para incluir melhorias e boas práticas a fim de obter um resultado positivo dos testes de api"
* "Após a documentação criada e aprovada por mim. Implemente um APIClient compartilhado para reduzir duplicação."
* "Sugira melhorias arquiteturais para um projeto de automação."
* "Elabore um README profissional para um projeto de QA baseado no projeto que criei e sua arquitetura"


---

# Considerações

O foco deste projeto foi priorizar qualidade da arquitetura, organização e reutilização de código em vez de quantidade de cenários automatizados.

Essa abordagem busca refletir a forma como projetos de automação são estruturados em ambientes corporativos, priorizando escalabilidade, manutenção e clareza.

---

# Autor

**Luiz Prado**

QA Senior | Test Automation | Playwright | API Testing | Performance Testing
