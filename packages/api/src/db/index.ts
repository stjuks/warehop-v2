import sequelize from './sequelize';
import initQueries from './initQueries';

const initialize = async (args?: { force: boolean }) => {
    await sequelize.sync(args);

    await initQueries();
};

export default { sequelize, initialize };
