import { ApolloError } from 'apollo-server-express';

class UniqueError extends ApolloError {
    constructor(message: string, code?: string, extensions?: any) {
        super(message, code, extensions);
    }
}

export default UniqueError;
