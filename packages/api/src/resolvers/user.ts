import { Resolver, authResolver, resolver } from '.';
import { authenticateGoogle } from '../util/passport';

const userResolver: Resolver = {
    Query: {
        users: authResolver(async (_args, { models }) => {
            return await models.User.findAll();
        }),
        user: authResolver(async ({ id }, { models }) => {
            return await models.User.findOne({ where: { id } });
        })
    },
    Mutation: {
        signUp: resolver(async ({ name }, { models }) => {
            const createdUser = await models.User.create({ name });

            return createdUser;
        }),
        googleLogin: resolver(async ({ accessToken }, { req, res, models }) => {
            req.body = {
                ...req.body,
                access_token: accessToken
            };

            const { user }: any = await authenticateGoogle(req, res);

            if (user) return user;
            throw new Error('User not found.');
        }),
        verify: authResolver(async (_args, { user }) => {
            return user;
        })
    }
};

export default userResolver;
