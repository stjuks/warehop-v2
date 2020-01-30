import { ApolloError } from 'apollo-server-express';

export class UniqueError extends ApolloError {
    constructor(message: string, code?: string, extensions?: any) {
        super(message, code, extensions);
    }
}
