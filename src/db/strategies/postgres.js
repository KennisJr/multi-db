const ICrud = require('./../strategies/interfaces/interfaceCrud');
const Sequelize = require('sequelize');
class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null;
        this._livros = null;
        this._connect();
    }
    async isConnected() {
        try{
            await this._driver.authenticate();
            return true;
        }catch(error) {
            console.log('ERROR', error);
            return false
        }
    }
    async defineModel() {
        this._livros = driver.define('livros', {
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
        await Livros.sync();
    }
    create(item) {
        console.log('O item foi salvo em Postgres')
    }
    _connect() {
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

    }
}

module.exports = Postgres