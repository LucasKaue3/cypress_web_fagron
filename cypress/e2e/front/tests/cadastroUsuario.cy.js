import { faker } from '@faker-js/faker';
import HomePage from '../pages/homePage';
import CadastroPage from '../pages/cadastroPage';

describe('Validações de Cadastro - Demo Web Shop', () => {
  const homePage = new HomePage();
  const cadastroPage = new CadastroPage();

  const gerarUser = () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `qa_${Date.now()}_${faker.string.alphanumeric(6)}@qa.com.br`,
    senha: `Qa!${faker.string.alphanumeric(10)}`,
  });

  let user;

  beforeEach(() => {
    user = gerarUser();
  });

  it('Realizar Cadastro Válido', () => {
    homePage.visit();
    homePage.visitPageRegister();

    cadastroPage.registrar({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      senha: user.senha,
      gender: 'female',
    });

    cadastroPage.validarRegistroConcluido();
    cadastroPage.validarEmailLogado(user.email);
    cadastroPage.logout();
  });

  it('Realizar Cadastro Com Email Já Cadastrado', () => {
    homePage.visit();
    homePage.visitPageRegister();

    cadastroPage.registrar({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      senha: user.senha,
      gender: 'female',
    });

    cadastroPage.validarRegistroConcluido();
    cadastroPage.validarEmailLogado(user.email);
    cadastroPage.logout();

    homePage.visit();
    homePage.visitPageRegister();

    cadastroPage.registrar({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      senha: user.senha,
      gender: 'female',
    });

    cadastroPage.validarErroEmailJaExiste();
  });

  const casosValidacao = [
    {
      nome: 'Cadastro sem nome',
      payload: (u) => ({ firstName: '', lastName: u.lastName, email: u.email, senha: u.senha, gender: 'female' }),
      validar: () => cadastroPage.validarErroCampo('FirstName', 'First name is required.'),
    },
    {
      nome: 'Cadastro sem sobrenome',
      payload: (u) => ({ firstName: u.firstName, lastName: '', email: u.email, senha: u.senha, gender: 'female' }),
      validar: () => cadastroPage.validarErroCampo('LastName', 'Last name is required.'),
    },
    {
      nome: 'Cadastro sem email',
      payload: (u) => ({ firstName: u.firstName, lastName: u.lastName, email: '', senha: u.senha, gender: 'female' }),
      validar: () => cadastroPage.validarErroCampo('Email', 'Email is required.'),
    },
    {
      nome: 'Cadastro com email inválido',
      payload: (u) => ({ firstName: u.firstName, lastName: u.lastName, email: 'qa_invalido', senha: u.senha, gender: 'female' }),
      validar: () => cadastroPage.validarErroCampo('Email', 'Wrong email'),
    },
    {
      nome: 'Cadastro sem senha',
      payload: (u) => ({ firstName: u.firstName, lastName: u.lastName, email: u.email, senha: '', gender: 'female' }),
      validar: () => cadastroPage.validarErroCampo('Password', 'Password is required.'),
    },
    {
      nome: 'Cadastro com confirm password diferente',
      payload: (u) => ({ firstName: u.firstName, lastName: u.lastName, email: u.email, senha: u.senha, confirmSenha: `${u.senha}x`, gender: 'female',
      }),
      validar: () =>
        cadastroPage.validarErroCampo('ConfirmPassword', 'The password and confirmation password do not match.')
    },
  ];

  casosValidacao.forEach((c) => {
    it(c.nome, () => {
      homePage.visit();
      homePage.visitPageRegister();

      const payload = c.payload(user);
      cadastroPage.registrar(payload);

      c.validar();
    });
  });
});
