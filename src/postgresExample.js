// npm install sequelize 
// npm install pg-hstore
const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {
    const Livros = driver.define('livros', {
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
    await Livros.create({
        nome:'It a coisa',
        autor:'Stephen King'
    })

    const result = await Livros.findAll({ raw: true });
    console.log(result);
}

main();