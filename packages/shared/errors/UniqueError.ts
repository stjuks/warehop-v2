import { ApolloError } from 'apollo-server-express';

export default class UniqueError extends ApolloError {
    constructor(message, code, extensions) {
        super(message, code, extensions);
    }
}
