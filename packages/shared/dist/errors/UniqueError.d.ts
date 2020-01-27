import { ApolloError } from 'apollo-server-express';
export default class UniqueError extends ApolloError {
    constructor(message: any, code: any, extensions: any);
}
