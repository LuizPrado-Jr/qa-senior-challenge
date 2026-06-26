Optei por Playwright por permitir automação UI e API na mesma stack,
execução paralela, boa integração com CI/CD e relatórios nativos.

Como o desafio possui prazo curto, priorizei poucos cenários,
porém com arquitetura escalável, separação de responsabilidades,
dados parametrizados e evidências de execução.

A API Reqres foi escolhida por ser pública, estável e simples para demonstrar automação de API.

Alguns status solicitados no desafio, como 401, 403 e 409, não são naturalmente retornados nos fluxos públicos disponíveis. Por esse motivo, foram priorizados cenários equivalentes e negativos disponíveis, como login inválido com status 400 e usuário inexistente com status 404.

Essa decisão foi documentada como adaptação técnica, conforme permitido no enunciado do desafio.

k6 será bem simples e suficiente para o desafio: um endpoint da Reqres, múltiplos usuários virtuais e thresholds claros para validar tempo de resposta e taxa de erro.

## Testes de Performance

Os testes de performance foram implementados com k6, utilizando carga básica com múltiplos usuários virtuais.

O objetivo não é simular carga real de produção, mas validar comportamento básico do endpoint sob concorrência controlada.

### Cenário coberto

- Endpoint: GET /users/2
- Usuários virtuais: 5
- Duração: 30 segundos

### Thresholds

- Taxa de erro menor que 1%
- 95% das requisições abaixo de 1000ms

### Executar

```bash
k6 run -e API_BASE_URL=https://reqres.in/api -e REQRES_API_KEY=SUA_CHAVE_AQUI performance/users.k6.js