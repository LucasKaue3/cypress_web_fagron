export default class PostsApi {
  baseUrl() {
    return 'https://jsonplaceholder.typicode.com';
  }

  criarPost(payload) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl()}/posts`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  buscarPost(id) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl()}/posts/${id}`,
      failOnStatusCode: false,
    });
  }

  atualizarPostPut(id, payload) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl()}/posts/${id}`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  atualizarPostPatch(id, payload) {
    return cy.request({
      method: 'PATCH',
      url: `${this.baseUrl()}/posts/${id}`,
      body: payload,
      failOnStatusCode: false,
    });
  }

  deletarPost(id) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl()}/posts/${id}`,
      failOnStatusCode: false,
    });
  }

  validarContratoBasicoPost(body) {
    expect(body).to.have.property('id');
    expect(body).to.have.property('title');
    expect(body).to.have.property('body');
    expect(body).to.have.property('userId');
  }
}
