import sequelize from './sequelize';
import initQueries from './initQueries';

const initialize = async (args?: { force: boolean }) => {
    await sequelize.sync(args);

    if (args && args.force) {
        await initQueries();
    }
};

export default { sequelize, initialize };
