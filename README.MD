# Cypress Web & API - Automação de Testes

Este projeto valida, de forma automática, fluxos essenciais de **cadastro de usuário (Web)** e **CRUD de posts (API)**.
Ele usa **Cypress** para executar os testes e gerar evidências (relatórios, vídeos e screenshots quando há falha).

## Cenários Web (Demo Web Shop)
Base: `https://demowebshop.tricentis.com/`

1. **Cadastro válido**
   - Preenche o formulário com dados válidos.
   - Espera a mensagem de sucesso e confirma o e-mail logado.

2. **Cadastro com e-mail já usado**
   - Faz um cadastro válido.
   - Tenta cadastrar novamente com o mesmo e-mail.
   - Espera a mensagem de erro de e-mail existente.

3. **Validações de formulário (campos obrigatórios e formatos)**
   - Sem nome.
   - Sem sobrenome.
   - Sem e-mail.
   - E-mail inválido.
   - Sem senha.
   - Confirmação de senha diferente.

## Cenários API (JSONPlaceholder)
Base: `https://jsonplaceholder.typicode.com`

1. **Criar post (POST)**
   - Envia dados válidos e valida retorno 201 e contrato básico.

2. **Buscar post existente (GET)**
   - Busca o post de id 1 e valida o contrato básico.

3. **Atualizar post completo (PUT)**
   - Atualiza o post 1 e valida retorno e contrato.

4. **Atualizar somente título (PATCH)**
   - Atualiza o título do post 1 e valida retorno.

5. **Deletar post (DELETE)**
   - Remove o post 1 e valida retorno.

6. **Cenários negativos**
   - Buscar post inexistente.
   - Criar post com payload inválido.
   - Atualizar post inexistente.
   - Deletar post inexistente.

## Como executar

### Pré-requisitos
- Node.js instalado.
- Dependências do projeto instaladas.

```bash
npm install
```

### Rodar todos os testes (modo headless)
```bash
npx cypress run
```

### Rodar apenas os testes Web
```bash
npx cypress run --spec "cypress/e2e/front/tests/cadastroUsuario.cy.js"
```

### Rodar apenas os testes API
```bash
npx cypress run --spec "cypress/e2e/back/tests/postsCrud.cy.js"
```

### Abrir o Cypress (modo interativo)
```bash
npx cypress open
```

## Relatórios e evidências
- **Relatórios**: `reports/` (Mochawesome em HTML/JSON).
- **Vídeos**: `cypress/videos/`.
- **Screenshots de falha**: gerados automaticamente pelo Cypress.