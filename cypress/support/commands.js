// cypress/support/e2e.js
import './commands';
import HomePage from '../e2e/front/pages/homePage';
import CadastroPage from '../e2e/front/pages/cadastroPage';

// Adicionar o Page Object ao ambiente do Cypress
Cypress.env('HomePage', new HomePage());
Cypress.env('CadastroPage', new CadastroPage());

Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorne false para evitar que o Cypress falhe o teste
  // Você pode adicionar condições específicas aqui para filtrar erros que deseja ignorar
  if (err.message.includes('getAttribute')) {
    return false;
  }
  // Se você deseja ignorar todas as exceções, apenas retorne false
  return false;
});
