const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_LIVRO_CADASTRAR = {
    nome: 'Diario',
    autor: 'Eu mesmo'
}
describe('Postgres Strategy', () => {
    beforeEach(async () => {
       await context.connect();
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
})