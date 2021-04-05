const sequelize = require('../config/connection');
const { User, Submission} = require('../models');
const userData = require('./user.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    process.exit(0);
};
seedDatabase();