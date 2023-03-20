const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_LIVRO_CADASTRAR = {
    nome: 'Diario',
    autor: 'Eu mesmo'
};
const MOCK_LIVRO_ATUALIZAR = {
    nome: 'Reclamações Da Alice',
    autor: 'Alice'
};
describe('Postgres Strategy', () => {
    beforeEach(async () => {
       await context.connect();
       await context.delete();
       await context.create(MOCK_LIVRO_ATUALIZAR);
    })
    it('PostgresSQL Connection', async () => {
        const result = await context.isConnected();
        assert.equal(result, true);
    })
    it('Cadastrar', async () => {
        const result = await context.create(MOCK_LIVRO_CADASTRAR);
        delete result.id;
        assert.deepEqual(result, MOCK_LIVRO_CADASTRAR);
    })
    it('Listar', async function () {
        const [result] = await context.read({nome: MOCK_LIVRO_CADASTRAR.nome});
        delete result.id;
        assert.deepEqual(result, MOCK_LIVRO_CADASTRAR);
    })
    it('Atualizar', async () => {
        const [itemAtualizar] = await context.read({ nome:MOCK_LIVRO_ATUALIZAR.nome });
        const novoItem = {
            ...MOCK_LIVRO_ATUALIZAR,
            nome: 'Alice Cristina'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem);
        const [itemAtualizado] = await context.read({id: itemAtualizar.id})
        assert.deepEqual(result, 1);
        assert.deepEqual(itemAtualizado.nome, novoItem.nome);
    })
    it('Remover por id', async function() {
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        assert(result, 1);
    })
})