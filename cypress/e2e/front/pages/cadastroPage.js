class CadastroPage {
  elements = {
    genderMale: '#gender-male',
    genderFemale: '#gender-female',
    firstName: '#FirstName',
    lastName: '#LastName',
    email: '#Email',
    password: '#Password',
    confirmPassword: '#ConfirmPassword',
    registerButton: '#register-button',
    result: 'div.result',
    accountEmail: '.header-links-wrapper a.account',
    logout: '.header-links-wrapper a[href="/logout"]',
    summaryError: '.validation-summary-errors',
    fieldError: (fieldName) => `span.field-validation-error[data-valmsg-for="${fieldName}"]`,
  };

  el(key, ...args) {
    const selector = typeof this.elements[key] === 'function'
      ? this.elements[key](...args)
      : this.elements[key];

    return cy.get(selector);
  }

  inputGender(gender) {
    this.el(gender === 'male' ? 'genderMale' : 'genderFemale').click();
  }

  typeOrClear(key, value) {
    const el = this.el(key).clear();
    if (value) el.type(value);
  }

  inputFirstName(nome) {
    this.typeOrClear('firstName', nome);
  }

  inputLastName(sobrenome) {
    this.typeOrClear('lastName', sobrenome);
  }

  inputEmail(email) {
    this.typeOrClear('email', email);
  }

  inputPassword(pass) {
    this.typeOrClear('password', pass);
  }

  inputConfirmPassword(pass) {
    this.typeOrClear('confirmPassword', pass);
  }

  btnRegister() {
    this.el('registerButton').click();
  }

  registrar({ firstName, lastName, email, senha, confirmSenha, gender }) {
    this.inputGender(gender || 'female');
    this.inputFirstName(firstName ?? '');
    this.inputLastName(lastName ?? '');
    this.inputEmail(email ?? '');
    this.inputPassword(senha ?? '');
    this.inputConfirmPassword(confirmSenha ?? senha ?? '');
    this.btnRegister();
  }

  validarRegistroConcluido() {
    this.el('result').should('be.visible').and('contain', 'Your registration completed');
  }

  validarEmailLogado(email) {
    this.el('accountEmail').should('be.visible').and('contain', email);
  }

  validarErroEmailJaExiste() {
    this.el('summaryError')
      .should('be.visible')
      .and('contain', 'The specified email already exists');
  }

  validarErroCampo(fieldName, mensagem) {
    this.el('fieldError', fieldName)
      .should('be.visible')
      .find('span')
      .should('contain', mensagem);
  }

  logout() {
    this.el('logout').click();
  }
}

export default CadastroPage;
