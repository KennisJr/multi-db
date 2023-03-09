const ICrud = require('./../strategies/interfaces/interfaceCrud');
const Sequelize = require('sequelize');
class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null;
        this._livros = null;
    }
    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.log('ERROR', error);
            return false
        }
    }
    async defineModel() {
        this._livros = this._driver.define('livros', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            autor: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_LIVROS',
            freezeTableName: false,
            timestamps: false
        })
        await this._livros.sync();
    }
    async create(item) {
        const {dataValues} = await this._livros.create(item);
        return dataValues;
    }
    async read(item = {}) {
       return this._livros.findAll({where: item, raw: true})
    }
    async connect() {
        this._driver = new Sequelize(
            'livros',
            'edsonkennis',
            '12345',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        )
        await this.defineModel();
    }
}

module.exports = Postgres