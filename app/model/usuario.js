class Usuario extends Sequelize.Model{}
Usuario.init({
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    telefone: Sequelize.STRING,
    endereco: Sequelize.STRING,
    src: Sequelize.STRING,
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: Sequelize.STRING

}, {sequelize, modelName: 'usuario'});

sequelize.sync()
    .then(() => Usuario.create({
        nome: 'janevrau',
        email: 'jane@hotmail.com'
    }))
    .then(jane => {
        console.log(jane.toJSON())
    });