import { ApolloError } from 'apollo-server-express';
export class UniqueError extends ApolloError {
    constructor(message, code, extensions) {
        super(message, code, extensions);
    }
}
