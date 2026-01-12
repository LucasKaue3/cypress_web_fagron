import { faker } from '@faker-js/faker';
import PostsApi from '../services/postsApi';

describe('API - CRUD Posts (JSONPlaceholder)', () => {
  const postsApi = new PostsApi();

  const novoPost = () => ({
    title: `qa_${faker.string.alphanumeric(10)}`,
    body: faker.lorem.paragraph(),
    userId: faker.number.int({ min: 1, max: 10 }),
  });

  it('POST - Criar post válido', () => {
    const payload = novoPost();

    postsApi.criarPost(payload).then((res) => {
      expect(res.status).to.eq(201);
      postsApi.validarContratoBasicoPost(res.body);

      expect(res.body.title).to.eq(payload.title);
      expect(res.body.body).to.eq(payload.body);
      expect(res.body.userId).to.eq(payload.userId);
    });
  });

  it('GET - Buscar post existente', () => {
    postsApi.buscarPost(1).then((res) => {
      expect(res.status).to.eq(200);
      postsApi.validarContratoBasicoPost(res.body);
      expect(res.body.id).to.eq(1);
    });
  });

  it('PUT - Atualizar post completo', () => {
    const payload = novoPost();

    postsApi.atualizarPostPut(1, payload).then((res) => {
      expect(res.status).to.eq(200);
      postsApi.validarContratoBasicoPost(res.body);

      expect(res.body.id).to.eq(1);
      expect(res.body.title).to.eq(payload.title);
      expect(res.body.body).to.eq(payload.body);
      expect(res.body.userId).to.eq(payload.userId);
    });
  });

  it('PATCH - Atualizar somente title', () => {
    const payload = { title: `qa_patch_${faker.string.alphanumeric(8)}` };

    postsApi.atualizarPostPatch(1, payload).then((res) => {
      expect(res.status).to.eq(200);
      postsApi.validarContratoBasicoPost(res.body);

      expect(res.body.id).to.eq(1);
      expect(res.body.title).to.eq(payload.title);
    });
  });

  it('DELETE - Deletar post', () => {
    postsApi.deletarPost(1).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('NEG - GET post inexistente', () => {
    postsApi.buscarPost(999999).then((res) => {
      expect([404, 200]).to.include(res.status);
      if (res.status === 404) {
        expect(res.body).to.deep.equal({});
      }
    });
  });

  it('NEG - POST com payload inválido (tipos errados)', () => {
    const payload = { title: 123, body: null, userId: 'x' };

    postsApi.criarPost(payload).then((res) => {
      expect([201, 400, 422]).to.include(res.status);

      if (res.status === 201) {
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title');
      }
    });
  });

  it('NEG - PUT em id inexistente', () => {
    const payload = novoPost();

    postsApi.atualizarPostPut(999999, payload).then((res) => {
        expect([2, 4, 5]).to.include(Math.floor(res.status / 100));
    });

  });

  it('NEG - DELETE em id inexistente', () => {
    postsApi.deletarPost(999999).then((res) => {
      expect([200, 404]).to.include(res.status);
    });
  });
});
